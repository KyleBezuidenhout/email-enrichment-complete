/**
 * Email Permutation Patterns - 32 Patterns Ranked by Company Size
 * 
 * Based on research from Interseller (5M+ companies) and ZoomInfo (140M+ emails)
 * Source: B2B Email Permutation Strategy for Optimal Verification
 * 
 * @author Manus AI
 * @version 1.0
 */

export interface EmailPattern {
  rank: number;
  pattern: string;
  prevalenceScore: number;
  cumulativeScore: number;
  verificationPriority: number;
}

export type CompanySize = '1-50' | '51-200' | '201-500' | '500+';

/**
 * 32 Email Permutation Patterns for Company Size: 1-50 Employees
 * Dominated by simple {first} format (41.91%)
 */
export const PATTERNS_1_50: EmailPattern[] = [
  { rank: 1, pattern: '{first}', prevalenceScore: 41.91, cumulativeScore: 37.94, verificationPriority: 1 },
  { rank: 2, pattern: '{f}{last}', prevalenceScore: 26.63, cumulativeScore: 62.04, verificationPriority: 2 },
  { rank: 3, pattern: '{first}.{last}', prevalenceScore: 22.66, cumulativeScore: 82.56, verificationPriority: 3 },
  { rank: 4, pattern: '{first}{l}', prevalenceScore: 2.67, cumulativeScore: 84.97, verificationPriority: 4 },
  { rank: 5, pattern: '{last}', prevalenceScore: 2.07, cumulativeScore: 86.85, verificationPriority: 5 },
  { rank: 6, pattern: '{last}.{first}', prevalenceScore: 1.85, cumulativeScore: 88.52, verificationPriority: 6 },
  { rank: 7, pattern: '{last}{f}', prevalenceScore: 1.65, cumulativeScore: 90.02, verificationPriority: 7 },
  { rank: 8, pattern: '{first}_{last}', prevalenceScore: 1.45, cumulativeScore: 91.33, verificationPriority: 8 },
  { rank: 9, pattern: '{f}.{last}', prevalenceScore: 1.25, cumulativeScore: 92.46, verificationPriority: 9 },
  { rank: 10, pattern: '{first}{last}', prevalenceScore: 1.15, cumulativeScore: 93.5, verificationPriority: 10 },
  { rank: 11, pattern: '{l}{first}', prevalenceScore: 0.95, cumulativeScore: 94.36, verificationPriority: 11 },
  { rank: 12, pattern: '{last}_{first}', prevalenceScore: 0.85, cumulativeScore: 95.13, verificationPriority: 12 },
  { rank: 13, pattern: '{f}_{last}', prevalenceScore: 0.75, cumulativeScore: 95.81, verificationPriority: 13 },
  { rank: 14, pattern: '{first}-{last}', prevalenceScore: 0.65, cumulativeScore: 96.4, verificationPriority: 14 },
  { rank: 15, pattern: '{last}-{first}', prevalenceScore: 0.55, cumulativeScore: 96.9, verificationPriority: 15 },
  { rank: 16, pattern: '{f}{l}', prevalenceScore: 0.5, cumulativeScore: 97.35, verificationPriority: 16 },
  { rank: 17, pattern: '{last}{first}', prevalenceScore: 0.45, cumulativeScore: 97.76, verificationPriority: 17 },
  { rank: 18, pattern: '{first}.{l}', prevalenceScore: 0.4, cumulativeScore: 98.12, verificationPriority: 18 },
  { rank: 19, pattern: '{l}.{first}', prevalenceScore: 0.35, cumulativeScore: 98.43, verificationPriority: 19 },
  { rank: 20, pattern: '{f}-{last}', prevalenceScore: 0.3, cumulativeScore: 98.71, verificationPriority: 20 },
  { rank: 21, pattern: '{l}-{first}', prevalenceScore: 0.25, cumulativeScore: 98.93, verificationPriority: 21 },
  { rank: 22, pattern: '{first}{f}', prevalenceScore: 0.22, cumulativeScore: 99.13, verificationPriority: 22 },
  { rank: 23, pattern: '{last}{l}', prevalenceScore: 0.2, cumulativeScore: 99.31, verificationPriority: 23 },
  { rank: 24, pattern: '{f}.{l}', prevalenceScore: 0.18, cumulativeScore: 99.47, verificationPriority: 24 },
  { rank: 25, pattern: '{f}_{l}', prevalenceScore: 0.15, cumulativeScore: 99.61, verificationPriority: 25 },
  { rank: 26, pattern: '{first}-{l}', prevalenceScore: 0.12, cumulativeScore: 99.72, verificationPriority: 26 },
  { rank: 27, pattern: '{last}-{l}', prevalenceScore: 0.1, cumulativeScore: 99.81, verificationPriority: 27 },
  { rank: 28, pattern: '{l}{f}', prevalenceScore: 0.08, cumulativeScore: 99.88, verificationPriority: 28 },
  { rank: 29, pattern: '{l}_{f}', prevalenceScore: 0.06, cumulativeScore: 99.94, verificationPriority: 29 },
  { rank: 30, pattern: '{l}-{f}', prevalenceScore: 0.04, cumulativeScore: 99.97, verificationPriority: 30 },
  { rank: 31, pattern: '{l}.{f}', prevalenceScore: 0.02, cumulativeScore: 99.99, verificationPriority: 31 },
  { rank: 32, pattern: '{f}{last}_{l}', prevalenceScore: 0.01, cumulativeScore: 100.0, verificationPriority: 32 },
];

