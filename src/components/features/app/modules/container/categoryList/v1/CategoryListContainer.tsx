import React, { useEffect, useRef, useState } from "react";
import useStylesFormatted from "@/components/shared/hooks/useStylesFormatted";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { cn } from "@/components/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import SwiperCore from "swiper";
import { Autoplay, Controller, Pagination } from "swiper/modules";
import { IComponentTotalDataSchema } from "@/components/features/app/modules/components/types/v1/interface-components";
import {
	ISchemaSettingCategoryListParams,
	SwiperSettings,
} from "@/components/shared/types/interface-schema-settings";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import useApiRequest from "@/components/shared/hooks/useApiRequest";
import { apiMethodSiteCategoryProductList } from "@/components/shared/backend/requests/site/requests";
import { IGetApiParams } from "@/components/shared/types/interface";
import CategoryCard from "@/components/features/app/modules/components/components/special/v1/categoryList/CategoryCard";
import CategoryCardOutside from "@/components/features/app/modules/components/components/special/v1/categoryList/CategoryCardOutside";
import { Skeleton } from "@/components/shared/shadcn/ui/skeleton";
import { ProductV1 } from "@/components/features/app/modules/components/types/v1/interface-category-list";

SwiperCore.use([Controller, Autoplay, Pagination]);

interface Props {
	componentsData: IComponentTotalDataSchema[];
	swiperSettings: SwiperSettings;
	swiperStyles: Record<string, unknown>;
	container: ISchemaContainer;
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
		container,
		categoryListParams,
	} = props;

	const swiperRef = useRef({});

	const { apiFetchHandler, loading } = useApiRequest();

	const styleFormatted = useStylesFormatted();

	const { editorSwiperIndexShow } = useAppSelector((state) => state.editor);

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
				onGetData: (params: IGetApiParams) => {
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
	}, [swiperSettings, swiperRef, componentsData, container]);

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
						!container.settings?.view?.darkTheme
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
								{editorSwiperIndexShow && (
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
