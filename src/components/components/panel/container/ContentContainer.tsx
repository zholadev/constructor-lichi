import React, { useMemo } from "react";
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
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import usePermission from "@/components/shared/hooks/usePermission";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import ImageContent from "@/components/features/app/modules/editor/content/ImageContent";
import VideoContent from "@/components/features/app/modules/editor/content/VideoContent";
import LinkContent from "@/components/features/app/modules/editor/content/LinkContent";
import TextFillContent from "@/components/features/app/modules/editor/content/TextFillContent";
import useUpdateActions from "@/components/shared/hooks/actions/useUpdateActions";
import useUpdateWidgetActions from "@/components/features/app/modules/widgets/hooks/useUpdateWidgetActions";
import AnimationContent from "@/components/features/app/modules/editor/content/AnimationContent";
import { Framer } from "lucide-react";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { ISchemaContent } from "@/components/shared/types/interface-schema-content";

/**
 * @author Zholaman Zhumanov
 * @created 26.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo типизация
 * @fixme
 * @constructor
 */
const ContentContainer: React.FC = () => {
	const permission = usePermission();
	const toastMessage = useToastMessage();
	const updateActions = useUpdateActions();
	const updateWidgetActions = useUpdateWidgetActions();
	const activeElementData = useActiveElementObserver();

	const [defaultExpanded, setExpanded] = React.useState<string[]>([""]);

	const contentActiveData = useMemo((): ISchemaContent | null => {
		try {
			const contentData: ISchemaContent | null =
				activeElementData?.selectWidgetIsEditing
					? // @ts-ignore
						(activeElementData?.selectWidgetActiveData?.content ??
						null)
					: // @ts-ignore
						(activeElementData?.selectActiveData?.content ?? null);

			if (!contentData) {
				return null;
			}

			return {
				link: contentData?.link ?? {
					href: { src: "", internal_src: "" },
				},
				photo: contentData?.photo,
				video: contentData?.video ?? {
					videoSrc: "",
					poster: { url: "" },
				},
				title: contentData?.title ?? {},
				animation: contentData.animation ?? {
					type: "none",
					observer: true,
				},
			};
		} catch (error) {
			if (error instanceof Error) {
				errorHandler("SettingContainer", "contentActiveData", error);
			}

			return null;
		}
	}, [activeElementData]);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления данных контента
	 * @param data
	 * @param path
	 */
	const updateSchemaHandle = (data: any, path: string) => {
		if (!data || !path) {
			toastMessage("ValueError: data or path is not defined!", "error");
			return;
		}
		if (activeElementData?.selectWidgetIsEditing) {
			updateWidgetActions.update(data, path);
			return;
		}
		updateActions.update(data, path);
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для удаления контента
	 * @param pathString
	 */
	const removeSchemaDataHandle = (pathString: string) => {
		if (activeElementData?.selectWidgetIsEditing) {
			updateWidgetActions.update({}, pathString);
			return;
		}
		updateActions.update({}, pathString);
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Если прилетает false то не выводим контент
	 */
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
									contentActiveData?.photo || {}
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
														defaultData={value}
														onUpdateSchemaHandle={(
															data
														) => {
															updateSchemaHandle(
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

				{permission?.content?.video && (
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
								defaultData={contentActiveData?.video}
								onUpdateSchemaHandle={(data) => {
									updateSchemaHandle(data, "content.video");
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
								defaultData={contentActiveData?.link}
								onUpdateSchemaHandle={(data) => {
									updateSchemaHandle(data, "content.link");
								}}
								onRemoveSchemaHandle={() =>
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
								defaultData={contentActiveData?.title}
								onUpdateSchemaHandle={(data) => {
									updateSchemaHandle(data, "content.title");
								}}
							/>
						</AccordionContent>
					</AccordionItem>
				)}

				{permission.content.animation && (
					<AccordionItem value="animation">
						<AccordionTrigger>
							<div
								className={cn(
									"w-full flex flex-row items-center gap-2"
								)}
							>
								<Framer width={20} height={20} />
								Анимация
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<AnimationContent
								defaultData={contentActiveData?.animation}
								onUpdateSchemaHandle={(data) => {
									updateSchemaHandle(
										data,
										"content.animation"
									);
								}}
								onRemoveSchemaHandle={() =>
									removeSchemaDataHandle("content.animation")
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
