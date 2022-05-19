export default function datetimeToLabel(dateTime: string) {
  return `${dateTime.slice(0, 10)} ${dateTime.slice(11, 19)}`;
}
