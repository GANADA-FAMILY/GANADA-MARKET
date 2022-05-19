import { REG } from 'constants/reg';

export default function convert(_type: string, msg: string) {
  if (_type === 'email') {
    if (!REG.EMAIL.test(msg)) return msg;
    const splited = msg.split('@');
    const size = splited[0].length;
    return `${
      splited[0].slice(0, 2) + '*'.repeat(size - 3) + splited[0].slice(-1)
    }@${splited[1]}`;
  }
  if (_type === 'phone') {
    if (!REG.PHONE.test(msg)) return msg;
    const splited = msg.split('-');
    return `${splited[0]}-
    ${splited[1][0]}${'*'.repeat(3)}-
    *${splited[2].slice(1, 4)}`;
  }
  if (_type === 'password') {
    if (msg.length === 0) return msg;
    return '●'.repeat(msg.length);
  }
  return msg;
}
