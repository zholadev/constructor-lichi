import React, {
	CSSProperties,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import {
	ISchemaSettingCategoryListParams,
	ISchemaSettingsTimer,
} from "@/components/shared/types/interface-schema-settings";
import useApiRequest from "@/components/shared/hooks/useApiRequest";
import { cn } from "@/components/lib/utils";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shared/shadcn/ui/select";
import { Input } from "@/components/shared/shadcn/ui/input";
import {
	apiMethodSiteCategoryList,
	apiMethodSiteSiteInfo,
} from "@/components/shared/backend/requests/site/requests";
import { Button } from "@/components/shared/shadcn/ui/button";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { IRequestApiParams } from "@/components/shared/types/interface-app";
import TypographyStyles from "@/components/features/app/modules/editor/styles/TypographyStyles";
import SpacingStyles from "@/components/features/app/modules/editor/styles/SpacingStyles";

type CategoryElementType = "name" | "price";

interface Props {
	settingValue?: ISchemaSettingCategoryListParams;
	onUpdateSchemaHandle?: (value: ISchemaSettingCategoryListParams) => void;
	onUpdateSchemaStyleHandle?: (
		value: ISchemaSettingsTimer,
		path: string
	) => void;
}

interface Country {
	id: number;
	iso: string;
	is_active: boolean;
	use_bonus: boolean;
	timezone: string;
	currency_id: number;
	language_def_id: number;
	language_def: string;
	name: {
		[key: string]: string;
	};
}

interface Category {
	id: number;
	url: string;
	name: string;
	type: string;
}

interface ICategoryElement {
	id: number;
	name: string;
	value: CategoryElementType;
}

const categoryElementsData: ICategoryElement[] = [
	{
		id: 1,
		name: "Название",
		value: "name",
	},
	{
		id: 2,
		name: "Цена",
		value: "price",
	},
];

const categoryDefaultData: ISchemaSettingCategoryListParams = {
	shop: 1,
	category: "new",
	limit: 11,
	card: {
		type: "card",
		elements: {
			name: {
				style: {},
			},
			price: {
				style: {},
			},
		},
	},
};

const filterStyleForElements = (
	data: ISchemaSettingCategoryListParams,
	type: CategoryElementType
): any => {
	const { card } = data;

	if (!type) {
		throw new Error("Type is required");
	}

	return {
		style: {
			...card.elements[type].style,
		},
	};
};

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
const CategoryListSetting: React.FC<Props> = (props) => {
	const { settingValue, onUpdateSchemaHandle, onUpdateSchemaStyleHandle } =
		props;

	const toastMessage = useToastMessage();
	const { apiFetchHandler, loading } = useApiRequest();

	const [countryList, setCountryList] = useState<Country[]>([]);
	const [categoryList, setCategoryList] = useState<Category[]>([]);

	const [currentElementType, setCurrentElementType] =
		useState<CategoryElementType>("name");
	const [categoryParamsSetting, setCategoryParamsSetting] =
		React.useState<ISchemaSettingCategoryListParams>(categoryDefaultData);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления данных
	 * @param key
	 * @param value
	 */
	const onChangeHandle = (
		key: keyof ISchemaSettingCategoryListParams,
		value: string | number
	) => {
		setCategoryParamsSetting((prevState) => {
			return {
				...prevState,
				[key]: value,
			};
		});
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для получения активного стиля elements
	 */
	const currentElementStyle = useMemo(() => {
		return currentElementType === "price"
			? categoryParamsSetting.card.elements.price.style
			: categoryParamsSetting.card.elements.name.style;
	}, [currentElementType, categoryParamsSetting]);

	const onChangeStyleHandle = useCallback(
		(key: CategoryElementType, value: any) => {
			setCategoryParamsSetting((prevState) => {
				const updatedValues = {
					...prevState,
					card: {
						type: prevState.card.type,
						elements: {
							...prevState.card.elements,
							[key]: {
								style: {
									...prevState.card.elements[key].style,
									...value,
								},
							},
						},
					},
				};

				if (onUpdateSchemaStyleHandle) {
					const filteredData = filterStyleForElements(
						updatedValues,
						currentElementType
					);
					onUpdateSchemaStyleHandle(
						filteredData,
						`settings.categoryList.card.elements.${currentElementType}`
					);
				}

				return updatedValues;
			});
		},
		[onUpdateSchemaStyleHandle, currentElementType]
	);

	/**
	 * @author Zholaman Zhumanov
	 * @description Функция который подтверждает добавление шаблона в доску
	 */
	const onConfirmHandle = () => {
		if (!onUpdateSchemaHandle) {
			toastMessage(
				"Метод для сохранения не передан в компонент!",
				"error"
			);
			return;
		}

		onUpdateSchemaHandle(categoryParamsSetting);
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для получения данных с сайта про магазины
	 */
	const fetchGetSiteInfo = async () => {
		await apiFetchHandler(apiMethodSiteSiteInfo, false, {
			onGetData: (params: IRequestApiParams) => {
				if (params.success) {
					const convertToArray: Country[] = Object.values(
						params.data?.api_data?.data?.info?.shop || {}
					);
					setCountryList(convertToArray);
				}
			},
		});
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для получения данных категории
	 */
	const fetchGetCategoryList = async () => {
		await apiFetchHandler(
			apiMethodSiteCategoryList,
			false,
			{
				onGetData: (params: IRequestApiParams) => {
					if (params.success) {
						setCategoryList(params.data?.api_data?.aData);
					}
				},
			},
			[categoryParamsSetting.shop]
		);
	};

	useEffect(() => {
		fetchGetSiteInfo();
	}, []);

	useEffect(() => {
		fetchGetCategoryList();
	}, [settingValue?.category, settingValue?.shop, settingValue?.limit]);

	useEffect(() => {
		if (settingValue) {
			setCategoryParamsSetting(settingValue);
		} else {
			setCategoryParamsSetting(categoryDefaultData);
		}
	}, [settingValue]);

	return (
		<div className={cn("w-full px-1")}>
			<div className={cn("w-full mb-5")}>
				<div className="grid grid-cols-1 gap-3 mb-7 mt-4">
					<h3>Выберите страну</h3>
					<div className={cn("w-full")}>
						<Select
							defaultValue={categoryParamsSetting.shop.toString()}
							value={categoryParamsSetting.shop.toString()}
							disabled={countryList?.length === 0 || loading}
							onValueChange={(value) =>
								onChangeHandle("shop", value)
							}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Выберите" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{countryList.map((country) => {
										return (
											<SelectItem
												key={country.id}
												value={country.id.toString()}
											>
												{country.name?.ru}
											</SelectItem>
										);
									})}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-3 mb-7 mt-4">
					<h3>Выберите категорию</h3>
					<div className={cn("w-full")}>
						<Select
							defaultValue={categoryParamsSetting.category}
							value={categoryParamsSetting.category}
							disabled={categoryList?.length === 0 || loading}
							onValueChange={(value) =>
								onChangeHandle("category", value)
							}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Выберите" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{categoryList?.map((category) => {
										return (
											<SelectItem
												key={category.id}
												value={category.url}
											>
												{category.name}
											</SelectItem>
										);
									})}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-3 mb-7 mt-4">
					<h3>Количество вывода</h3>
					<div className={cn("w-full")}>
						<Input
							type="number"
							value={categoryParamsSetting.limit}
							onChange={(e) =>
								onChangeHandle("limit", e.target.value)
							}
						/>
					</div>
				</div>

				<div className={cn("mt-5 flex items-center justify-end gap-2")}>
					<Button onClick={onConfirmHandle} type="button">
						Сохранить
					</Button>
				</div>
			</div>

			<div className={cn("w-full")}>
				<h3 className={cn("uppercase text-xs mb-3 text-gray-500")}>
					Стили
				</h3>

				<div className={cn("w-full mb-5")}>
					<Select
						defaultValue={currentElementType}
						value={currentElementType}
						onValueChange={(value: CategoryElementType) =>
							setCurrentElementType(value)
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Выберите тип" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{categoryElementsData.map((element, index) => {
									return (
										<SelectItem
											key={index}
											value={element.value}
										>
											{element.name}
										</SelectItem>
									);
								})}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<TypographyStyles
					hideTitle
					// @ts-ignore
					styles={currentElementStyle}
					onUpdateSchemaHandle={(data) => {
						onChangeStyleHandle(currentElementType, data);
					}}
					hideRemove
				/>

				<SpacingStyles
					hideTitle
					// @ts-ignore
					styles={currentElementStyle}
					onUpdateSchemaHandle={(data) => {
						onChangeStyleHandle(currentElementType, data);
					}}
				/>
			</div>
		</div>
	);
};

export default CategoryListSetting;
