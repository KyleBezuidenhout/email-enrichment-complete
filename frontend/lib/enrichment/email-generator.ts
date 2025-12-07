/**
 * Email Generator - Converts patterns to actual email addresses
 * 
 * @author Manus AI
 * @version 1.0
 */

import { EmailPattern, getRankedPatterns, CompanySize } from './permutation-patterns';

export interface LeadData {
  firstName: string;
  lastName: string;
  domain: string;
  companySize?: CompanySize | number | string;
}

export interface GeneratedEmail {
  email: string;
  pattern: string;
  prevalenceScore: number;
  verificationPriority: number;
}

/**
 * Preprocesses a name by removing special characters and converting to lowercase
 */
function preprocessName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z]/g, ''); // Remove all non-alphabetic characters
}

/**
 * Preprocesses a domain by removing protocol, www, and trailing slashes
 */
function preprocessDomain(domain: string): string {
  return domain
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, '') // Remove http:// or https://
    .replace(/^www\./, '') // Remove www.
    .replace(/\/$/, '') // Remove trailing slash
    .split('/')[0]; // Take only the domain part
}

/**
 * Generates a single email address from a pattern
 */
function generateEmailFromPattern(
  firstName: string,
  lastName: string,
  domain: string,
  pattern: string
): string {
  const firstInitial = firstName.charAt(0);
  const lastInitial = lastName.charAt(0);
  
  let localPart = pattern
    .replace(/{first}/g, firstName)
    .replace(/{last}/g, lastName)
    .replace(/{f}/g, firstInitial)
    .replace(/{l}/g, lastInitial);
  
  return `${localPart}@${domain}`;
}

/**
 * Generates all 32 email permutations for a lead, ranked by company size
 * 
 * @param lead - The lead data containing firstName, lastName, domain, and optionally companySize
 * @returns Array of generated emails sorted by verification priority
 */
export function generateEmailPermutations(lead: LeadData): GeneratedEmail[] {
  // Preprocess input data
  const firstName = preprocessName(lead.firstName);
  const lastName = preprocessName(lead.lastName);
  const domain = preprocessDomain(lead.domain);
  
  // Validate preprocessed data
  if (!firstName || !lastName || !domain) {
    throw new Error('Invalid lead data: firstName, lastName, and domain are required');
  }
  
  // Get ranked patterns based on company size
  const patterns = getRankedPatterns(lead.companySize || '51-200'); // Default to mid-size
  
  // Generate emails from patterns
  const generatedEmails: GeneratedEmail[] = patterns.map(patternData => ({
    email: generateEmailFromPattern(firstName, lastName, domain, patternData.pattern),
    pattern: patternData.pattern,
    prevalenceScore: patternData.prevalenceScore,
    verificationPriority: patternData.verificationPriority,
  }));
  
  return generatedEmails;
}

/**
 * Generates only the top N most likely email permutations
 * Useful for optimizing API credits by testing only the most probable patterns
 * 
 * @param lead - The lead data
 * @param topN - Number of top patterns to generate (default: 10)
 * @returns Array of top N generated emails
 */
export function generateTopEmailPermutations(
  lead: LeadData,
  topN: number = 10
): GeneratedEmail[] {
  const allPermutations = generateEmailPermutations(lead);
  return allPermutations.slice(0, topN);
}

/**
 * Deduplicates email addresses (removes duplicates)
 * This is important because some patterns may generate the same email
 * 
 * @param emails - Array of generated emails
 * @returns Deduplicated array with unique emails only
 */
export function deduplicateEmails(emails: GeneratedEmail[]): GeneratedEmail[] {
  const seen = new Set<string>();
  const deduplicated: GeneratedEmail[] = [];
  
  for (const emailData of emails) {
    if (!seen.has(emailData.email)) {
      seen.add(emailData.email);
      deduplicated.push(emailData);
    }
  }
  
  return deduplicated;
}

/**
 * Generates deduplicated email permutations
 * Combines generation and deduplication in one step
 * 
 * @param lead - The lead data
 * @returns Deduplicated array of generated emails
 */
export function generateDeduplicatedPermutations(lead: LeadData): GeneratedEmail[] {
  const allPermutations = generateEmailPermutations(lead);
  return deduplicateEmails(allPermutations);
}
