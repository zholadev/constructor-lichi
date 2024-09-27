import React from "react";
import styles from "@/components/styles/card.module.sass";
import { ISchemaContentPhoto } from "@/components/shared/types/interface-schema-content";
import useGetImageContent from "@/components/shared/hooks/useGetImageContent";
import { cn } from "@/components/lib/utils";

interface Props {
	imageData: ISchemaContentPhoto;
	fullHeight: boolean;
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
	const { imageData, fullHeight } = props;

	const getImage = useGetImageContent(imageData);

	return (
		<img
			src={getImage?.url}
			alt=""
			className={cn(
				[],
				fullHeight ? styles.image_render_cover : styles.image_render
			)}
		/>
	);
};

export default ImageRender;
