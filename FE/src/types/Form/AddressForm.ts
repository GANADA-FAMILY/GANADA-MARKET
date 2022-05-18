export default interface AddressForm {
  addressName: string;
  addressPhone: string;
  postalCode: string;
  address: string;
  addressDetail: string;
  activate: boolean;
  params?: AddressFormParams;
}

interface AddressFormParams {
  addressId: number;
}
