import Axios, {AxiosResponse} from "axios";
import ClassificationEntity from "../../../inner/models/entities/ClassificationEntity";
import ClientConfiguration from "../../configurations/ClientConfiguration";
import Content from "../../../inner/models/value_objects/responses/Content";
import CreateOneClassificationRequest from "../../../inner/models/value_objects/requests/CreateOneClassificationRequest";

class ClassificationClient {

    URL: string = ClientConfiguration.classificationServiceURL;

    readAll = (): Promise<AxiosResponse<Content<ClassificationEntity[]>>> => {
        return Axios.get(`${this.URL}`);
    };

    readOneById = (id: string): Promise<AxiosResponse<Content<ClassificationEntity>>> => {
        return Axios.get(`${this.URL}/${id}`);
    };

    createOne = (tutorial: CreateOneClassificationRequest): Promise<AxiosResponse<Content<ClassificationEntity>>> => {
        return Axios.post(`${this.URL}`, tutorial);
    };

    createMany = (entities: CreateOneClassificationRequest[]): Promise<AxiosResponse<Content<ClassificationEntity[]>>> => {
        return Axios.post(`${this.URL}/many`, entities);
    };

    updateOneById = (id: string, entity: ClassificationEntity): Promise<AxiosResponse<Content<ClassificationEntity>>> => {
        return Axios.put(`${this.URL}/${id}`, entity);
    };

    deleteOneById = (id: string): Promise<AxiosResponse<Content<ClassificationEntity>>> => {
        return Axios.delete(`${this.URL}/${id}`);
    };

}

export default new ClassificationClient();
