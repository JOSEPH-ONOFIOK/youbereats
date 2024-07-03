
export type UserRole = "customer" | "vendor" | "rider";

export interface User {
    id: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    email: string;
    password: string;
    role: UserRole;
}

export type SuccessResponse<T> = {
    success: boolean;
    payload: T;
}

export type ControllerResponse<T> = Promise<SuccessResponse<T> | void>;

export interface DatabaseInterface <E> {
    create(payload: E): Promise<E>;
    getById(id: string): Promise<E | null>;
    getMany(limit: number, page: number): Promise<E[] | null>;
    delete(id: string): void;
    update(id: string, payload: E): Promise<E | null>;
    count(): Promise<number>;
}

export type MenuItem = {
    id: string;
    name: string;
    description: string | null;
    price: number;
    imageUrl: string;
    restaurantId: string;
}

declare global {
    namespace Express {
        interface Request {
            user: User
        }
    }
}

