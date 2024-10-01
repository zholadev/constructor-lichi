import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { SwiperSettings } from "@/components/shared/types/interface-schema-settings";
import { IComponentTotalDataSchema } from "@/components/features/app/ui/components/types/v1/interface-components";
import useStylesFormatted from "@/components/shared/hooks/useStylesFormatted";
import BaseComponentRender from "@/components/features/app/ui/components/container/BaseComponentRender";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import { Autoplay, Pagination, Controller } from "swiper/modules";
import { cn } from "@/components/lib/utils";

SwiperCore.use([Controller, Autoplay, Pagination]);

interface Props {
	componentsData: IComponentTotalDataSchema;
	swiperSettings: SwiperSettings;
	swiperStyles: Record<string, unknown>;
	container: ISchemaContainer;
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
	const { componentsData, swiperSettings, swiperStyles, container } = props;

	const swiperRef = useRef({});

	const styleFormatted = useStylesFormatted();

	useEffect(() => {
		try {
			if (swiperSettings) {
				const { swiper } = swiperRef.current;

				// Применение всех настроек
				swiper.params.loop = swiperSettings.loop;
				swiper.params.slidesPerView = swiperSettings.slidePerView;
				swiper.params.slidesPerGroup = swiperSettings.slidePerGroup;
				swiper.params.centeredSlides = swiperSettings.centeredSlides;
				swiper.params.direction = swiperSettings.direction;

				if (swiperSettings.pagination) {
					swiper.params.pagination = true;

					// swiper.params.pagination = {
					// 	el: ".swiper-pagination",
					// 	type: swiperSettings.pagination_type || "bullets",
					// };
				} else {
					swiper.params.pagination = false;
				}

				if (swiperSettings.autoplay) {
					swiper.params.autoplay = {
						delay: swiperSettings.speed_advanced?.delay || 2500,
						disableOnInteraction: false,
					};
					swiper.autoplay.start();
				} else {
					swiper.autoplay.stop();
					swiper.params.autoplay = false;
				}

				// Перезапуск swiper для применения новых настроек
				swiper.update();
			}
		} catch (error) {
			errorHandler("swiperContainer", "effect", error);
		}
	}, [swiperSettings, swiperRef]);

	const updatedSwiperSettings = {
		...swiperSettings,
		speed: swiperSettings.speed_advanced?.duration || swiperSettings.speed,
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
				style={{ ...styleFormatted(swiperStyles) }}
				className="swiper-container-v1"
			>
				{componentsData.map((component) => {
					return (
						<SwiperSlide key={component.id}>
							<BaseComponentRender
								key={component.id}
								containerData={container}
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
