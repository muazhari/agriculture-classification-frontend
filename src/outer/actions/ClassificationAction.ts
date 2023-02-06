import {
    CLASSIFY_MANY_IMAGE,
    DELETE_ONE_CLASSIFICATION_BY_ID,
    FETCH_ALL_CLASSIFICATION,
    UPLOAD_MANY_IMAGE
} from './Types';
import ClassificationClient from "../interfaces/clients/ClassificationClient";
import {AxiosResponse} from "axios/index";
import Content from "../../inner/models/value_objects/responses/Content";
import ClassificationEntity from "../../inner/models/entities/ClassificationEntity";
import CreateOneClassificationRequest from "../../inner/models/value_objects/requests/CreateOneClassificationRequest";
import CreateOneImageRequest from "../../inner/models/value_objects/requests/CreateOneImageRequest";
import ImageClient from "../interfaces/clients/ImageClient";
import ImageEntity from "../../inner/models/entities/ImageEntity";

const fetchAllClassification = () => (dispatch: any) => {
    ClassificationClient
        .readAll()
        .then((response: AxiosResponse<Content<ClassificationEntity[]>>) => {
            const content: Content<ClassificationEntity[]> = response.data;
            dispatch({type: FETCH_ALL_CLASSIFICATION, payload: content.data});
        });
};

const deleteOneClassificationById = (id: string) => (dispatch: any) => {
    ClassificationClient
        .deleteOneById(id)
        .then(() => {
            dispatch({type: DELETE_ONE_CLASSIFICATION_BY_ID, payload: id});
        });
};

const classifyManyImage = (request: CreateOneImageRequest[]) => (dispatch: any, getState: any) => {
    const {selectedTypeId} = getState().homePageReducer;
    console.log(selectedTypeId)

    ImageClient
        .createMany(request)
        .then((response: AxiosResponse<Content<ImageEntity[]>>) => {
            const contentImage: Content<ImageEntity[]> = response.data;
            dispatch({type: UPLOAD_MANY_IMAGE, payload: contentImage.data});

            const request: CreateOneClassificationRequest[] = contentImage.data.map(
                (image: ImageEntity) => new CreateOneClassificationRequest(selectedTypeId, image.id)
            );
            ClassificationClient
                .createMany(request)
                .then((response: AxiosResponse<Content<ClassificationEntity[]>>) => {
                    const contentClassification: Content<ClassificationEntity[]> = response.data;
                    dispatch({
                        type: CLASSIFY_MANY_IMAGE,
                        payload: {classificationData: contentClassification.data, imageData: contentImage.data}
                    });
                });
        });
};

export {
    fetchAllClassification,
    deleteOneClassificationById,
    classifyManyImage
};