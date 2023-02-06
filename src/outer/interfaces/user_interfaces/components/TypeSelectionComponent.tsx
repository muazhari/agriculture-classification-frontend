import React, {Dispatch, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {HomePageState} from "../../../reducers/HomePageReducer";
import {fetchAllType, selectClassificationType} from "../../../actions/TypeAction";

const TypeSelectionComponent = (props: any) => {
    const dispatch: Dispatch<any> = useDispatch();
    const {
        types,
        selectedTypeId
    }: HomePageState = useSelector((state: any) => state.homePageReducer)


    useEffect(() => {
        dispatch(fetchAllType());
    }, []);


    const handleOnChange = (event: any) => {
        dispatch(selectClassificationType(event.target.value));
    };

    return (
        <div className="upload component">
            <select className="form-select" onChange={handleOnChange} value={selectedTypeId}>
                <option value={""}>Select classification type.</option>
                {types.map((type: any) => <option key={type.id} value={type.id}>{type.name}</option>)}
            </select>
        </div>
    );
};

export default TypeSelectionComponent;