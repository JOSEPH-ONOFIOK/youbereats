type ImageServiceResponse = Promise<Record<"uri", string>>;

interface ImageServiceInterface {
    upload(): ImageServiceResponse;
    delete(): Promise<void>;
    get(): ImageServiceResponse;
    update(): ImageServiceResponse;
}

class ImageService implements ImageServiceInterface {
    constructor() {}

    upload(): ImageServiceResponse {
        throw new Error("Method not implemented.");
    }

    delete(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    get(): ImageServiceResponse {
        throw new Error("Method not implemented.");
    }

    update(): ImageServiceResponse {
        throw new Error("Method not implemented.");
    }

}