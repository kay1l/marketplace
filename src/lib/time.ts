export function getRelativeTime(dateString: string): string {
    const created = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - created.getTime();
    const diffMins = Math.floor(diffMs / 60000);
  
    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `Listed ${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `Listed ${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  
    const diffDays = Math.floor(diffHours / 24);
    return `Listed ${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }
  