/**
 * 32 Email Permutation Patterns for Company Size: 51-200 Employees
 * Shift to {f}{last} format (41.76%)
 */
export const PATTERNS_51_200: EmailPattern[] = [
  { rank: 1, pattern: '{f}{last}', prevalenceScore: 41.76, cumulativeScore: 37.94, verificationPriority: 1 },
  { rank: 2, pattern: '{first}.{last}', prevalenceScore: 30.45, cumulativeScore: 65.6, verificationPriority: 2 },
  { rank: 3, pattern: '{first}', prevalenceScore: 16.99, cumulativeScore: 81.01, verificationPriority: 3 },
  { rank: 4, pattern: '{first}{l}', prevalenceScore: 3.56, cumulativeScore: 84.24, verificationPriority: 4 },
  { rank: 5, pattern: '{first}{last}', prevalenceScore: 1.83, cumulativeScore: 85.9, verificationPriority: 5 },
  { rank: 6, pattern: '{f}.{last}', prevalenceScore: 1.45, cumulativeScore: 87.22, verificationPriority: 6 },
  { rank: 7, pattern: '{first}_{last}', prevalenceScore: 1.25, cumulativeScore: 88.35, verificationPriority: 7 },
  { rank: 8, pattern: '{last}', prevalenceScore: 1.15, cumulativeScore: 89.4, verificationPriority: 8 },
  { rank: 9, pattern: '{last}.{first}', prevalenceScore: 1.05, cumulativeScore: 90.35, verificationPriority: 9 },
  { rank: 10, pattern: '{last}{f}', prevalenceScore: 0.95, cumulativeScore: 91.21, verificationPriority: 10 },
  { rank: 11, pattern: '{l}{first}', prevalenceScore: 0.85, cumulativeScore: 91.98, verificationPriority: 11 },
  { rank: 12, pattern: '{f}_{last}', prevalenceScore: 0.75, cumulativeScore: 92.66, verificationPriority: 12 },
  { rank: 13, pattern: '{last}_{first}', prevalenceScore: 0.65, cumulativeScore: 93.25, verificationPriority: 13 },
  { rank: 14, pattern: '{first}-{last}', prevalenceScore: 0.55, cumulativeScore: 93.75, verificationPriority: 14 },
  { rank: 15, pattern: '{f}{l}', prevalenceScore: 0.5, cumulativeScore: 94.2, verificationPriority: 15 },
  { rank: 16, pattern: '{last}-{first}', prevalenceScore: 0.45, cumulativeScore: 94.61, verificationPriority: 16 },
  { rank: 17, pattern: '{last}{first}', prevalenceScore: 0.4, cumulativeScore: 94.97, verificationPriority: 17 },
  { rank: 18, pattern: '{first}.{l}', prevalenceScore: 0.35, cumulativeScore: 95.29, verificationPriority: 18 },
  { rank: 19, pattern: '{l}.{first}', prevalenceScore: 0.3, cumulativeScore: 95.56, verificationPriority: 19 },
  { rank: 20, pattern: '{f}-{last}', prevalenceScore: 0.28, cumulativeScore: 95.82, verificationPriority: 20 },
  { rank: 21, pattern: '{l}-{first}', prevalenceScore: 0.25, cumulativeScore: 96.04, verificationPriority: 21 },
  { rank: 22, pattern: '{first}{f}', prevalenceScore: 0.22, cumulativeScore: 96.24, verificationPriority: 22 },
  { rank: 23, pattern: '{last}{l}', prevalenceScore: 0.2, cumulativeScore: 96.42, verificationPriority: 23 },
  { rank: 24, pattern: '{f}.{l}', prevalenceScore: 0.18, cumulativeScore: 96.59, verificationPriority: 24 },
  { rank: 25, pattern: '{f}_{l}', prevalenceScore: 0.15, cumulativeScore: 96.72, verificationPriority: 25 },
  { rank: 26, pattern: '{first}-{l}', prevalenceScore: 0.12, cumulativeScore: 96.83, verificationPriority: 26 },
  { rank: 27, pattern: '{last}-{l}', prevalenceScore: 0.1, cumulativeScore: 96.92, verificationPriority: 27 },
  { rank: 28, pattern: '{l}{f}', prevalenceScore: 0.08, cumulativeScore: 96.99, verificationPriority: 28 },
  { rank: 29, pattern: '{l}_{f}', prevalenceScore: 0.06, cumulativeScore: 97.05, verificationPriority: 29 },
  { rank: 30, pattern: '{l}-{f}', prevalenceScore: 0.04, cumulativeScore: 97.08, verificationPriority: 30 },
  { rank: 31, pattern: '{l}.{f}', prevalenceScore: 0.02, cumulativeScore: 97.1, verificationPriority: 31 },
  { rank: 32, pattern: '{f}{last}_{l}', prevalenceScore: 0.01, cumulativeScore: 97.11, verificationPriority: 32 },
];

