export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return '';

  const date = new Date(dateString);

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDuration = (totalSeconds: number | null | undefined): string => {
  if (!totalSeconds || totalSeconds < 0) return "0 min";

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes} min`;
};