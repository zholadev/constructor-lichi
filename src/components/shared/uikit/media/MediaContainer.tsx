import React, { useMemo } from "react";
import VideoRender from "@/components/shared/uikit/media/VideoRender";
import ImageRender from "@/components/shared/uikit/media/ImageRender";
import { IComponentTotalDataSchema } from "@/components/features/app/modules/components/types/v1/interface-components";

interface Props {
	componentData: IComponentTotalDataSchema;
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
	const { componentData } = props;

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
			fullHeight={componentData?.settings?.view?.heightFull}
		/>
	);
};

export default MediaContainer;
