type KeyType = {
  [key: string]: string;
};
const color: KeyType = {
  white: '#FFFFFF',
  black: '#000000',
  black2: '#222222',
  gray: '#22222280',
  gray2: '#222222CC',
  green: '#31b46e',
  orange: '#f15746',
  red: '#ef6253',
};

const fontWeight: KeyType = {
  bold: '700',
};
const theme = {
  color,
  fontWeight,
};
export default theme;
