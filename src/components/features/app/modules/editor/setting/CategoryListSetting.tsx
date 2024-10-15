import React, { useEffect } from "react";
import { ISchemaSettingCategoryListParams } from "@/components/shared/types/interface-schema-settings";
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

interface Props {
	settingValue?: ISchemaSettingCategoryListParams;
	onSettingChange?: (value: ISchemaSettingCategoryListParams) => void;
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

const categoryDefaultData: ISchemaSettingCategoryListParams = {
	shop: 1,
	category: "new",
	limit: 11,
	cardType: "card",
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
	const { settingValue, onSettingChange } = props;

	const toastMessage = useToastMessage();
	const { apiFetchHandler, loading } = useApiRequest();

	const [countryList, setCountryList] = React.useState<Country[]>([]);
	const [categoryList, setCategoryList] = React.useState<Category[]>([]);

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
	 * @description Функция который подтверждает добавление шаблона в доску
	 */
	const onConfirmHandle = () => {
		if (!onSettingChange) {
			toastMessage(
				"Метод для сохранения не передан в компонент!",
				"error"
			);
			return;
		}

		onSettingChange(categoryParamsSetting);
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
	}, [settingValue]);

	useEffect(() => {
		fetchGetCategoryList();
	}, [settingValue]);

	useEffect(() => {
		if (settingValue) {
			setCategoryParamsSetting(settingValue);
		}
	}, [settingValue]);

	return (
		<div className="w-full">
			<div className="grid grid-cols-1 gap-3 mb-7 mt-4">
				<h3>Выберите страну</h3>
				<div className={cn("w-full")}>
					<Select
						defaultValue={categoryParamsSetting.shop.toString()}
						value={categoryParamsSetting.shop.toString()}
						disabled={countryList?.length === 0 || loading}
						onValueChange={(value) => onChangeHandle("shop", value)}
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
	);
};

export default CategoryListSetting;
