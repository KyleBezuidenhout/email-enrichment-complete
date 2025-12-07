/**
 * Email Enrichment API Route
 * 
 * POST /api/enrichment
 * 
 * Handles batch email enrichment with the following flow:
 * 1. Generate 32 email permutations per lead (ranked by company size)
 * 2. Deduplicate emails
 * 3. Verify emails using MailTester API (stop on first valid)
 * 4. Save results to database
 * 
 * @author Manus AI
 * @version 1.0
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { 
  generateDeduplicatedPermutations,
  type LeadData 
} from '@/lib/enrichment/email-generator';
import { 
  verifyUntilValid,
  type VerificationResult 
} from '@/lib/enrichment/mailtester-client';

export interface EnrichmentRequest {
  leads: LeadData[];
  jobId?: string;
}

export interface EnrichmentResponse {
  success: boolean;
  jobId: string;
  message: string;
  results?: EnrichmentResult[];
  error?: string;
}

export interface EnrichmentResult {
  firstName: string;
  lastName: string;
  domain: string;
  companySize?: string | number;
  email: string | null;
  status: string;
  message: string;
  pattern?: string;
  prevalenceScore?: number;
  verificationPriority?: number;
}

/**
 * POST /api/enrichment
 * Enriches a batch of leads with email addresses
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: EnrichmentRequest = await request.json();
    const { leads, jobId } = body;
    
    // Validate request
    if (!leads || !Array.isArray(leads) || leads.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid request: leads array is required' },
        { status: 400 }
      );
    }
    
    // Get MailTester API key from environment
    const apiKey = process.env.MAIL_TESTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'MailTester API key not configured' },
        { status: 500 }
      );
    }
    
    // Supabase client is already initialized in @/lib/supabase
    
    // Create or update job in database
    const actualJobId = jobId || `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Process each lead
    const results: EnrichmentResult[] = [];
    
    for (let i = 0; i < leads.length; i++) {
      const lead = leads[i];
      
      try {
        // Step 1: Generate email permutations (32 patterns, ranked by company size)
        const permutations = generateDeduplicatedPermutations(lead);
        
        // Step 2: Verify emails until first valid one is found (credit optimization)
        const verificationResult: VerificationResult = await verifyUntilValid(
          permutations.map(p => p.email),
          apiKey,
          (completed, total, currentEmail) => {
            console.log(`[${actualJobId}] Verifying ${lead.firstName} ${lead.lastName}: ${completed}/${total} - ${currentEmail}`);
          }
        );
        
        // Step 3: Find the matching permutation data
        const matchedPermutation = permutations.find(p => p.email === verificationResult.email);
        
        // Step 4: Create result
        const result: EnrichmentResult = {
          firstName: lead.firstName,
          lastName: lead.lastName,
          domain: lead.domain,
          companySize: lead.companySize,
          email: verificationResult.status === 'valid' ? verificationResult.email : null,
          status: verificationResult.status,
          message: verificationResult.message,
          pattern: matchedPermutation?.pattern,
          prevalenceScore: matchedPermutation?.prevalenceScore,
          verificationPriority: matchedPermutation?.verificationPriority,
        };
        
        results.push(result);
        
        // Step 5: Save result to database (optional - implement if needed)
        // await saveResultToDatabase(supabase, actualJobId, result);
        
      } catch (error) {
        console.error(`Error processing lead ${lead.firstName} ${lead.lastName}:`, error);
        results.push({
          firstName: lead.firstName,
          lastName: lead.lastName,
          domain: lead.domain,
          companySize: lead.companySize,
          email: null,
          status: 'error',
          message: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }
    
    // Return results
    return NextResponse.json({
      success: true,
      jobId: actualJobId,
      message: `Processed ${results.length} leads`,
      results,
    });
    
  } catch (error) {
    console.error('Enrichment API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

/**
 * Helper function to save result to database
 * (Implement this based on your Supabase schema)
 */
async function saveResultToDatabase(
  supabase: any,
  jobId: string,
  result: EnrichmentResult
): Promise<void> {
  // TODO: Implement database save logic
  // This should save to the appropriate table in your Supabase database
  // Example:
  // await supabase.from('enrichment_results').insert({
  //   job_id: jobId,
  //   first_name: result.firstName,
  //   last_name: result.lastName,
  //   domain: result.domain,
  //   company_size: result.companySize,
  //   email: result.email,
  //   status: result.status,
  //   message: result.message,
  //   pattern: result.pattern,
  //   prevalence_score: result.prevalenceScore,
  //   verification_priority: result.verificationPriority,
  //   created_at: new Date().toISOString(),
  // });
}
