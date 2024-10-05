import { IMAGES } from "@/components/shared/constants/images";
import { ImageType } from "@/components/shared/types/types";

export const getRandomImageSchema = (
	imageType: ImageType = "card",
	single: boolean = false
) => {
	const getImage =
		IMAGES.THUMBNAIL[imageType][
			Math.floor(Math.random() * IMAGES.THUMBNAIL[imageType].length)
		];

	if (single) {
		return {
			url: getImage.src,
		};
	}

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
