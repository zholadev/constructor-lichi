import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { SwiperSettings } from "@/components/shared/types/interface-schema-settings";
import useStylesFormatted from "@/components/shared/hooks/useStylesFormatted";
import BaseComponentRender from "@/components/features/app/modules/components/container/v1/BaseComponentRender";
import {
	ISchemaContainer,
	ISchemaContainerComponentWrapper,
} from "@/components/shared/types/interface-schema-container";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import { Autoplay, Pagination, Controller } from "swiper/modules";
import { cn } from "@/components/lib/utils";
import "swiper/css/pagination";
import { useAppSelector } from "@/components/app/store/hooks/hooks";

SwiperCore.use([Controller, Autoplay, Pagination]);

interface Props {
	componentsData: ISchemaContainerComponentWrapper;
	swiperSettings: SwiperSettings;
	swiperStyles: Record<string, unknown>;
	containerData: ISchemaContainer;
}

/**
 * @author Zholaman Zhumanov
 * @created 30.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const SwiperContainer: React.FC<Props> = (props) => {
	const { componentsData, swiperSettings, swiperStyles, containerData } =
		props;

	const swiperRef = useRef({});

	const styleFormatted = useStylesFormatted();

	const { editorSwiperIndexShow } = useAppSelector((state) => state.editor);

	useEffect(() => {
		try {
			if (swiperSettings) {
				const { swiper } = swiperRef.current;

				swiper.params.loop = swiperSettings.loop;
				swiper.params.slidesPerView = swiperSettings.slidePerView;
				swiper.params.slidesPerGroup = swiperSettings.slidePerGroup;
				swiper.params.centeredSlides = swiperSettings.centeredSlides;
				swiper.params.direction = swiperSettings.direction;
				swiper.params.mousewheel = swiperSettings.mousewheel;

				if (swiperSettings.autoplay) {
					swiper.params.autoplay = {
						delay: swiperSettings.speed_advanced?.delay || 1000,
						disableOnInteraction: false,
					};
					swiper.autoplay.start();
				} else {
					swiper.autoplay.stop();
					swiper.params.autoplay = false;
				}

				// Перезапуск swiper для применения новых настроек
				swiper.update();
				swiper.updateSize();
			}
		} catch (error) {
			errorHandler("swiperContainer", "effect", error);
		}
	}, [swiperSettings, swiperRef, componentsData, containerData]);

	const updatedSwiperSettings = {
		...swiperSettings,
		speed: swiperSettings.speed_advanced?.speed,
		pagination: swiperSettings.pagination
			? { type: swiperSettings.pagination_type }
			: false,
	};

	return (
		<div className={cn("overflow-hidden block")}>
			<Swiper
				ref={swiperRef}
				controller={{ control: null }}
				{...updatedSwiperSettings}
				pagination={swiperSettings.pagination}
				style={{
					...styleFormatted(
						swiperStyles,
						!containerData.settings?.view?.darkTheme
					),
				}}
				className={`swiper-container-v1 swiper-container-v1-paginate-${swiperSettings.paginationPosition} swiper-container-v1-paginate-${swiperSettings.paginationTheme}`}
			>
				{componentsData.map((component, index) => {
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
								containerData={containerData}
								componentData={component.data}
								type={component.data?.type}
								componentId={component.id}
							/>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default SwiperContainer;