/**
 * 32 Email Permutation Patterns for Company Size: 201-500 Employees
 * {f}{last} remains dominant (44.75%)
 */
export const PATTERNS_201_500: EmailPattern[] = [
  { rank: 1, pattern: '{f}{last}', prevalenceScore: 44.75, cumulativeScore: 40.59, verificationPriority: 1 },
  { rank: 2, pattern: '{first}.{last}', prevalenceScore: 35.16, cumulativeScore: 72.49, verificationPriority: 2 },
  { rank: 3, pattern: '{first}', prevalenceScore: 7.43, cumulativeScore: 79.23, verificationPriority: 3 },
  { rank: 4, pattern: '{first}{l}', prevalenceScore: 3.44, cumulativeScore: 82.35, verificationPriority: 4 },
  { rank: 5, pattern: '{first}{last}', prevalenceScore: 2.34, cumulativeScore: 84.47, verificationPriority: 5 },
  { rank: 6, pattern: '{f}.{last}', prevalenceScore: 1.65, cumulativeScore: 85.97, verificationPriority: 6 },
  { rank: 7, pattern: '{first}_{last}', prevalenceScore: 1.35, cumulativeScore: 87.19, verificationPriority: 7 },
  { rank: 8, pattern: '{last}', prevalenceScore: 1.15, cumulativeScore: 88.23, verificationPriority: 8 },
  { rank: 9, pattern: '{last}.{first}', prevalenceScore: 0.95, cumulativeScore: 89.09, verificationPriority: 9 },
  { rank: 10, pattern: '{last}{f}', prevalenceScore: 0.85, cumulativeScore: 89.86, verificationPriority: 10 },
  { rank: 11, pattern: '{l}{first}', prevalenceScore: 0.75, cumulativeScore: 90.54, verificationPriority: 11 },
  { rank: 12, pattern: '{f}_{last}', prevalenceScore: 0.65, cumulativeScore: 91.13, verificationPriority: 12 },
  { rank: 13, pattern: '{last}_{first}', prevalenceScore: 0.55, cumulativeScore: 91.63, verificationPriority: 13 },
  { rank: 14, pattern: '{first}-{last}', prevalenceScore: 0.5, cumulativeScore: 92.08, verificationPriority: 14 },
  { rank: 15, pattern: '{f}{l}', prevalenceScore: 0.45, cumulativeScore: 92.49, verificationPriority: 15 },
  { rank: 16, pattern: '{last}-{first}', prevalenceScore: 0.4, cumulativeScore: 92.85, verificationPriority: 16 },
  { rank: 17, pattern: '{last}{first}', prevalenceScore: 0.35, cumulativeScore: 93.17, verificationPriority: 17 },
  { rank: 18, pattern: '{first}.{l}', prevalenceScore: 0.3, cumulativeScore: 93.44, verificationPriority: 18 },
  { rank: 19, pattern: '{l}.{first}', prevalenceScore: 0.28, cumulativeScore: 93.7, verificationPriority: 19 },
  { rank: 20, pattern: '{f}-{last}', prevalenceScore: 0.25, cumulativeScore: 93.92, verificationPriority: 20 },
  { rank: 21, pattern: '{l}-{first}', prevalenceScore: 0.22, cumulativeScore: 94.12, verificationPriority: 21 },
  { rank: 22, pattern: '{first}{f}', prevalenceScore: 0.2, cumulativeScore: 94.3, verificationPriority: 22 },
  { rank: 23, pattern: '{last}{l}', prevalenceScore: 0.18, cumulativeScore: 94.47, verificationPriority: 23 },
  { rank: 24, pattern: '{f}.{l}', prevalenceScore: 0.15, cumulativeScore: 94.6, verificationPriority: 24 },
  { rank: 25, pattern: '{f}_{l}', prevalenceScore: 0.12, cumulativeScore: 94.71, verificationPriority: 25 },
  { rank: 26, pattern: '{first}-{l}', prevalenceScore: 0.1, cumulativeScore: 94.8, verificationPriority: 26 },
  { rank: 27, pattern: '{last}-{l}', prevalenceScore: 0.08, cumulativeScore: 94.87, verificationPriority: 27 },
  { rank: 28, pattern: '{l}{f}', prevalenceScore: 0.06, cumulativeScore: 94.93, verificationPriority: 28 },
  { rank: 29, pattern: '{l}_{f}', prevalenceScore: 0.05, cumulativeScore: 94.97, verificationPriority: 29 },
  { rank: 30, pattern: '{l}-{f}', prevalenceScore: 0.04, cumulativeScore: 95.01, verificationPriority: 30 },
  { rank: 31, pattern: '{l}.{f}', prevalenceScore: 0.02, cumulativeScore: 95.03, verificationPriority: 31 },
  { rank: 32, pattern: '{f}{last}_{l}', prevalenceScore: 0.01, cumulativeScore: 95.04, verificationPriority: 32 },
];

