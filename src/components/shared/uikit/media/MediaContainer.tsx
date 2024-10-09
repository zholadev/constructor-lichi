import React, { useMemo } from "react";
import VideoRender from "@/components/shared/uikit/media/VideoRender";
import ImageRender from "@/components/shared/uikit/media/ImageRender";
import { IComponentTotalDataSchema } from "@/components/features/app/modules/components/types/v1/interface-components";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";

interface Props {
	componentData: IComponentTotalDataSchema;
	containerData: ISchemaContainer;
	imgAutoHeight: boolean
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
const MediaContainer: React.FC<Props> = (props) => {
	const { componentData, containerData, imgAutoHeight = false } = props;

	/**
	 * @description Получаем тип контента для вывода
	 */
	const contentType = useMemo(() => {
		return componentData?.settings?.view?.contentType;
	}, [componentData]);

	return contentType === "video" ? (
		<VideoRender data={componentData} />
	) : (
		<ImageRender
			imageData={componentData.content}
			fullHeight={containerData?.settings?.view?.heightFull && !imgAutoHeight}
		/>
	);
};

export default MediaContainer;
