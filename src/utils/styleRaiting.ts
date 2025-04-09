export function getBackgroundStyle(rating : number): string {
  if (rating >= 8.6) return '#A59400';
  else if (rating >= 7.5) return '#308E21';
  else if (rating >= 6.3) return '#777777';
  else return '#C82020';
}