/**
 * 32 Email Permutation Patterns for Company Size: 500+ Employees
 * Strong preference for {first}.{last} (56.31%)
 */
export const PATTERNS_500_PLUS: EmailPattern[] = [
  { rank: 1, pattern: '{first}.{last}', prevalenceScore: 56.31, cumulativeScore: 51.1, verificationPriority: 1 },
  { rank: 2, pattern: '{f}{last}', prevalenceScore: 21.75, cumulativeScore: 70.85, verificationPriority: 2 },
  { rank: 3, pattern: '{first}', prevalenceScore: 6.57, cumulativeScore: 76.81, verificationPriority: 3 },
  { rank: 4, pattern: '{first}_{last}', prevalenceScore: 3.55, cumulativeScore: 80.03, verificationPriority: 4 },
  { rank: 5, pattern: '{first}{last}', prevalenceScore: 3.4, cumulativeScore: 83.12, verificationPriority: 5 },
  { rank: 6, pattern: '{first}{l}', prevalenceScore: 2.25, cumulativeScore: 85.16, verificationPriority: 6 },
  { rank: 7, pattern: '{f}.{last}', prevalenceScore: 1.85, cumulativeScore: 86.84, verificationPriority: 7 },
  { rank: 8, pattern: '{last}', prevalenceScore: 1.45, cumulativeScore: 88.16, verificationPriority: 8 },
  { rank: 9, pattern: '{last}.{first}', prevalenceScore: 1.15, cumulativeScore: 89.2, verificationPriority: 9 },
  { rank: 10, pattern: '{last}{f}', prevalenceScore: 0.95, cumulativeScore: 90.06, verificationPriority: 10 },
  { rank: 11, pattern: '{f}_{last}', prevalenceScore: 0.75, cumulativeScore: 90.74, verificationPriority: 11 },
  { rank: 12, pattern: '{l}{first}', prevalenceScore: 0.65, cumulativeScore: 91.33, verificationPriority: 12 },
  { rank: 13, pattern: '{last}_{first}', prevalenceScore: 0.55, cumulativeScore: 91.83, verificationPriority: 13 },
  { rank: 14, pattern: '{first}-{last}', prevalenceScore: 0.5, cumulativeScore: 92.28, verificationPriority: 14 },
  { rank: 15, pattern: '{f}{l}', prevalenceScore: 0.45, cumulativeScore: 92.69, verificationPriority: 15 },
  { rank: 16, pattern: '{last}-{first}', prevalenceScore: 0.4, cumulativeScore: 93.05, verificationPriority: 16 },
  { rank: 17, pattern: '{last}{first}', prevalenceScore: 0.35, cumulativeScore: 93.37, verificationPriority: 17 },
  { rank: 18, pattern: '{first}.{l}', prevalenceScore: 0.3, cumulativeScore: 93.64, verificationPriority: 18 },
  { rank: 19, pattern: '{l}.{first}', prevalenceScore: 0.28, cumulativeScore: 93.9, verificationPriority: 19 },
  { rank: 20, pattern: '{f}-{last}', prevalenceScore: 0.25, cumulativeScore: 94.12, verificationPriority: 20 },
  { rank: 21, pattern: '{l}-{first}', prevalenceScore: 0.22, cumulativeScore: 94.32, verificationPriority: 21 },
  { rank: 22, pattern: '{first}{f}', prevalenceScore: 0.2, cumulativeScore: 94.5, verificationPriority: 22 },
  { rank: 23, pattern: '{last}{l}', prevalenceScore: 0.18, cumulativeScore: 94.67, verificationPriority: 23 },
  { rank: 24, pattern: '{f}.{l}', prevalenceScore: 0.15, cumulativeScore: 94.8, verificationPriority: 24 },
  { rank: 25, pattern: '{f}_{l}', prevalenceScore: 0.12, cumulativeScore: 94.91, verificationPriority: 25 },
  { rank: 26, pattern: '{first}-{l}', prevalenceScore: 0.1, cumulativeScore: 95.0, verificationPriority: 26 },
  { rank: 27, pattern: '{last}-{l}', prevalenceScore: 0.08, cumulativeScore: 95.07, verificationPriority: 27 },
  { rank: 28, pattern: '{l}{f}', prevalenceScore: 0.06, cumulativeScore: 95.13, verificationPriority: 28 },
  { rank: 29, pattern: '{l}_{f}', prevalenceScore: 0.05, cumulativeScore: 95.17, verificationPriority: 29 },
  { rank: 30, pattern: '{l}-{f}', prevalenceScore: 0.04, cumulativeScore: 95.21, verificationPriority: 30 },
  { rank: 31, pattern: '{l}.{f}', prevalenceScore: 0.02, cumulativeScore: 95.23, verificationPriority: 31 },
  { rank: 32, pattern: '{f}{last}_{l}', prevalenceScore: 0.01, cumulativeScore: 95.24, verificationPriority: 32 },
];

