import React, {useEffect, useMemo, useRef} from "react";
import {SwiperRef} from "swiper/react";
import usePreviewMode from "@/components/shared/hooks/usePreviewMode";
import useStylesFormatted from "@/components/shared/hooks/useStylesFormatted";
import useDeviceHeightProperty from "@/components/shared/hooks/useDeviceHeightProperty";
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";

interface Props {
}

/**
 * @author Zholaman Zhumanov
 * @created 11.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const SaintLaurentSwiperContainer: React.FC<Props> = (props) => {
	const { componentsData, swiperSettings, swiperStyles, containerData } =
		props;

	const swiperRef = useRef<SwiperRef>();

	const previewMode = usePreviewMode();
	const styleFormatted = useStylesFormatted();
	const heightDeviceProperty = useDeviceHeightProperty();

	const swiperSettingsStyles = useMemo(() => {
		return `swiper-container-v1-paginate-${swiperSettings.paginationPosition} swiper-container-v1-paginate-${swiperSettings.paginationTheme}`;
	}, [
		swiperSettings.paginationPosition,
		swiperSettings.paginationTheme,
		swiperRef.current,
	]);

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
				swiper.init();
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

    return <div/>;
};

export default SaintLaurentSwiperContainer;
