import { Address } from "./address";
import { Location } from "./location";


export type Email = string;
export type PhoneNumber = string;
export type Firstname = string;
export type Lastname = string;
export type DateOfBirth = Date;

export enum UserRoles {
    Customer = "customer",
    Vendor = "vendor",
    Rider = "rider"
}

export interface Customer {
    customerId: string;
    firstname: string;
    lastname: string;
    email: string;
    dob: Date;
    location: Location;
    Address: Address;
}

export interface User {
    id: string;
    email: Email;
    firstname: Firstname;
    lastname: Lastname;
    dob: DateOfBirth;
}