/**
 * MailTester Ninja API Client
 * 
 * API Documentation: https://mailtester.ninja/api/
 * Rate Limit (Ultimate Plan): 170 emails per 30 seconds (1 per 176ms)
 * 
 * @author Manus AI
 * @version 1.0
 */

export interface MailTesterResponse {
  email: string;
  user: string;
  domain: string;
  mx: string;
  code: 'ok' | 'ko' | 'mb'; // ok: valid, ko: invalid, mb: unverifiable
  message: 'Accepted' | 'Limited' | 'Rejected' | 'Catch-All' | 'No Mx' | 'Mx Error' | 'Timeout' | 'SPAM Block';
  connections: number;
}

export type VerificationStatus = 'valid' | 'invalid' | 'catch-all' | 'unverifiable' | 'error';

export interface VerificationResult {
  email: string;
  status: VerificationStatus;
  message: string;
  mx: string;
  raw: MailTesterResponse | null;
}

/**
 * MailTester API Configuration
 */
const MAILTESTER_API_URL = 'https://happy.mailtester.ninja/ninja';
const RATE_LIMIT_MS = 176; // 1 email per 176ms (170 emails per 30 seconds)

/**
 * Verifies a single email address using MailTester Ninja API
 * 
 * @param email - The email address to verify
 * @param apiKey - Your MailTester API key
 * @returns Verification result
 */
export async function verifyEmail(
  email: string,
  apiKey: string
): Promise<VerificationResult> {
  try {
    const url = `${MAILTESTER_API_URL}?email=${encodeURIComponent(email)}&key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`MailTester API error: ${response.status} ${response.statusText}`);
    }
    
    const data: MailTesterResponse = await response.json();
    
    // Map MailTester response to our verification status
    const status = mapMailTesterStatus(data.code, data.message);
    
    return {
      email: data.email,
      status,
      message: data.message,
      mx: data.mx,
      raw: data,
    };
  } catch (error) {
    console.error('MailTester verification error:', error);
    return {
      email,
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
      mx: '',
      raw: null,
    };
  }
}

/**
 * Maps MailTester status codes to our verification status
 */
function mapMailTesterStatus(
  code: 'ok' | 'ko' | 'mb',
  message: string
): VerificationStatus {
  if (code === 'ok') {
    // Check if it's a catch-all
    if (message === 'Catch-All') {
      return 'catch-all';
    }
    return 'valid';
  }
  
  if (code === 'ko') {
    return 'invalid';
  }
  
  if (code === 'mb') {
    return 'unverifiable';
  }
  
  return 'error';
}

/**
 * Verifies multiple emails with rate limiting
 * Respects the 170 emails per 30 seconds limit
 * 
 * @param emails - Array of email addresses to verify
 * @param apiKey - Your MailTester API key
 * @param onProgress - Optional callback for progress updates
 * @returns Array of verification results
 */
export async function verifyEmailsBatch(
  emails: string[],
  apiKey: string,
  onProgress?: (completed: number, total: number) => void
): Promise<VerificationResult[]> {
  const results: VerificationResult[] = [];
  
  for (let i = 0; i < emails.length; i++) {
    const email = emails[i];
    
    // Verify the email
    const result = await verifyEmail(email, apiKey);
    results.push(result);
    
    // Call progress callback
    if (onProgress) {
      onProgress(i + 1, emails.length);
    }
    
    // Rate limiting: wait 176ms between requests (except for the last one)
    if (i < emails.length - 1) {
      await sleep(RATE_LIMIT_MS);
    }
  }
  
  return results;
}

/**
 * Verifies emails until the first valid one is found (credit optimization)
 * Stops immediately when a valid email is found
 * 
 * @param emails - Array of email addresses to verify (should be sorted by priority)
 * @param apiKey - Your MailTester API key
 * @param onProgress - Optional callback for progress updates
 * @returns The first valid email result, or the last result if none are valid
 */
export async function verifyUntilValid(
  emails: string[],
  apiKey: string,
  onProgress?: (completed: number, total: number, currentEmail: string) => void
): Promise<VerificationResult> {
  for (let i = 0; i < emails.length; i++) {
    const email = emails[i];
    
    // Call progress callback
    if (onProgress) {
      onProgress(i + 1, emails.length, email);
    }
    
    // Verify the email
    const result = await verifyEmail(email, apiKey);
    
    // If valid, return immediately (credit optimization)
    if (result.status === 'valid') {
      return result;
    }
    
    // If this is the last email, return the result (even if not valid)
    if (i === emails.length - 1) {
      return result;
    }
    
    // Rate limiting: wait 176ms between requests
    await sleep(RATE_LIMIT_MS);
  }
  
  // Fallback (should never reach here)
  return {
    email: emails[0] || '',
    status: 'error',
    message: 'No emails to verify',
    mx: '',
    raw: null,
  };
}

/**
 * Sleep utility function
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Estimates the time required to verify N emails
 * 
 * @param emailCount - Number of emails to verify
 * @returns Estimated time in seconds
 */
export function estimateVerificationTime(emailCount: number): number {
  return Math.ceil((emailCount * RATE_LIMIT_MS) / 1000);
}

/**
 * Calculates the cost of verifying N emails
 * 
 * @param emailCount - Number of emails to verify
 * @param costPerEmail - Cost per email (default: $0.002)
 * @returns Estimated cost in dollars
 */
export function estimateVerificationCost(
  emailCount: number,
  costPerEmail: number = 0.002
): number {
  return emailCount * costPerEmail;
}
