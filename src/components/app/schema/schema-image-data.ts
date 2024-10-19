import { IMAGES } from "@/components/shared/constants/images";
import { ImageType } from "@/components/shared/types/types";
import { ISchemaContentPhotoTriple } from "@/components/shared/types/interface-schema-content";

export const getRandomImageSchema = (
	imageType: ImageType = "card"
): ISchemaContentPhotoTriple => {
	const getImage =
		IMAGES.THUMBNAIL[imageType][
			Math.floor(Math.random() * IMAGES.THUMBNAIL[imageType].length)
		];

	// if (single) {
	// 	return {
	// 		url: getImage.src,
	// 	};
	// }

	return {
		desktop: {
			url: getImage.src,
		},
		tablet: {
			url: getImage.src,
		},
		mobile: {
			url: getImage.src,
		},
	};
};
