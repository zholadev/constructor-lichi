import React, { useEffect, useState } from "react";
import { cn } from "@/components/lib/utils";
import { Switch } from "@/components/shared/shadcn/ui/switch";
import { Label } from "@/components/shared/shadcn/ui/label";
import { Input } from "@/components/shared/shadcn/ui/input";
import {
	ChevronsUp,
	CircleGauge,
	GalleryHorizontal,
	GalleryHorizontalEnd,
	GalleryThumbnails,
	Play,
	Repeat,
} from "lucide-react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shared/shadcn/ui/select";
import {
	SwiperDirectionType,
	SwiperPaginationPositionType,
	SwiperPaginationThemeType,
	SwiperPaginationType,
	SwiperSettings,
} from "@/components/shared/types/interface-schema-settings";

interface SwiperPaginationTypeData {
	name: string;
	value: SwiperPaginationType;
	active: boolean;
}

interface SwiperDirectionTypeData {
	name: string;
	value: SwiperDirectionType;
	active: boolean;
}

interface SwiperPaginationPositionTypeData {
	name: string;
	value: SwiperPaginationPositionType;
	active: boolean;
}

interface SwiperPaginationThemeTypeData {
	name: string;
	value: SwiperPaginationThemeType;
	active: boolean;
}

interface Props {
	settingValue: SwiperSettings;
	onSettingChange: (value: SwiperSettings) => void;
}

const directionData: SwiperDirectionTypeData[] = [
	{
		name: "Vertical",
		value: "vertical",
		active: false,
	},
	{
		name: "Horizontal",
		value: "horizontal",
		active: true,
	},
];
const paginationTypeData: SwiperPaginationTypeData[] = [
	{
		name: "Bullet",
		value: "bullet",
		active: true,
	},
	{
		name: "Fraction",
		value: "fraction",
		active: false,
	},
];

const paginationThemeTypeData: SwiperPaginationThemeTypeData[] = [
	{
		name: "Белый",
		value: "light",
		active: true,
	},
	{
		name: "Темный",
		value: "dark",
		active: true,
	},
];

const paginationPositionData: SwiperPaginationPositionTypeData[] = [
	{
		name: "Вверх",
		value: "top",
		active: true,
	},
	{
		name: "Вниз",
		value: "bottom",
		active: true,
	},
	{
		name: "Лево",
		value: "left",
		active: false,
	},
	{
		name: "Право",
		value: "right",
		active: false,
	},
];

