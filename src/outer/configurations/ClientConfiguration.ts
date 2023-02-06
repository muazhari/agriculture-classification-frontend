class ClientConfiguration {
    typeServiceURL: string;
    imageServiceURL: string;
    classificationServiceURL: string;

    constructor() {
        this.typeServiceURL = process.env.REACT_APP_API_URL_TYPE || "";
        this.imageServiceURL = process.env.REACT_APP_API_URL_IMAGE || "";
        this.classificationServiceURL = process.env.REACT_APP_API_URL_CLASSIFICATION || "";

        if (this.typeServiceURL === "") {
            throw new Error("Type service URL is not set");
        }

        if (this.imageServiceURL === "") {
            throw new Error("Image service URL is not set");
        }

        if (this.classificationServiceURL === "") {
            throw new Error("Classification service URL is not set");
        }
    }
}

export default new ClientConfiguration();