export function getApiUrl(): string {
  if (typeof window !== 'undefined') {
    // Client-side: use environment variable or fallback to localhost
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  }
  // Server-side / Build-time
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
}
