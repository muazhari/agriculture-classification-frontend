class CreateOneClassificationRequest {
    type_id: string;
    image_id: string;

    constructor(type_id: string, image_id: string) {
        this.type_id = type_id;
        this.image_id = image_id;
    }
}

export default CreateOneClassificationRequest;