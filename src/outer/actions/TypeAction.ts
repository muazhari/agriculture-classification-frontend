import {FETCH_ALL_TYPE, SELECT_CLASSIFICATION_TYPE} from './Types';
import TypeClient from "../interfaces/clients/TypeClient";
import {AxiosResponse} from "axios";
import Content from "../../inner/models/value_objects/responses/Content";
import TypeEntity from "../../inner/models/entities/TypeEntity";


const selectClassificationType = (type_id: string) => (dispatch: any) => {
    dispatch({type: SELECT_CLASSIFICATION_TYPE, payload: type_id});
}

const fetchAllType = () => (dispatch: any) => {
    TypeClient
        .readAll()
        .then((response: AxiosResponse<Content<TypeEntity[]>>) => {
            const content: Content<TypeEntity[]> = response.data;
            dispatch({type: FETCH_ALL_TYPE, payload: content.data});
        });
}

export {
    selectClassificationType,
    fetchAllType
};