/**
 * Get ranked email patterns based on company size
 */
export function getRankedPatterns(companySize: CompanySize | number | string): EmailPattern[] {
  // Handle numeric company size
  if (typeof companySize === 'number') {
    if (companySize <= 50) return PATTERNS_1_50;
    if (companySize <= 200) return PATTERNS_51_200;
    if (companySize <= 500) return PATTERNS_201_500;
    return PATTERNS_500_PLUS;
  }
  
  // Handle string company size
  const sizeStr = companySize.toString().toLowerCase();
  if (sizeStr.includes('1-50') || sizeStr.includes('1-10') || sizeStr.includes('2-10')) {
    return PATTERNS_1_50;
  }
  if (sizeStr.includes('51-200') || sizeStr.includes('51-100') || sizeStr.includes('101-200')) {
    return PATTERNS_51_200;
  }
  if (sizeStr.includes('201-500') || sizeStr.includes('201-300') || sizeStr.includes('301-500')) {
    return PATTERNS_201_500;
  }
  if (sizeStr.includes('500+') || sizeStr.includes('501+') || sizeStr.includes('1000+') || sizeStr.includes('1001+')) {
    return PATTERNS_500_PLUS;
  }
  
  // Default to company size based on exact match
  switch (companySize) {
    case '1-50':
      return PATTERNS_1_50;
    case '51-200':
      return PATTERNS_51_200;
    case '201-500':
      return PATTERNS_201_500;
    case '500+':
      return PATTERNS_500_PLUS;
    default:
      // Default to mid-size company patterns
      return PATTERNS_51_200;
  }
}
