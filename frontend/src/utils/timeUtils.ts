 export const formatDuration = (decimalHours: number): string => {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  switch (true) {
    case hours > 0 && minutes > 0:
      return `${hours} год ${minutes} хв`;
    case hours > 0:
      return `${hours} год`;
    case minutes > 0:
      return `${minutes} хв`;
    default:
      return "0 хв";
  }
};
 export  const formatDate = (isoDate: string) => {
    if (!isoDate) return "";
    return new Date(isoDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };