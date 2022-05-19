export function dateDiffInHours(a: Date, b: Date) {
  return Math.floor(Math.abs(Number(a) - Number(b)) / 36e5);
}
