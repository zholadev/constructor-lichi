import React, { useEffect, useMemo, useRef } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import usePreviewMode from "@/components/shared/hooks/usePreviewMode";
import useStylesFormatted from "@/components/shared/hooks/useStylesFormatted";
import useDeviceHeightProperty from "@/components/shared/hooks/useDeviceHeightProperty";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { DeviceType } from "@/components/shared/types/types";
import { cn } from "@/components/lib/utils";
import SwiperCore from "swiper";
import { Autoplay, Controller, Pagination } from "swiper/modules";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import { SwiperSettings } from "@/components/shared/types/interface-schema-settings";
import SpecialComponentRender from "@/components/features/app/modules/components/container/v1/SpecialComponentRender";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";

SwiperCore.use([Controller, Autoplay, Pagination]);

interface Props {
	componentsData: ISchemaComponent[];
	swiperSettings: SwiperSettings;
	swiperStyles: Record<string, unknown>;
	containerData: ISchemaContainer;
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

	const swiperRef = useRef<SwiperRef | null>(null);

	const previewMode = usePreviewMode();
	const styleFormatted = useStylesFormatted();
	const heightDeviceProperty = useDeviceHeightProperty();

	const { spaceModeDeviceType } = useAppSelector((state) => state.space);

	const deviceMode: DeviceType = spaceModeDeviceType;

	const swiperSettingsStyles = useMemo(() => {
		return `swiper-container-v1-paginate-${swiperSettings.paginationPosition} swiper-container-v1-paginate-${swiperSettings.paginationTheme}`;
	}, [
		swiperSettings.paginationPosition,
		swiperSettings.paginationTheme,
		swiperRef.current,
	]);

	const saintLaurentDeviceStyle = useMemo(() => {
		if (deviceMode === "tablet") {
			return "saint_laurent_container_table";
		}
		if (deviceMode === "mobile") {
			return "saint_laurent_container_mobile";
		}
		return "";
	}, [deviceMode]);

	useEffect(() => {
		try {
			if (swiperSettings) {
				if (swiperRef.current) {
					const swiperInstance = swiperRef.current?.swiper;

					swiperInstance.params.loop = swiperSettings.loop;
					swiperInstance.params.slidesPerView =
						swiperSettings.slidePerView;
					swiperInstance.params.slidesPerGroup =
						swiperSettings.slidePerGroup;
					swiperInstance.params.centeredSlides =
						swiperSettings.centeredSlides;
					swiperInstance.params.direction = swiperSettings.direction;
					swiperInstance.params.mousewheel =
						swiperSettings.mousewheel;

					if (swiperSettings.autoplay) {
						swiperInstance.params.autoplay = {
							delay: swiperSettings.speed_advanced?.delay || 1000,
							disableOnInteraction: false,
						};
						swiperInstance.autoplay.start();
					} else {
						swiperInstance.autoplay.stop();
						swiperInstance.params.autoplay = false;
					}

					// Перезапуск swiper для применения новых настроек
					swiperInstance.update();
					swiperInstance.updateSize();
					swiperInstance.init();
				}
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
		<div
			className={cn(
				"overflow-hidden size-full flex justify-center items-center"
			)}
		>
			<Swiper
				ref={swiperRef}
				controller={{ control: null }}
				{...updatedSwiperSettings}
				pagination={swiperSettings.pagination}
				style={{
					height: heightDeviceProperty(
						containerData.settings?.view?.heightFull ?? false
					),
					...styleFormatted(
						swiperStyles,
						!containerData.settings?.view?.darkTheme
					),
				}}
				className={`swiper-container-v1 flex justify-center items-center ${swiperSettingsStyles}`}
			>
				{componentsData.map((component, index: number) => {
					return (
						<SwiperSlide key={component.id}>
							{previewMode.showIndexSwiper && (
								<span
									className={cn(
										"absolute top-1 w-[20px] h-[20px] text-xs left-1 z-10 rounded-full bg-white flex justify-center items-center"
									)}
								>
									{index}
								</span>
							)}
							<div
								className={cn(
									"flex justify-center items-center h-full"
								)}
							>
								<div
									className={cn(
										`saint-laurent-container-v1 ${saintLaurentDeviceStyle}`
									)}
									style={{
										...styleFormatted(
											containerData.style,
											!containerData?.settings?.view
												?.darkTheme
										),
									}}
								>
									<SpecialComponentRender
										type="saint_laurent"
										componentIndex={index}
										containerData={containerData}
										componentId={component.id}
										componentData={component}
										componentLen={1}
									/>
								</div>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default SaintLaurentSwiperContainer;
