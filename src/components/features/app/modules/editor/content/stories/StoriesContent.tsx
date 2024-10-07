import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { cn } from "@/components/lib/utils";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import { Button } from "@/components/shared/shadcn/ui/button";
import { Cross1Icon } from "@radix-ui/react-icons";
import BaseComponentRender from "../../../components/container/v1/BaseComponentRender";
import useActiveElementObserver from "../../../../../../shared/hooks/useActiveElementObserver";
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
	const activeElementData = useActiveElementObserver();

	const dialog = useDialogAction();

	const { editorSwiperIndexShow } = useAppSelector((state) => state.editor);

	if (!activeElementData?.componentId) {
		return null;
	}

	return (
		<div
			className={cn(
				"size-full flex justify-center items-center absolute top-0 left-0"
			)}
		>
			<div
				className={cn(
					"min-w-[300px] max-h-[40vw] p-3 w-[60%] relative min-h-[300px] bg-white rounded-md"
				)}
			>
				<div
					className={cn(
						"w-full absolute right-4 top-4 flex justify-end"
					)}
				>
					<Button
						variant="ghost"
						onClick={dialog.dialogStoriesContainer.toggle}
					>
						<Cross1Icon width={20} height={20} />
					</Button>
				</div>
				<h3 className={cn("w-full text-sm mb-6 text-center uppercase")}>
					Добавить stories для компонента
				</h3>

				<div className={cn("grid grid-cols-3")}>
					<div className={cn("col-span-2 overflow-hidden w-full h-auto")}>
						<Swiper
							slidesPerView={1}
							slidesPerGroup={1}
							speed={400}
							controller={{ control: null }}
						>
							{activeElementData.widgetData?.components?.map(
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
												type={component.data?.type}
												componentData={component.data}
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
