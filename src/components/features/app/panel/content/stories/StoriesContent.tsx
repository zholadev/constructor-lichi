import React, { useMemo } from "react";
import { cn } from "@/components/lib/utils";
import BaseComponentRender from "@/components/features/app/ui/components/container/BaseComponentRender";
import useActiveElementFollowUp from "@/components/shared/hooks/useActiveElementFollowUp";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
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
	const activeElementData = useActiveElementFollowUp();

	const { editorSwiperIndexShow } = useAppSelector((state) => state.editor);

	if (!activeElementData.id) {
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
					"min-w-[300px] p-3 w-[60%] min-h-[300px] bg-white rounded-md"
				)}
			>
				<h3 className={cn("w-full text-sm mb-6 text-center uppercase")}>
					Добавить stories для компонента
				</h3>

				<div className={cn("grid grid-cols-3")}>
					<div className={cn("col-span-2")}>
						<Swiper
							slidesPerView={1}
							slidesPerGroup={1}
							speed={400}
							controller={{ control: null }}
						>
							{activeElementData.additionalData?.components?.map(
								(component, index) => {
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
												additionalActiveEvent
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
