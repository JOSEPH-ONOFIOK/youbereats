interface IDatabase<Param, Result> {
    save(data: any): void;
    getOne(param: any): void;
    getMany(params: any): void;
    getById(id: string): Promise<Result>;
    deleteOne(param: any): void;
}

class Database<P, R> implements IDatabase<P, R> {
    constructor() {}

    getOne(param: any): void {
        throw new Error("Method not implemented.");
    }

    getMany(params: any): void {
        throw new Error("Method not implemented.");
    }

    getById(id: string): Promise<R> {
        throw new Error("Method not implemented.");
    }
    
    deleteOne(param: any): void {
        throw new Error("Method not implemented.");
    }

    save() {}
}