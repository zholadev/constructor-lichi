import React, { useEffect, useMemo } from "react";
import { cn } from "@/components/lib/utils";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/shared/shadcn/ui/accordion";
import { ImageIcon, Link1Icon, VideoIcon } from "@radix-ui/react-icons";
import { GalleryHorizontalEnd } from "lucide-react";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useEditorEvent from "@/components/shared/hooks/useEditorEvent";
import ImageSetting from "@/components/features/app/panel/settings/ImageSetting";
import VideoSetting from "@/components/features/app/panel/settings/VideoSetting";
import SwiperSetting from "@/components/features/app/panel/settings/SwiperSetting";
import LinkSetting from "@/components/features/app/panel/settings/LinkSetting";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";

type AccessTypes = "video" | "photo" | "link";
type ContentKeys = "photo" | "link" | "video";

interface IContentActiveData {
	content: {
		link: Record<string, unknown>;
		photo: Record<string, unknown>;
		video: Record<string, unknown>;
	};
}

interface Content {
	photo?: Record<string, unknown>;
	link?: Record<string, unknown>;
	video?: Record<string, unknown>;
}

const accessTypes: AccessTypes[] = ["video", "photo", "link"];

/**
 * @author Zholaman Zhumanov
 * @created 26.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo refactoring
 * @fixme
 * @constructor
 */
const SettingContainer: React.FC = () => {
	const { editorActiveElement } = useAppSelector((state) => state.editor);

	const editorEvent = useEditorEvent();

	const [defaultExpanded, setExpanded] = React.useState<string[]>([""]);

	const contentActiveData: IContentActiveData = useMemo(() => {
		try {
			const content = editorActiveElement?.componentData?.content;

			return {
				content: {
					link: content?.link ?? { url: null, active: false },
					photo: content?.photo,
					video: content?.video ?? { videoSrc: "", poster: null },
				},
			};
		} catch (error) {
			if (error instanceof Error) {
				errorHandler("SettingContainer", "contentActiveData", error);
			}
		}
	}, [editorActiveElement]);

	const filterContentKeys = (
		content: Content,
		accessTypes: AccessTypes[]
	) => {
		const filteredKeys: ContentKeys[] = Object.keys(content)
			.filter((key) => accessTypes.includes(key as AccessTypes))
			.map((key) => key as ContentKeys);

		setExpanded(filteredKeys);
	};

	useEffect(() => {
		if (editorActiveElement.componentData) {
			if (editorActiveElement.componentData.content) {
				filterContentKeys(
					editorActiveElement.componentData.content,
					accessTypes
				);
			}
		}
	}, [editorActiveElement]);

	return (
		<div className={cn("w-full p-3")}>
			<Accordion
				type="multiple"
				className="w-full"
				value={defaultExpanded}
				onValueChange={setExpanded}
			>
				<AccordionItem value="photo">
					<AccordionTrigger>
						<div
							className={cn(
								"w-full flex flex-row items-center gap-2"
							)}
						>
							<ImageIcon width={20} height={20} />
							Image
						</div>
					</AccordionTrigger>
					<AccordionContent>
						{Object.entries(
							editorActiveElement.componentData?.content?.photo ||
								{}
						).map(([key, value], index: number) => {
							return (
								<div key={index} className={cn("w-full")}>
									<h2
										className={cn("uppercase mb-3 text-xs")}
									>
										{key}
									</h2>
									<ImageSetting
										imageSrc={value}
										onChange={(data) => {
											editorEvent.updateComponent(
												data,
												"content",
												`photo.${key}`
											);
										}}
									/>
								</div>
							);
						})}
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="video">
					<AccordionTrigger>
						<div
							className={cn(
								"w-full flex flex-row items-center gap-2"
							)}
						>
							<VideoIcon width={20} height={20} />
							Video
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<VideoSetting
							defaultParams={{
								videoSrc:
									contentActiveData.content.video?.videoSrc,
								poster: contentActiveData.content.video?.poster,
							}}
							onSendParams={(params) => {
								editorEvent.updateComponent(
									params,
									"content",
									"video"
								);
							}}
						/>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="link">
					<AccordionTrigger>
						<div
							className={cn(
								"w-full flex flex-row items-center gap-2"
							)}
						>
							<Link1Icon width={20} height={20} />
							Link
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<LinkSetting
							defaultParams={contentActiveData.content.link}
							onSendParams={(params) => {
								editorEvent.updateComponent(
									params,
									"content",
									"link"
								);
							}}
						/>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="swiper">
					<AccordionTrigger>
						<div
							className={cn(
								"w-full flex flex-row items-center gap-2"
							)}
						>
							<GalleryHorizontalEnd />
							Slider
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<SwiperSetting />
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default SettingContainer;
