export function getApiUrl(): string {
  let url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  
  // Resilient Guard: Automatically prepend protocol if it is a domain without one (prevents relative path resolution browser bug!)
  if (url && !url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('/')) {
    url = `https://${url}`;
  }
  
  return url;
}
