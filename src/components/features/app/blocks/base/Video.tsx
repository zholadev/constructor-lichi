import React from "react";
import ComponentAction from "@/components/features/app/components/actions/component/ComponentAction";
import styles from "@/components/styles/card.module.sass";
import { IElementSchema } from "@/components/shared/types/interface-elements";
import BaseElementRender from "@/components/features/app/elements/container/BaseElementRender";
import { IComponentCardVideoSchema } from "@/components/shared/types/interface-components";
import ReactPlayer from "react-player";
import { useAppSelector } from "@/components/app/store/hooks/hooks";

interface Props {
	data: IComponentCardVideoSchema;
	containerId: string;
}

/**
 * @author Zholaman Zhumanov
 * @created 17.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo refactoring
 * @fixme
 * @param props
 * @constructor
 */
const Video: React.FC<Props> = (props) => {
	const { data, containerId } = props;

	const { editorVideoPlay } = useAppSelector((state) => state.editor);

	return (
		<ComponentAction containerId={containerId} data={data}>
			<div style={{ ...data.style }} className={styles.wrapper}>
				{!data.content?.video?.videoSrc ? (
					<figure>
						<img
							src={data.content.video.poster?.desktop.url}
							alt=""
							className={styles.img}
						/>
					</figure>
				) : (
					<ReactPlayer
						url={data.content?.video?.videoSrc}
						playsinline
						loop
						controls={false}
						muted
						playing={editorVideoPlay}
						autoPlay={editorVideoPlay}
						width="100%"
						height="100%"
						style={{
							// objectFit: "cover",
							position: "relative",
							padding: "0",
						}}
					/>
				)}

				<div className={styles.content}>
					{data.elements.map((element: IElementSchema) => {
						return (
							<BaseElementRender
								key={element.id}
								type={element.type}
								data={element}
								containerId={containerId}
								componentId={data.id}
							/>
						);
					})}
				</div>
			</div>
		</ComponentAction>
	);
};

export default Video;
