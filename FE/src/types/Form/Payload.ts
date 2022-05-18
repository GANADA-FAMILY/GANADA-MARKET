// T : fomdata Type, P : parameters Type
interface Payload<T> {
  // [x: string]: any;
  // params: unknown;
  formData?: T;
}
export default Payload;
