import React, { useMemo } from "react";
import styles from "@/components/styles/card.module.sass";
import ReactPlayer from "react-player";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { IComponentCardVideoSchema } from "@/components/features/app/modules/components/types/v1/interface-components";
import useDeviceHeightProperty from "@/components/shared/hooks/useDeviceHeightProperty";

interface Props {
	data: IComponentCardVideoSchema;
	fullHeight?: boolean;
}

/**
 * @author Zholaman Zhumanov
 * @created 25.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const VideoRender: React.FC<Props> = (props) => {
	const { data, fullHeight } = props;

	const { editorVideoPlay } = useAppSelector((state) => state.editor);

	const heightDeviceProperty = useDeviceHeightProperty();

	const videoSrc = useMemo(() => {
		return data.content?.video?.videoSrc;
	}, [data]);

	const videoPoster = useMemo(() => {
		return data.content?.video?.poster?.url;
	}, [data]);

	return !videoSrc ? (
		<figure>
			<img
				src={videoPoster}
				alt=""
				style={{
					height: fullHeight
						? heightDeviceProperty(fullHeight)
						: "auto",
				}}
				className={styles.img}
			/>
		</figure>
	) : (
		<ReactPlayer
			url={videoSrc}
			playsinline
			loop
			controls={false}
			muted
			playing={editorVideoPlay}
			autoPlay={editorVideoPlay}
			width="100%"
			height="100%"
			style={{
				position: "relative",
				padding: "0",
			}}
		/>
	);
};

export default VideoRender;
