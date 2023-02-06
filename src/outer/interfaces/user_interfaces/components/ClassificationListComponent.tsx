import React, {Dispatch, useEffect, useState} from 'react';
import ClassificationEntity from "../../../../inner/models/entities/ClassificationEntity";
import {deleteOneClassificationById, fetchAllClassification} from "../../../actions/ClassificationAction";
import {fetchAllImage} from "../../../actions/ImageAction";
import {useDispatch, useSelector} from "react-redux";
import {HomePageState} from "../../../reducers/HomePageReducer";
import ModalComponent from "./ModalComponent";
import {Modal} from "react-bootstrap";
import RelationshipUseCase from "../../../../inner/usecases/classification/RelationshipUseCase";

const ClassificationListComponent = (props: any) => {
    const dispatch: Dispatch<any> = useDispatch();
    const {
        classifications,
        images,
        types
    }: HomePageState = useSelector((state: any) => state.homePageReducer);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentClassification, setCurrentClassification] = useState<ClassificationEntity | null>(null);

    useEffect(() => {
        dispatch(fetchAllClassification());
        dispatch(fetchAllImage());
    }, []);

    const handleOnClickDelete = (entity: ClassificationEntity) => {
        dispatch(deleteOneClassificationById(entity.id));
    };

    const handleOnClickDetail = (entity: ClassificationEntity) => {
        setIsModalOpen(true);
        setCurrentClassification(entity);
        console.log(entity, isModalOpen);
    };

    const handleOnCloseModal = () => {
        setIsModalOpen(false);
    };

    const getListFromResult = (result: string): [string, any][] => {
        const data = JSON.parse(result);
        const sortedData = Object.entries(data[0])
            .sort((a: any, b: any): number => {
                return b[1] - a[1];
            });
        return sortedData;
    };

    const getTopSelectionFromResult = (result: string, n: number): [string, number][] => {
        const resultList: [string, any][] = getListFromResult(result);
        const topSelection: [string, number][] = resultList.splice(0, n);
        return topSelection;
    };

    return (
        <div className="tutorial-list component">
            <ModalComponent show={isModalOpen} onHide={() => handleOnCloseModal()}>
                <Modal.Header>
                    <h2>
                        Detail
                    </h2>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">Label</th>
                            <th scope="col">Confidence Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            currentClassification && getListFromResult(currentClassification.result).map((item: any, index: number) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item[0]}</td>
                                            <td>{item[1]}</td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </Modal.Body>
            </ModalComponent>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Type</th>
                    <th>Image</th>
                    <th>File Name</th>
                    <th>Result</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    classifications && classifications.map((classification: ClassificationEntity, index: number) => {
                        return (<tr key={index}>
                                <td>{RelationshipUseCase.getOneType(classification, types)?.name}</td>
                                <td>
                                    <img className=""
                                         src={
                                             `data:image/jpeg;base64,${RelationshipUseCase.getOneImage(classification, images)?.file}`
                                         }
                                    />
                                </td>
                                <td>{RelationshipUseCase.getOneImage(classification, images)?.file_name}</td>
                                <td>
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th scope="col">Label</th>
                                            <th scope="col">Confidence Score</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            getTopSelectionFromResult(classification.result, 3).map((item: any, index: number) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item[0]}</td>
                                                        <td>{item[1]}</td>
                                                    </tr>
                                                );
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                    <div className="d-flex flex-column">
                                        <div className="btn btn-info me-2"
                                             onClick={() => handleOnClickDetail(classification)}>
                                            Detail
                                        </div>
                                        <div className="btn btn-danger my-3"
                                             onClick={() => handleOnClickDelete(classification)}>
                                            Delete
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        );
                    }).reverse()
                }
                </tbody>
            </table>
        </div>
    );
};

export default ClassificationListComponent;