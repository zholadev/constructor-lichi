import React, { useMemo } from "react";
import ReactPlayer from "react-player";
import styles from "@/components/styles/card.module.sass";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { IElementTotal } from "@/components/features/app/elements/types/interface-elements";
import BaseElementRender from "@/components/features/app/elements/container/BaseElementRender";
import ComponentAction from "@/components/features/app/components/actions/component/ComponentAction";
import { IComponentCardVideoSchema } from "../types/interface-components";

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
 * @todo refactoring, poster fix
 * @fixme
 * @param props
 * @constructor
 */
const Video: React.FC<Props> = (props) => {
	const { data, containerId } = props;

	const { editorVideoPlay } = useAppSelector((state) => state.editor);

	const videoSrc = useMemo(() => {
		return data.content?.video?.videoSrc;
	}, [data.content.video]);

	const videoPoster = useMemo(() => {
		return data.content?.video?.poster?.url;
	}, [data.content.video]);

	return (
		<ComponentAction containerId={containerId} data={data}>
			<div style={{ ...data.style }} className={styles.wrapper}>
				{!videoSrc ? (
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
				)}

				<div className={styles.content}>
					{data.elements.map((element: IElementTotal) => {
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
