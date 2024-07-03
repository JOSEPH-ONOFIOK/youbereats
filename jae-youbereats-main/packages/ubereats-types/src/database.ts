import { Email, Firstname, Lastname } from "./user";

type ID = string;

type GetOnePayload = ID | Email | Firstname | Lastname;

export interface DatabaseInterface <E> {
    create(payload: E): Promise<E>;
    getById(id: string): Promise<E | null>;
    getOne(payload: GetOnePayload): Promise<E>;
    getMany(limit: number, page: number): Promise<E[] | null>;
    delete(id: string): void;
    update(id: string, payload: E): Promise<E | null>;
    count(): Promise<number>;
}