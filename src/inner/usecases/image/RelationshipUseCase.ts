import ClassificationEntity from "../../models/entities/ClassificationEntity";
import ImageEntity from "../../models/entities/ImageEntity";

class RelationshipUseCase {
    getManyRecognitions = (image: ImageEntity, classifications: ClassificationEntity[]): ClassificationEntity[] | undefined => {
        return classifications.filter(classification => classification.image_id === image.id);
    };
}

export default new RelationshipUseCase();