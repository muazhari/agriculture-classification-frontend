class ImageEntity {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: string, name: string, created_at: Date, updated_at: Date) {
        this.id = id;
        this.name = name;
        this.createdAt = created_at;
        this.updatedAt = updated_at;
    }
}

export default ImageEntity;