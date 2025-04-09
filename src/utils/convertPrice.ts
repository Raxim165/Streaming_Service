export function convertPrice(string: string): string {
  const number = Number(string);
  return number.toLocaleString('ru-RU');
}