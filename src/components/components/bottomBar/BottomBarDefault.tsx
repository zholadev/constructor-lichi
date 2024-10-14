import React, { useMemo } from "react";
import { cn } from "@/components/lib/utils";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import Image from "next/image";
import { IMAGES } from "@/components/shared/constants/images";
import {
	BottomBarTypes,
	DeviceType,
	ThemeSpaceMode,
} from "@/components/shared/types/types";

/**
 * @author Zholaman Zhumanov
 * @created 14.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const BottomBarDefault: React.FC = () => {
	const { spaceModeTheme, spaceModeDeviceType, spaceBottomBarType } =
		useAppSelector((state) => state?.space);

	/**
	 * @author Zholaman Zhumanov
	 * @description Получаем размеры иконок и доп стили
	 * @todo refactoring
	 */
	const stylesSetting = useMemo(() => {
		const device = spaceModeDeviceType as DeviceType;
		const theme = spaceModeTheme as ThemeSpaceMode;
		const bottomType = spaceBottomBarType as BottomBarTypes;

		const defaultOptions = {
			home: {
				width: 14,
				height: 14,
				src:
					theme === "dark"
						? IMAGES.ICON.bottomBarHome
						: bottomType === "transparent"
							? IMAGES.ICON.bottomBarHome
							: IMAGES.ICON.bottomBarHomeDark,
			},
			fav: {
				width: 20,
				height: 20,
				src:
					theme === "dark"
						? IMAGES.ICON.bottomBarFav
						: bottomType === "transparent"
							? IMAGES.ICON.bottomBarFav
							: IMAGES.ICON.bottomBarFavDark,
			},
			menu: {
				width: 20,
				height: 20,
				src:
					theme === "dark"
						? IMAGES.ICON.bottomBarMenu
						: bottomType === "transparent"
							? IMAGES.ICON.bottomBarMenu
							: IMAGES.ICON.bottomBarMenuDark,
			},
			profile: {
				width: 14,
				height: 14,
				src:
					theme === "dark"
						? IMAGES.ICON.bottomBarProfile
						: bottomType === "transparent"
							? IMAGES.ICON.bottomBarProfile
							: IMAGES.ICON.bottomBarProfileDark,
			},
			cart: {
				width: 14,
				height: 14,
				src:
					theme === "dark"
						? IMAGES.ICON.bottomBarCart
						: bottomType === "transparent"
							? IMAGES.ICON.bottomBarCart
							: IMAGES.ICON.bottomBarCartDark,
			},
		};

		if (device === "tablet") {
			return {
				container: "gap-10 px-10",
				...defaultOptions,
				title: {
					fontSize: 14,
					color:
						theme === "dark"
							? "white"
							: bottomType === "transparent"
								? "white"
								: "#181a1b",
				},
			};
		}

		return {
			container: "gap-4 px-4",
			home: {
				width: 10,
				height: 10,
				src: defaultOptions.home.src,
			},
			fav: {
				width: 12,
				height: 12,
				src: defaultOptions.fav.src,
			},
			menu: {
				width: 12,
				height: 12,
				src: defaultOptions.menu.src,
			},
			profile: {
				width: 9,
				height: 9,
				src: defaultOptions.profile.src,
			},
			cart: {
				width: 9,
				height: 9,
				src: defaultOptions.cart.src,
			},
			title: {
				fontSize: 14,
				color:
					theme === "dark"
						? "white"
						: bottomType === "transparent"
							? "white"
							: "#181a1b",
			},
		};
	}, [spaceModeDeviceType, spaceModeTheme, spaceBottomBarType]);

	/**
	 * @author Zholaman Zhumanov
	 * @description Получаем задний фон
	 */
	const bottomBarBgType = useMemo(() => {
		const theme = spaceModeTheme as ThemeSpaceMode;
		const bottomType = spaceBottomBarType as BottomBarTypes;

		if (bottomType === "transparent") {
			return "linear-gradient(180deg, rgba(0, 0, 0, 0) 5.67%, rgba(0, 0, 0, 0.03) 15.12%, rgba(0, 0, 0, 0.0642897) 20.82%, rgba(0, 0, 0, 0.0997805) 26.73%, rgba(0, 0, 0, 0.135271) 32.64%, rgba(0, 0, 0, 0.170762) 38.55%, rgba(0, 0, 0, 0.54) 100%)";
		}

		if (theme === "dark") {
			return "#181a1b";
		}

		return "#ffffff";
	}, [spaceBottomBarType, spaceModeTheme]);

	return (
		<div
			className={cn("w-full h-[63px] absolute bottom-0 left-0")}
			style={{
				background: bottomBarBgType,
			}}
		>
			<ul
				className={cn(
					`list-none flex py-2 flex-row justify-between items-center ${stylesSetting.container}`
				)}
				style={{
					fontFamily: "Futura PT",
					fontSize: stylesSetting.title.fontSize,
					color: stylesSetting.title.color,
				}}
			>
				<li
					className={cn(
						"flex justify-center items-center flex-col gap-2 font-light"
					)}
				>
					<Image
						src={stylesSetting.home.src}
						alt="home"
						width={stylesSetting.home.width}
						height={stylesSetting.home.height}
					/>
					Домой
				</li>
				<li
					className={cn(
						"flex justify-center items-center flex-col gap-2 font-light"
					)}
				>
					<Image
						src={stylesSetting.fav.src}
						alt="fav"
						width={stylesSetting.fav.width}
						height={stylesSetting.fav.height}
					/>
					Избранное
				</li>
				<li
					className={cn(
						"flex justify-center items-center flex-col gap-2 font-light"
					)}
				>
					<Image
						src={stylesSetting.menu.src}
						alt="menu"
						width={stylesSetting.menu.width}
						height={stylesSetting.menu.height}
					/>
					Каталог
				</li>
				<li
					className={cn(
						"flex justify-center items-center flex-col gap-2 font-light"
					)}
				>
					<Image
						src={stylesSetting.profile.src}
						alt="profile"
						width={stylesSetting.profile.width}
						height={stylesSetting.profile.height}
					/>
					Профиль
				</li>
				<li
					className={cn(
						"flex justify-center items-center flex-col gap-2 font-light"
					)}
				>
					<Image
						src={stylesSetting.cart.src}
						alt="cart"
						width={stylesSetting.cart.width}
						height={stylesSetting.cart.height}
					/>
					Корзина
				</li>
			</ul>
		</div>
	);
};

export default BottomBarDefault;
