import ClassificationEntity from "../../models/entities/ClassificationEntity";
import ImageEntity from "../../models/entities/ImageEntity";
import TypeEntity from "../../models/entities/TypeEntity";

class RelationshipUseCase {
    getOneImage = (classification: ClassificationEntity, images: ImageEntity[]): ImageEntity | undefined => {
        return images.find(image => image.id === classification.image_id);
    };

    getOneType = (classification: ClassificationEntity, types: TypeEntity[]): TypeEntity | undefined => {
        return types.find(type => type.id === classification.type_id);
    }

}

export default new RelationshipUseCase();