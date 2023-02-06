import Axios, {AxiosResponse} from "axios";
import typeEntity from "../../../inner/models/entities/TypeEntity";
import ClientConfiguration from "../../configurations/ClientConfiguration";
import Content from "../../../inner/models/value_objects/responses/Content";
import CreateOneTypeRequest from "../../../inner/models/value_objects/requests/CreateOneTypeRequest";

class TypeClient {

    URL: string = ClientConfiguration.typeServiceURL;

    readAll = (): Promise<AxiosResponse<Content<typeEntity[]>>> => {
        return Axios.get(`${this.URL}`);
    };

    readOneById = (id: string): Promise<AxiosResponse<Content<typeEntity>>> => {
        return Axios.get(`${this.URL}/${id}`);
    };

    createOne = (tutorial: CreateOneTypeRequest): Promise<AxiosResponse<Content<typeEntity>>> => {
        return Axios.post(`${this.URL}`, tutorial);
    };

    createMany = (entities: CreateOneTypeRequest[]): Promise<AxiosResponse<Content<typeEntity[]>>> => {
        return Axios.post(`${this.URL}/many`, entities);
    };

    updateOneById = (id: string, entity: typeEntity): Promise<AxiosResponse<Content<typeEntity>>> => {
        return Axios.put(`${this.URL}/${id}`, entity);
    };

    deleteOneById = (id: string): Promise<AxiosResponse<Content<typeEntity>>> => {
        return Axios.delete(`${this.URL}/${id}`);
    };

}

export default new TypeClient();
