interface Address {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  addressType: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string;
  status: string;
  addresses: Address[];
}

export default User;
