import React, { useEffect, useRef, useState } from "react";
import useStylesFormatted from "@/components/shared/hooks/useStylesFormatted";
import { cn } from "@/components/lib/utils";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import SwiperCore from "swiper";
import { Autoplay, Controller, Pagination } from "swiper/modules";
import {
	ISchemaSettingCategoryListParams,
	SwiperSettings,
} from "@/components/shared/types/interface-schema-settings";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import useApiRequest from "@/components/shared/hooks/useApiRequest";
import { apiMethodSiteCategoryProductList } from "@/components/shared/backend/requests/site/requests";
import CategoryCard from "@/components/features/app/modules/components/components/special/v1/categoryList/CategoryCard";
import CategoryCardOutside from "@/components/features/app/modules/components/components/special/v1/categoryList/CategoryCardOutside";
import { Skeleton } from "@/components/shared/shadcn/ui/skeleton";
import { ProductV1 } from "@/components/features/app/modules/components/types/v1/interface-category-list";
import usePreviewMode from "@/components/shared/hooks/usePreviewMode";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";
import { IRequestApiParams } from "@/components/shared/types/interface-app";

SwiperCore.use([Controller, Autoplay, Pagination]);

interface Props {
	componentsData: ISchemaComponent[];
	swiperSettings: SwiperSettings;
	swiperStyles: Record<string, unknown>;
	containerData: ISchemaContainer;
	categoryListParams: ISchemaSettingCategoryListParams;
}

/**
 * @author Zholaman Zhumanov
 * @created 03.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const CategoryListContainer: React.FC<Props> = (props) => {
	const {
		componentsData,
		swiperSettings,
		swiperStyles,
		containerData,
		categoryListParams,
	} = props;

	const swiperRef = useRef<SwiperRef | undefined>(null);

	const { apiFetchHandler, loading } = useApiRequest();

	const styleFormatted = useStylesFormatted();
	const previewMode = usePreviewMode();

	const [productListData, setProductDataList] = useState<ProductV1[]>([]);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для получения список товаров
	 */
	const fetchGetCategoryList = async () => {
		await apiFetchHandler(
			apiMethodSiteCategoryProductList,
			false,
			{
				onGetData: (params: IRequestApiParams) => {
					if (params.success) {
						setProductDataList(params.data?.api_data?.aProduct);
					}
				},
			},
			[
				categoryListParams.category,
				categoryListParams.limit,
				categoryListParams.shop,
			]
		);
	};

	useEffect(() => {
		fetchGetCategoryList();
	}, [
		categoryListParams.category,
		categoryListParams.shop,
		categoryListParams.limit,
		categoryListParams.cardType,
	]);

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
		<div className={cn("overflow-hidden block")}>
			<Swiper
				// @ts-ignore
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
				{loading ? (
					<div className={cn("p-1 size-full grid grid-cols-6 gap-1")}>
						{Array.from({ length: 6 }).map((_, index) => (
							<Skeleton
								key={index}
								className="h-[320px] w-full mb-4"
							/>
						))}
					</div>
				) : (
					productListData.map((product, index) => {
						return (
							<SwiperSlide key={product.id}>
								{previewMode.showIndexSwiper && (
									<span
										className={cn(
											"absolute top-1 w-[20px] h-[20px] text-xs left-1 z-10 rounded-full bg-white flex justify-center items-center"
										)}
									>
										{index}
									</span>
								)}
								{categoryListParams.cardType ===
								"card_outside" ? (
									<CategoryCardOutside product={product} />
								) : (
									<CategoryCard product={product} />
								)}
							</SwiperSlide>
						);
					})
				)}
			</Swiper>
		</div>
	);
};

export default CategoryListContainer;
