import React, { useEffect, useMemo } from "react";
import { cn } from "@/components/lib/utils";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/shared/shadcn/ui/accordion";
import {
	ImageIcon,
	Link1Icon,
	TextIcon,
	VideoIcon,
} from "@radix-ui/react-icons";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import usePermission from "@/components/shared/hooks/usePermission";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import ImageContent from "@/components/features/app/modules/editor/content/ImageContent";
import VideoContent from "@/components/features/app/modules/editor/content/VideoContent";
import LinkContent from "@/components/features/app/modules/editor/content/LinkContent";
import StoriesContent from "@/components/features/app/modules/editor/content/StoriesContent";
import TextFillContent from "@/components/features/app/modules/editor/content/TextFillContent";
import useUpdateActions from "@/components/shared/hooks/ actions/useUpdateActions";
import useUpdateWidgetActions from "@/components/shared/hooks/ actions/useUpdateWidgetActions";

type AccessTypes = "video" | "photo" | "link" | "stories";
type ContentKeys = "photo" | "link" | "video" | "stories";

interface IContentActiveData {
	content: {
		link: Record<string, unknown>;
		photo: Record<string, unknown>;
		video: Record<string, unknown>;
		title?: Record<string, unknown>;
		stories?: Record<string, unknown>;
	};
}

interface Content {
	photo?: Record<string, unknown>;
	link?: Record<string, unknown>;
	video?: Record<string, unknown>;
	title?: Record<string, unknown>;
}

const accessTypes: AccessTypes[] = ["video", "photo", "link", "stories"];

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
const ContentContainer: React.FC = () => {
	const permission = usePermission();
	const updateActions = useUpdateActions();
	const updateWidgetActions = useUpdateWidgetActions();
	const activeElementData = useActiveElementObserver();

	const { editorActiveElement } = useAppSelector((state) => state.editor);

	const [defaultExpanded, setExpanded] = React.useState<string[]>([""]);

	const contentActiveData: IContentActiveData = useMemo(() => {
		try {
			const content = activeElementData?.activeData?.content;

			return {
				content: {
					link: content?.link ?? { url: null, active: false },
					photo: content?.photo,
					video: content?.video ?? { videoSrc: "", poster: null },
					title: content?.title ?? {},
					stories: content?.stories ?? {},
				},
			};
		} catch (error) {
			if (error instanceof Error) {
				errorHandler("SettingContainer", "contentActiveData", error);
			}
		}
	}, [activeElementData]);

	const filterContentKeys = (
		content: Content,
		accessTypes: AccessTypes[]
	) => {
		const filteredKeys: ContentKeys[] = Object.keys(content)
			.filter((key) => accessTypes.includes(key as AccessTypes))
			.map((key) => key as ContentKeys);

		setExpanded(filteredKeys);
	};

	const removeSchemaDataHandle = (pathString: string) => {
		if (activeElementData?.widgetType === "stories") {
			updateWidgetActions.update({}, pathString, true);
			return;
		}
		updateActions.update({}, pathString, true);
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

	if (!permission.panel.content) {
		return (
			<h2 className={cn("w-full text-center text-xs")}>Нет доступа!</h2>
		);
	}

	return (
		<div className={cn("w-full p-3")}>
			<Accordion
				type="multiple"
				className="w-full"
				value={defaultExpanded}
				onValueChange={setExpanded}
			>
				{permission.content.image && (
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
							<Accordion type="multiple" className="w-full">
								{Object.entries(
									contentActiveData?.content?.photo || {}
								).map(([key, value], index: number) => {
									return (
										<AccordionItem value={key} key={index}>
											<AccordionTrigger>
												<div
													className={cn(
														"w-full flex flex-row items-center gap-2"
													)}
												>
													<h2
														className={cn(
															"uppercase mb-3 text-xs"
														)}
													>
														{key}
													</h2>
												</div>
											</AccordionTrigger>
											<AccordionContent>
												<div className={cn("w-full")}>
													<ImageContent
														imageSrc={value}
														onChange={(data) => {
															if (
																activeElementData?.widgetType ===
																"stories"
															) {
																updateWidgetActions.update(
																	data,
																	`content.photo.${key}`
																);
																return;
															}
															updateActions.update(
																data,
																`content.photo.${key}`
															);
														}}
													/>
												</div>
											</AccordionContent>
										</AccordionItem>
									);
								})}
							</Accordion>
						</AccordionContent>
					</AccordionItem>
				)}

				{permission.content.video && (
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
							<VideoContent
								defaultParams={{
									videoSrc:
										contentActiveData.content.video
											?.videoSrc,
									poster: contentActiveData.content.video
										?.poster,
								}}
								onSendParams={(params) => {
									if (
										activeElementData?.widgetType ===
										"stories"
									) {
										updateWidgetActions.update(
											params,
											"content.video"
										);
										return;
									}

									updateActions.update(
										params,
										"content.video"
									);
								}}
							/>
						</AccordionContent>
					</AccordionItem>
				)}

				{permission.content.link && (
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
							<LinkContent
								defaultParams={contentActiveData.content.link}
								onSendParams={(params) => {
									if (
										activeElementData?.widgetType ===
										"stories"
									) {
										updateWidgetActions.update(
											params,
											"content.link"
										);
										return;
									}
									updateActions.update(
										params,
										"content.link"
									);
								}}
								onRemoveParams={() =>
									removeSchemaDataHandle("content.link")
								}
							/>
						</AccordionContent>
					</AccordionItem>
				)}

				{permission.content.textFill && (
					<AccordionItem value="textFill">
						<AccordionTrigger>
							<div
								className={cn(
									"w-full flex flex-row items-center gap-2"
								)}
							>
								<TextIcon width={20} height={20} />
								Text Fill
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<TextFillContent
								defaultParams={contentActiveData.content?.title}
								onSendParams={(params) => {
									if (
										activeElementData?.widgetType ===
										"stories"
									) {
										updateWidgetActions.update(
											params,
											"content.title"
										);
										return;
									}
									updateActions.update(
										params,
										"content.title"
									);
								}}
							/>
						</AccordionContent>
					</AccordionItem>
				)}

				{permission.content.stories && (
					<AccordionItem value="stories">
						<AccordionTrigger>
							<div
								className={cn(
									"w-full flex flex-row items-center gap-2"
								)}
							>
								<TextIcon width={20} height={20} />
								Stories
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<StoriesContent
								defaultParams={
									contentActiveData.content?.stories
								}
								onSendParams={(params) => {
									if (
										activeElementData?.widgetType ===
										"stories"
									) {
										updateWidgetActions.update(
											params,
											"content.stories"
										);
										return;
									}
									updateActions.update(
										params,
										"content.stories"
									);
								}}
								onRemoveParams={() =>
									removeSchemaDataHandle("content.stories")
								}
							/>
						</AccordionContent>
					</AccordionItem>
				)}
			</Accordion>
		</div>
	);
};

export default ContentContainer;
