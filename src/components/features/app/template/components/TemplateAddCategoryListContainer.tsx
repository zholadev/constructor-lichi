import React, { useEffect } from "react";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { cn } from "@/components/lib/utils";
import { Button } from "@/components/shared/shadcn/ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shared/shadcn/ui/select";
import useApiRequest from "@/components/shared/hooks/useApiRequest";
import {
	apiMethodSiteCategoryList,
	apiMethodSiteSiteInfo,
} from "@/components/shared/backend/requests/site/requests";
import { IGetApiParams } from "@/components/shared/types/interface";
import { ISchemaSettingCategoryListParams } from "@/components/shared/types/interface-schema-settings";
import { Input } from "@/components/shared/shadcn/ui/input";
import { ImageIcon } from "@radix-ui/react-icons";
import useContainerActions from "@/components/shared/hooks/actions/useContainerActions";
import { versionContainer } from "@/components/app/versions/types/interface-version-container";

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

interface ITemplateAddCategoryList extends ISchemaSettingCategoryListParams {
	version: string;
}

const categoryDefaultData: ITemplateAddCategoryList = {
	shop: 1,
	category: "new",
	limit: 11,
	cardType: "card",
	version: versionContainer.category_list_container?.[0]?.version,
};

/**
 * @author Zholaman Zhumanov
 * @created 03.10.2024
 * @description Компонент для создания контейнера особого типа категории товаров
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const TemplateAddCategoryListContainer: React.FC = () => {
	const { dialogAddTemplateAction, editorAddComponentTypeAction } =
		useDispatchAction();

	const containerActions = useContainerActions();

	const { apiFetchHandler, loading } = useApiRequest();

	const { dialogAddTemplate } = useAppSelector((state) => state.dialog);

	const [countryList, setCountryList] = React.useState<Country[]>([]);
	const [categoryList, setCategoryList] = React.useState<Category[]>([]);

	const [categoryParamsSetting, setCategoryParamsSetting] =
		React.useState<ITemplateAddCategoryList>(categoryDefaultData);

	const toggleDialogHandle = () => {
		editorAddComponentTypeAction("initial");
		dialogAddTemplateAction(!dialogAddTemplate);
		setCategoryParamsSetting(categoryDefaultData);
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления данных категории
	 * @param key
	 * @param value
	 */
	const onChangeHandle = (
		key: keyof ITemplateAddCategoryList,
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
	 * @description Метод для получения данных с сайта
	 */
	const fetchGetSiteInfo = async () => {
		await apiFetchHandler(apiMethodSiteSiteInfo, false, {
			onGetData: (params: IGetApiParams) => {
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
	 * @description Метод для получения данных список категории
	 */
	const fetchGetCategoryList = async () => {
		await apiFetchHandler(
			apiMethodSiteCategoryList,
			false,
			{
				onGetData: (params: IGetApiParams) => {
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
	}, []);

	/**
	 * @author Zholaman Zhumanov
	 * @description Функция который подтверждает добавление шаблона в доску
	 */
	const onConfirmHandle = () =>
		containerActions.createCategoryListContainerEvent(
			"swiper",
			{
				shop: categoryParamsSetting.shop,
				category: categoryParamsSetting.category,
				limit: categoryParamsSetting.limit,
				cardType: categoryParamsSetting.cardType,
			},
			categoryParamsSetting.version,
			toggleDialogHandle
		);

	return (
		<div className="w-full">
			<div className="grid grid-cols-1 gap-3 mb-7 mt-4">
				<h3 className={cn("text-sm")}>Выберите версию контейнера</h3>
				<div className={cn("w-full")}>
					<Select
						defaultValue={categoryParamsSetting.version}
						value={categoryParamsSetting.version}
						disabled={
							versionContainer.category_list_container?.length ===
							0
						}
						onValueChange={(value) =>
							onChangeHandle("version", value)
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Выберите" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{versionContainer.category_list_container?.map(
									(version) => {
										return (
											<SelectItem
												key={version.version}
												value={version.version}
											>
												{version.version}
											</SelectItem>
										);
									}
								)}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-3 mb-7 mt-4">
				<h3>Выберите страну</h3>
				<div className={cn("w-full")}>
					<Select
						defaultValue={categoryParamsSetting.shop?.toString()}
						value={categoryParamsSetting.shop?.toString()}
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
											value={country.id?.toString()}
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

			<div className="grid grid-cols-2 gap-3 mb-7 mt-4">
				<Button
					variant={
						categoryParamsSetting.cardType === "card"
							? "default"
							: "outline"
					}
					className={cn(
						"p-3 text-xs border w-full h-[120px] flex flex-col"
					)}
					onClick={() => {
						onChangeHandle("cardType", "card");
					}}
				>
					<ImageIcon width={60} height={60} className={cn("mb-3")} />{" "}
					Карточка с инфо
				</Button>
				<Button
					variant={
						categoryParamsSetting.cardType === "card_outside"
							? "default"
							: "outline"
					}
					className={cn(
						"p-3 text-xs border w-full h-[120px] flex flex-col"
					)}
					onClick={() => {
						onChangeHandle("cardType", "card_outside");
					}}
				>
					<ImageIcon width={60} height={60} className={cn("mb-3")} />{" "}
					Карточка с инфо (снаружи)
				</Button>
			</div>

			<div className={cn("mt-5 flex items-center justify-end gap-2")}>
				<Button variant="outline" onClick={toggleDialogHandle}>
					Отмена
				</Button>
				<Button onClick={onConfirmHandle} type="button">
					Подтвердить
				</Button>
			</div>
		</div>
	);
};

export default TemplateAddCategoryListContainer;
