'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Job {
  id: string;
  user_id: string;
  status: string;
  total_leads: number;
  processed_leads: number;
  valid_emails: number;
  invalid_emails: number;
  catchall_emails: number;
  error_message: string | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

export default function JobsListPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchJobs();
    
    // Auto-refresh every 5 seconds for live progress
    const interval = setInterval(() => {
      fetchJobs();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchJobs = async () => {
    try {
      // Fetch from API endpoint to bypass RLS and show all jobs
      const response = await fetch('/api/jobs');
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      setJobs(data.jobs || []);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">All Jobs</h1>
        <p className="text-muted-foreground">View and manage your enrichment jobs</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-input border border-border rounded-lg"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="processing">Processing</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Jobs Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Job Name</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Leads</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Valid</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Hit Rate</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                  No jobs found
                </td>
              </tr>
            ) : (
              filteredJobs.map((job) => {
                const hitRate = job.total_leads > 0 
                  ? Math.round((job.valid_emails / job.total_leads) * 100) 
                  : 0;

                return (
                  <tr key={job.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="p-4">
                      <Link href={`/dashboard/jobs/${job.id}`} className="font-medium hover:text-primary">
                        Job {job.id.substring(0, 8)}...
                      </Link>
                    </td>
                    <td className="p-4">
                      {job.status === 'completed' && <span className="badge-valid">Completed</span>}
                      {job.status === 'processing' && <span className="badge-processing">Processing</span>}
                      {job.status === 'pending' && <span className="badge-catch-all">Pending</span>}
                      {job.status === 'failed' && <span className="badge-invalid">Failed</span>}
                    </td>
                    <td className="p-4 text-muted-foreground">{job.total_leads.toLocaleString()}</td>
                    <td className="p-4">
                      <span className="text-green-500 font-medium">{job.valid_emails.toLocaleString()}</span>
                    </td>
                    <td className="p-4">
                      <span className={`font-medium ${
                        hitRate >= 50 ? 'text-green-500' : 
                        hitRate >= 35 ? 'text-yellow-500' : 
                        'text-red-500'
                      }`}>
                        {hitRate}%
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {new Date(job.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
