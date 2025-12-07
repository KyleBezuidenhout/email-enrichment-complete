import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Create Supabase client with service role key to bypass RLS
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const jobId = params.id;

    // Fetch job details
    const { data: job, error: jobError } = await supabaseAdmin
      .from('jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (jobError) {
      console.error('Error fetching job:', jobError);
      return NextResponse.json(
        { success: false, error: { message: 'Job not found' } },
        { status: 404 }
      );
    }

    // Fetch results for this job
    const { data: results, error: resultsError } = await supabaseAdmin
      .from('results')
      .select('*')
      .eq('job_id', jobId)
      .order('created_at', { ascending: false });

    if (resultsError) {
      console.error('Error fetching results:', resultsError);
    }

    return NextResponse.json({
      success: true,
      data: {
        job,
        results: results || [],
      },
    });
  } catch (error) {
    console.error('Error in /api/jobs/[id]:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Internal server error' } },
      { status: 500 }
    );
  }
}