/**
 * @author Zholaman Zhumanov
 * @created 21.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const SwiperSetting: React.FC<Props> = (props) => {
	const { settingValue, onSettingChange } = props;

	const [swiperSettings, setSwiperSettings] = useState<SwiperSettings>({
		pagination: false,
		autoplay: false,
		loop: false,
		slidePerView: 3,
		slidePerGroup: 1,
		speed_advanced: {
			delay: 1000,
			speed: 700,
		},
		spaceBetween: 0,
		centeredSlides: false,
		direction: "horizontal",
		pagination_type: "bullet",
		autoHeight: false,
		paginationPosition: "bottom",
		paginationTheme: "light",
		mousewheel: false,
	});

	const onChangeSettings = (
		value: boolean | number | string,
		key: keyof SwiperSettings,
		insideKey?: string | number
	) => {
		if (key === "speed_advanced") {
			setSwiperSettings((prev) => {
				const updateValues = {
					...prev,
					speed_advanced: {
						...prev.speed_advanced,
						[insideKey]: parseFloat(value),
					},
				};

				if (onSettingChange) onSettingChange(updateValues);

				return updateValues;
			});
			return;
		}

		setSwiperSettings((prev) => {
			const updateValues = {
				...prev,
				[key]: value,
			};

			if (onSettingChange) onSettingChange(updateValues);

			return updateValues;
		});
	};

	useEffect(() => {
		if (settingValue) {
			setSwiperSettings({ ...settingValue });
		} else {
			setSwiperSettings({
				pagination: false,
				autoplay: false,
				loop: false,
				slidePerView: 3,
				slidePerGroup: 1,
				speed_advanced: {
					delay: 1000,
					speed: 700,
				},
				spaceBetween: 0,
				centeredSlides: false,
				direction: "horizontal",
				pagination_type: "bullet",
				autoHeight: false,
				paginationPosition: "bottom",
				paginationTheme: "light",
				mousewheel: false,
			});
		}
	}, [settingValue]);

	return (
		<div className={cn("w-full py-3 px-1")}>
			<div
				className={cn(
					"flex justify-between cursor-pointer flex-row gap-2 mb-3"
				)}
			>
				<Label htmlFor="swiper-pagination">
					<h3 className={cn("text-xs uppercase text-gray-500")}>
						Pagination
					</h3>
				</Label>

				<div className={cn("flex items-center gap-2")}>
					<Switch
						id="swiper-pagination"
						checked={swiperSettings.pagination}
						onCheckedChange={(value) => {
							onChangeSettings(value, "pagination");
						}}
					/>

					<GalleryThumbnails
						className={cn(
							!swiperSettings.pagination ? "text-gray-300" : ""
						)}
					/>
				</div>
			</div>

			<div
				className={cn(
					"flex justify-between items-center flex-row gap-2 pb-2 mb-2"
				)}
			>
				<div className={cn("w-full")}>
					<Select
						defaultValue={swiperSettings.pagination_type}
						value={swiperSettings.pagination_type}
						disabled={!swiperSettings.pagination}
						onValueChange={(value) =>
							onChangeSettings(value, "pagination_type")
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Выберите" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{paginationTypeData.map((paginate, index) => {
									return (
										<SelectItem
											key={index}
											value={paginate.value}
											disabled={!paginate.active}
										>
											{paginate.name}
										</SelectItem>
									);
								})}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<div className={cn("w-full")}>
					<Select
						defaultValue={swiperSettings.paginationPosition}
						value={swiperSettings.paginationPosition}
						disabled={!swiperSettings.pagination}
						onValueChange={(value) =>
							onChangeSettings(value, "paginationPosition")
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Выберите позицию" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{paginationPositionData.map(
									(position, index) => {
										return (
											<SelectItem
												key={index}
												disabled={!position.active}
												value={position.value}
											>
												{position.name}
											</SelectItem>
										);
									}
								)}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div
				className={cn(
					"flex justify-between items-center flex-row gap-2 pb-6 mb-6 border-b"
				)}
			>
				<div className={cn("w-full")}>
					<Select
						defaultValue={swiperSettings.paginationTheme}
						value={swiperSettings.paginationTheme}
						disabled={!swiperSettings.pagination}
						onValueChange={(value) =>
							onChangeSettings(value, "paginationTheme")
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Выберите тему" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{paginationThemeTypeData.map(
									(paginate, index) => {
										return (
											<SelectItem
												key={index}
												value={paginate.value}
												disabled={!paginate.active}
											>
												{paginate.name}
											</SelectItem>
										);
									}
								)}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div
				className={cn(
					"flex justify-between items-center  cursor-pointer flex-row gap-2 mb-3"
				)}
			>
				<Label htmlFor="swiper-autoplay">
					<h3 className={cn("text-xs uppercase text-gray-500")}>
						Autoplay
					</h3>
				</Label>

				<div className={cn("flex items-center gap-2")}>
					<Switch
						id="swiper-autoplay"
						checked={swiperSettings.autoplay}
						onCheckedChange={(value) => {
							onChangeSettings(value, "autoplay");
						}}
					/>

					<Play
						className={cn(
							!swiperSettings.autoplay ? "text-gray-300" : ""
						)}
					/>
				</div>
			</div>

			<div
				className={cn(
					"flex justify-between items-center  cursor-pointer flex-row gap-2 mb-3"
				)}
			>
				<Label htmlFor="swiper-autoplay">
					<h3 className={cn("text-xs uppercase text-gray-500")}>
						AutoHeight
					</h3>
				</Label>

				<div className={cn("flex items-center gap-2")}>
					<Switch
						id="swiper-autoplay"
						checked={swiperSettings.autoHeight}
						onCheckedChange={(value) => {
							onChangeSettings(value, "autoHeight");
						}}
					/>

					<Play
						className={cn(
							!swiperSettings.autoHeight ? "text-gray-300" : ""
						)}
					/>
				</div>
			</div>

			<div
				className={cn(
					"flex justify-between items-center  cursor-pointer flex-row gap-2 mb-3"
				)}
			>
				<Label htmlFor="swiper-mousewheel">
					<h3 className={cn("text-xs uppercase text-gray-500")}>
						Mousewheel
					</h3>
				</Label>

				<div className={cn("flex items-center gap-2")}>
					<Switch
						id="swiper-mousewheel"
						checked={swiperSettings.mousewheel}
						onCheckedChange={(value) => {
							onChangeSettings(value, "mousewheel");
						}}
					/>

					<Play
						className={cn(
							!swiperSettings.mousewheel ? "text-gray-300" : ""
						)}
					/>
				</div>
			</div>

			<div
				className={cn(
					"flex justify-between items-center  cursor-pointer flex-row gap-2 mb-3"
				)}
			>
				<Label htmlFor="swiper-centeredSlides">
					<h3 className={cn("text-xs uppercase text-gray-500")}>
						Center
					</h3>
				</Label>

				<div className={cn("flex items-center gap-2")}>
					<Switch
						id="swiper-centeredSlides"
						checked={swiperSettings.centeredSlides}
						onCheckedChange={(value) => {
							onChangeSettings(value, "centeredSlides");
						}}
					/>

					<GalleryHorizontal
						className={cn(
							!swiperSettings.centeredSlides
								? "text-gray-300"
								: ""
						)}
					/>
				</div>
			</div>

			<div
				className={cn(
					"flex justify-between items-center  cursor-pointer flex-row gap-2 pb-5 mb-6 border-b"
				)}
			>
				<Label htmlFor="swiper-loop">
					<h3 className={cn("text-xs uppercase text-gray-500")}>
						Loop
					</h3>
				</Label>
				<div className={cn("flex items-center gap-2")}>
					<Switch
						id="swiper-loop"
						checked={swiperSettings.loop}
						onCheckedChange={(value) => {
							onChangeSettings(value, "loop");
						}}
					/>
					<Repeat
						className={cn(
							!swiperSettings.loop ? "text-gray-300" : ""
						)}
					/>
				</div>
			</div>

			<div
				className={cn(
					"flex justify-between items-center flex-row gap-2 mb-3"
				)}
			>
				<h3 className={cn("text-xs uppercase text-gray-500")}>View</h3>
				<div className={cn("flex items-center gap-2")}>
					<Input
						type="number"
						value={swiperSettings.slidePerView}
						onChange={(e) =>
							onChangeSettings(e.target.value, "slidePerView")
						}
						className={cn("w-[80px] h-[30px]")}
					/>
					<GalleryHorizontal width={20} height={24} />
				</div>
			</div>

			<div
				className={cn(
					"flex justify-between items-center flex-row gap-2 mb-3"
				)}
			>
				<h3 className={cn("text-xs uppercase text-gray-500")}>
					spaceBetween
				</h3>
				<div className={cn("flex items-center gap-2")}>
					<Input
						type="number"
						value={swiperSettings.spaceBetween}
						onChange={(e) =>
							onChangeSettings(e.target.value, "spaceBetween")
						}
						className={cn("w-[80px] h-[30px]")}
					/>
					<GalleryHorizontal width={20} height={24} />
				</div>
			</div>

			<div
				className={cn(
					"flex justify-between items-center flex-row gap-2 pb-5 mb-6 border-b"
				)}
			>
				<h3 className={cn("text-xs uppercase text-gray-500")}>Group</h3>
				<div className={cn("flex items-center gap-2")}>
					<Input
						type="number"
						value={swiperSettings.slidePerGroup}
						onChange={(e) =>
							onChangeSettings(e.target.value, "slidePerGroup")
						}
						className={cn("w-[80px] h-[30px]")}
					/>
					<GalleryHorizontalEnd width={20} height={24} />
				</div>
			</div>

			<div
				className={cn(
					"flex justify-between items-center  cursor-pointer flex-row gap-2 mb-3"
				)}
			>
				<Label htmlFor="swiper-speed">
					<h3 className={cn("text-xs uppercase text-gray-500")}>
						Speed
					</h3>
				</Label>
			</div>

			<div className={cn("w-full mt-5")}>
				<div
					className={cn(
						"flex justify-between items-center flex-row gap-2 mb-2"
					)}
				>
					<h3 className={cn("text-xs uppercase text-gray-500")}>
						Speed
					</h3>
					<div className={cn("flex items-center gap-2")}>
						<Input
							type="number"
							value={swiperSettings.speed_advanced.speed}
							onChange={(e) =>
								onChangeSettings(
									e.target.value,
									"speed_advanced",
									"speed"
								)
							}
							className={cn("w-[80px] h-[30px]")}
						/>
						<ChevronsUp width={20} height={24} />
					</div>
				</div>

				<div
					className={cn(
						"flex justify-between items-center flex-row gap-2 mb-5 border-b pb-5"
					)}
				>
					<h3 className={cn("text-xs uppercase text-gray-500")}>
						Delay
					</h3>
					<div className={cn("flex items-center gap-2")}>
						<Input
							type="number"
							value={swiperSettings.speed_advanced.delay}
							onChange={(e) =>
								onChangeSettings(
									e.target.value,
									"speed_advanced",
									"delay"
								)
							}
							className={cn("w-[80px] h-[30px]")}
						/>
						<CircleGauge width={20} height={24} />
					</div>
				</div>
			</div>

			<div
				className={cn(
					"flex justify-between items-center flex-row gap-2 mb-5"
				)}
			>
				<h3 className={cn("text-xs uppercase text-gray-500")}>
					Direction
				</h3>

				<div className={cn("w-full")}>
					<Select
						defaultValue={swiperSettings.direction}
						value={swiperSettings.direction}
						onValueChange={(value) =>
							onChangeSettings(value, "direction")
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Выберите" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{directionData.map((dir, index) => {
									return (
										<SelectItem
											key={index}
											value={dir.value}
											disabled={!dir.active}
										>
											{dir.name}
										</SelectItem>
									);
								})}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
};

export default SwiperSetting;
