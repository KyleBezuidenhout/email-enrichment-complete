/**
 * Global Rate Limiter for MailTester API
 * 
 * Ensures we don't exceed 170 verifications per 30 seconds across all jobs
 * 
 * @author Manus AI
 * @version 1.0
 */

class RateLimiter {
  private queue: Array<() => void> = [];
  private timestamps: number[] = [];
  private readonly maxRequests = 170;
  private readonly windowMs = 30000; // 30 seconds
  private readonly minDelayMs = 176; // Minimum 176ms between requests
  private processing = false;

  /**
   * Add a request to the queue and wait for execution
   */
  async acquire(): Promise<void> {
    return new Promise((resolve) => {
      this.queue.push(resolve);
      this.processQueue();
    });
  }

  /**
   * Process the queue with rate limiting
   */
  private async processQueue() {
    if (this.processing) return;
    this.processing = true;

    while (this.queue.length > 0) {
      // Clean up old timestamps outside the window
      const now = Date.now();
      this.timestamps = this.timestamps.filter(t => now - t < this.windowMs);

      // Check if we can make a request
      if (this.timestamps.length >= this.maxRequests) {
        // Wait until the oldest timestamp expires
        const oldestTimestamp = this.timestamps[0];
        const waitTime = this.windowMs - (now - oldestTimestamp) + 100; // Add 100ms buffer
        await this.sleep(waitTime);
        continue;
      }

      // Calculate delay since last request
      const lastTimestamp = this.timestamps[this.timestamps.length - 1] || 0;
      const timeSinceLastRequest = now - lastTimestamp;
      
      if (timeSinceLastRequest < this.minDelayMs) {
        await this.sleep(this.minDelayMs - timeSinceLastRequest);
      }

      // Execute the next request
      const resolve = this.queue.shift();
      if (resolve) {
        this.timestamps.push(Date.now());
        resolve();
      }
    }

    this.processing = false;
  }

  /**
   * Sleep utility
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get current rate limit status
   */
  getStatus() {
    const now = Date.now();
    const recentRequests = this.timestamps.filter(t => now - t < this.windowMs);
    return {
      requestsInWindow: recentRequests.length,
      maxRequests: this.maxRequests,
      queueLength: this.queue.length,
      available: this.maxRequests - recentRequests.length,
    };
  }
}

// Global singleton instance
export const globalRateLimiter = new RateLimiter();
