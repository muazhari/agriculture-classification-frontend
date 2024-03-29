import React, {Dispatch, useState} from 'react';
import {useDispatch} from "react-redux";
import CreateOneImageRequest from "../../../../inner/models/value_objects/requests/CreateOneImageRequest";
import {classifyManyImage} from "../../../actions/ClassificationAction";
import Resizer from "react-image-file-resizer";

const UploadComponent = (props: any) => {
    const dispatch: Dispatch<any> = useDispatch();
    const [files, setFiles] = useState<File[]>([]);

    const handleOnChangeFile = (event: any) => {
        if (event.target.files) {
            setFiles([...event.target.files]);
        }
    };

    const resizeFile = (file: File) => new Promise<string>(resolve => {
        Resizer.imageFileResizer(file, 224, 224, 'JPEG', 100, 0,
            (uri: any) => {
                resolve(uri.replace(/^.*,/, ''));
            }, 'base64');
    });

    const handleOnClickUpload = async () => {
        const request: CreateOneImageRequest[] = await Promise.all(
            files.map(async (file: File) => new CreateOneImageRequest(file.name, await resizeFile(file)))
        );
        dispatch(classifyManyImage(request));
    };

    return (
        <div className="upload component">
            <input className="form-control-file" multiple type="file" accept="image/*" onChange={handleOnChangeFile}/>
            <div className="btn btn-success my-3" onClick={() => handleOnClickUpload()}>Upload</div>
        </div>
    );
};

export default UploadComponent;