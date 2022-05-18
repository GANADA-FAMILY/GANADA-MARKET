// T : fomdata Type, P : parameters Type
interface Payload<T> {
  [x: string]: any;
  nickname: any;
  params: any;
  formData?: T;
}
export default Payload;
