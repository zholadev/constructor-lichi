import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { cn } from "@/components/lib/utils";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import { Button } from "@/components/shared/shadcn/ui/button";
import { Cross1Icon } from "@radix-ui/react-icons";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import BaseComponentRender from "../../components/container/v1/BaseComponentRender";
import useActiveElementObserver from "../../../../../shared/hooks/useActiveElementObserver";
import StoriesAddButton from "./StoriesAddButton";

/**
 * @author Zholaman Zhumanov
 * @created 04.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const StoriesContent: React.FC = () => {
	const dialog = useDialogAction();
	const { editorAdditionalActiveElementAction } = useDispatchAction();

	const activeElementData = useActiveElementObserver();

	const { editorSwiperIndexShow } = useAppSelector((state) => state.editor);

	const closeStoriesHandle = () => {
		editorAdditionalActiveElementAction("none");
		dialog.dialogWidget.toggle();
	};

	if (!activeElementData?.componentId) {
		return null;
	}

	return (
		<div className={cn("size-full flex justify-center items-center")}>
			<div
				className={cn(
					"w-full p-3 relative bg-white rounded-md overflow-hidden"
				)}
			>
				{/*<div*/}
				{/*	className={cn(*/}
				{/*		"w-full absolute right-4 top-4 flex justify-end"*/}
				{/*	)}*/}
				{/*>*/}
				{/*	<Button variant="ghost" onClick={closeStoriesHandle}>*/}
				{/*		<Cross1Icon width={20} height={20} />*/}
				{/*	</Button>*/}
				{/*</div>*/}
				<div className={cn("grid grid-cols-3")}>
					<div
						className={cn(
							"col-span-2 overflow-hidden w-full h-auto"
						)}
					>
						<Swiper
							slidesPerView={1}
							slidesPerGroup={1}
							speed={400}
							controller={{ control: null }}
						>
							{activeElementData.activeData.widgets?.data?.map(
								(
									component: ISchemaComponent,
									index: number
								) => {
									return (
										<SwiperSlide key={component.id}>
											{editorSwiperIndexShow && (
												<span
													className={cn(
														"absolute top-1 w-[20px] h-[20px] text-xs left-1 z-10 rounded-full bg-white flex justify-center items-center"
													)}
												>
													{index}
												</span>
											)}
											<BaseComponentRender
												widgetComponent
												key={component.id}
												componentId={component.id}
												type={component?.type}
												componentData={component}
												containerData={
													activeElementData.containerData
												}
											/>
										</SwiperSlide>
									);
								}
							)}
						</Swiper>
					</div>

					<div className={cn("col-span-1")}>
						<StoriesAddButton />
					</div>
				</div>
			</div>
		</div>
	);
};

export default StoriesContent;
