import ClassificationEntity from "../../inner/models/entities/ClassificationEntity";

import {
    CLASSIFY_MANY_IMAGE,
    DELETE_ONE_CLASSIFICATION_BY_ID,
    FETCH_ALL_CLASSIFICATION,
    FETCH_ALL_IMAGE,
    FETCH_ALL_TYPE,
    SELECT_CLASSIFICATION_TYPE
} from "../actions/Types";
import ImageEntity from "../../inner/models/entities/ImageEntity";
import TypeEntity from "../../inner/models/entities/TypeEntity";

type HomePageState = {
    selectedTypeId: string,
    classifications: ClassificationEntity[],
    images: ImageEntity[]
    types: TypeEntity[]
}

const initialState: HomePageState = {
    selectedTypeId: "",
    classifications: [],
    images: [],
    types: []
};

const homePageReducer = (state: HomePageState = initialState, action: any) => {
    const {type, payload} = action;
    switch (type) {
        case SELECT_CLASSIFICATION_TYPE:
            return {...state, selectedTypeId: payload};
        case FETCH_ALL_TYPE:
            return {...state, types: payload};
        case FETCH_ALL_IMAGE:
            return {...state, images: payload};
        case FETCH_ALL_CLASSIFICATION:
            return {...state, classifications: payload};
        case DELETE_ONE_CLASSIFICATION_BY_ID:
            return {
                ...state,
                classifications: state.classifications.filter((classification: ClassificationEntity) => classification.id !== payload)
            };
        case CLASSIFY_MANY_IMAGE:
            return {
                ...state,
                classifications: [...state.classifications, ...payload.classificationData],
                images: [...state.images, ...payload.imageData]
            };
        default:
            return state;
    }
};

export {
    homePageReducer
};

export type {
    HomePageState
};
