// 숫자로 파싱할 수 있는 문자열을 받아서 콤마를 삽입하고 문자열로 반환
export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
