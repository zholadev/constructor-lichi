import React, { useMemo } from "react";
import styles from "@/components/styles/card.module.sass";
import ReactPlayer from "react-player";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { IComponentCardVideoSchema } from "@/components/features/app/blocks/types/interface-components";

interface Props {
	data: IComponentCardVideoSchema;
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
	const { data } = props;

	const { editorVideoPlay } = useAppSelector((state) => state.editor);

	const videoSrc = useMemo(() => {
		return data.content?.video?.videoSrc;
	}, [data.content.video]);

	const videoPoster = useMemo(() => {
		return data.content?.video?.poster?.url;
	}, [data.content.video]);

	return !videoSrc ? (
		<figure>
			<img src={videoPoster} alt="" className={styles.img} />
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
