import React from "react";
import styles from "@/components/styles/card.module.sass";
import { ISchemaContentPhoto } from "@/components/shared/types/interface-schema-content";
import useGetImageContent from "@/components/shared/hooks/useGetImageContent";
import useDeviceHeightProperty from "@/components/shared/hooks/useDeviceHeightProperty";

interface Props {
	imageData?: ISchemaContentPhoto | null;
	fullHeight?: boolean;
}

/**
 * @author Zholaman Zhumanov
 * @created 27.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const ImageRender: React.FC<Props> = (props) => {
	const { imageData, fullHeight = false } = props;

	const getImage = useGetImageContent(imageData ?? null);

	const heightDeviceProperty = useDeviceHeightProperty();

	if (!imageData) {
		return null;
	}

	return (
		<img
			src={getImage?.url}
			alt=""
			style={{
				height: fullHeight ? heightDeviceProperty(fullHeight) : "auto",
			}}
			className={styles.image_render}
		/>
	);
};

export default ImageRender;
