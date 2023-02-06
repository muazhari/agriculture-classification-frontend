import ClassificationListComponent from "../components/ClassificationListComponent";
import UploadComponent from "../components/UploadComponent";
import "./styles/HomePageStyle.scss";
import React from "react";
import TypeSelectionComponent from "../components/TypeSelectionComponent";

const HomePage = () => {
    return (
        <div className="home page m-4">
            <div className="title mb-4">
                <h1>
                    Agriculture Classification
                </h1>
                Classification System to classify 6 classes of fruit quality and 65 classes of plant diseases.
            </div>

            <div className="types mb-4">
                <h2>
                    Types
                </h2>
                <TypeSelectionComponent/>
            </div>

            <div className="upload mb-4">
                <h2>
                    Uploads
                </h2>
                <UploadComponent/>
            </div>

            <div className="classification">
                <h2>
                    Classification
                </h2>
                <ClassificationListComponent/>
            </div>
        </div>
    );
};

export default HomePage;