interface UserMenuItem {
  profile: string;
  orders: string;
  logout: string;
}

interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  name: NameUser;
  phone: string;
  address: Address;
}

interface NameUser {
  firstname: string;
  lastname: string;
}

interface Address {
  geolocation: Geolocation;
  city: string;
  street: string;
  number: number;
  zipcode: string;
}

interface Geolocation {
  lat: string;
  long: string;
}
