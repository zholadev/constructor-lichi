import React, { useState } from "react";
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

type SwiperDirectionType = "vertical" | "horizontal";
type SwiperPaginationType = "bullet" | "fraction";

interface SwiperPaginationTypeData {
	name: string;
	value: SwiperPaginationType;
}

interface SwiperDirectionTypeData {
	name: string;
	value: SwiperDirectionType;
}

interface SwiperSettings {
	pagination: boolean;
	autoplay: boolean;
	loop: boolean;
	slidePerView: number;
	slidePerGroup: number;
	speed_advanced: {
		delay: number;
		duration: number;
	};
	speed: boolean;
	centeredSlides: boolean;
	direction: SwiperDirectionType;
	pagination_type: SwiperPaginationType;
}

interface Props {}

const directionData: SwiperDirectionTypeData[] = [
	{
		name: "Vertical",
		value: "vertical",
	},
	{
		name: "Horizontal",
		value: "horizontal",
	},
];
const paginationTypeData: SwiperPaginationTypeData[] = [
	{
		name: "Bullet",
		value: "bullet",
	},
	{
		name: "Fraction",
		value: "fraction",
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
	const {} = props;

	const [swiperSettings, setSwiperSettings] = useState<SwiperSettings>({
		pagination: false,
		autoplay: false,
		loop: false,
		slidePerView: 3,
		slidePerGroup: 1,
		speed_advanced: {
			delay: 700,
			duration: 3000,
		},
		speed: false,
		centeredSlides: false,
		direction: "horizontal",
		pagination_type: "bullet",
	});

	const onChangeSettings = (
		value: boolean | number | string,
		key: keyof SwiperSettings,
		insideKey?: string | number
	) => {
		if (key === "speed_advanced") {
			setSwiperSettings((prev) => {
				return {
					...prev,
					speed: {
						[insideKey]: value,
					},
				};
			});
			return;
		}

		setSwiperSettings((prev) => {
			return {
				...prev,
				[key]: value,
			};
		});
	};

	return (
		<div className={cn("w-full py-3")}>
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
					"flex justify-between items-center flex-row gap-2 pb-6 mb-6 border-b"
				)}
			>
				{/* <h3 className={cn("text-xs uppercase text-gray-500")}>Type</h3> */}

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
										>
											{paginate.name}
										</SelectItem>
									);
								})}
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

				<div className={cn("flex items-center gap-2")}>
					<Switch
						id="swiper-speed"
						checked={swiperSettings.speed}
						onCheckedChange={(value) => {
							onChangeSettings(value, "speed");
						}}
					/>
				</div>
			</div>

			<div className={cn("w-full mt-5")}>
				<div
					className={cn(
						"flex justify-between items-center flex-row gap-2 mb-2"
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
							disabled={!swiperSettings.speed}
							className={cn("w-[80px] h-[30px]")}
						/>
						<CircleGauge
							width={20}
							height={24}
							className={cn(
								!swiperSettings.speed ? "text-gray-300" : ""
							)}
						/>
					</div>
				</div>

				<div
					className={cn(
						"flex justify-between items-center flex-row gap-2 mb-5 border-b pb-5"
					)}
				>
					<h3 className={cn("text-xs uppercase text-gray-500")}>
						Duration
					</h3>
					<div className={cn("flex items-center gap-2")}>
						<Input
							type="number"
							value={swiperSettings.speed_advanced.duration}
							onChange={(e) =>
								onChangeSettings(
									e.target.value,
									"speed_advanced",
									"duration"
								)
							}
							disabled={!swiperSettings.speed}
							className={cn("w-[80px] h-[30px]")}
						/>
						<ChevronsUp
							width={20}
							height={24}
							className={cn(
								!swiperSettings.speed ? "text-gray-300" : ""
							)}
						/>
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
