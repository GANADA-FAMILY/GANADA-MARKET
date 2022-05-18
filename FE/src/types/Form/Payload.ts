// T : fomdata Type, P : parameters Type
interface Payload<T> {
  params: any;
  formData?: T;
}
export default Payload;
