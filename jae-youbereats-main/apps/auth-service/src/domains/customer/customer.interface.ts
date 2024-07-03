import { Address, DateOfBirth, Email, Firstname, Lastname } from "ubereats-types";


export type Customer = {
    customer_id: string;
    firstname: Firstname;
    lastname: Lastname;
    email: Email;
    dob: DateOfBirth;
    location: Location;
    address: Address;
    cardDetail: any; // change
    orders: []; // create type
}