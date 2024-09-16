import React from "react";
import { cn } from "@/components/lib/utils";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shared/shadcn/ui/select";
import { ILangListDataItem } from "@/components/shared/types/interface";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import Divider from "@/components/shared/uikit/divider/Divider";
import { Switch } from "@/components/shared/shadcn/ui/switch";
import { Label } from "@/components/shared/shadcn/ui/label";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

interface Props {}

/**
 * @author Zholaman Zhumanov
 * @created 28.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const EditorSetting: React.FC<Props> = (props) => {
	const {} = props;

	const {
		spaceModeThemeAction,
		spaceModeLanguageAction,
		editorVideoPlayAction,
		editorSwiperAutoplayAction,
	} = useDispatchAction();

	const { languageData } = useAppSelector((state) => state.app);
	const { spaceModeTheme, spaceModeDeviceType, spaceModeLanguage } =
		useAppSelector((state) => state.space);

	const { editorVideoPlay, editorSwiperAutoplay } = useAppSelector(
		(state) => state.editor
	);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для переключения режим темы для редактора
	 * @param value
	 */
	const toggleModeThemeHandle = (value: boolean) => {
		if (value) {
			spaceModeThemeAction("dark");
			return;
		}

		spaceModeThemeAction("light");
	};

	return (
		<div className={cn("w-full h-auto flex flex-col")}>
			<h2 className={cn("")}>Настройки редактора</h2>
			<Divider spacing="medium" />

			<div className={cn("w-full flex flex-col")}>
				<h3 className={cn("text-xs mb-3 font-bold")}>Язык</h3>
				<Select
					disabled={languageData.length === 0}
					defaultValue={spaceModeLanguage}
					value={spaceModeLanguage}
					onValueChange={(value) => spaceModeLanguageAction(value)}
				>
					<SelectTrigger className="w-full min-w-[150px]">
						<SelectValue placeholder="Выберите язык" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{languageData.map((lang: ILangListDataItem) => {
								return (
									<SelectItem key={lang.id} value={lang.id}>
										{lang.name}
									</SelectItem>
								);
							})}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			<Divider spacing="medium" />

			<div className={cn("w-full flex flex-col")}>
				<h3 className={cn("text-xs mb-3 font-bold")}>Тема</h3>
				<div className="flex items-center space-x-2">
					<Switch
						id="theme-mode"
						checked={spaceModeTheme === "dark"}
						onCheckedChange={toggleModeThemeHandle}
					/>
					<Label htmlFor="theme-mode">
						{spaceModeTheme === "dark" ? <MoonIcon /> : <SunIcon />}
					</Label>
				</div>
			</div>

			<Divider spacing="medium" />

			<div
				className={cn(
					"flex justify-between cursor-pointer items-center flex-row gap-2 mb-3"
				)}
			>
				<Label htmlFor="video-autoplay">
					<h3 className={cn("text-sm mb-1 font-bold")}>
						Воспроизвести видео (autoplay)
					</h3>

					<p className={cn("text-gray-400 font-light")}>
						Будет отключен или включен для редактора
					</p>
				</Label>

				<div className={cn("flex items-center gap-2")}>
					<Switch
						id="video-autoplay"
						checked={editorVideoPlay}
						onCheckedChange={(value) => {
							editorVideoPlayAction(value);
						}}
					/>
				</div>
			</div>

			<Divider spacing="medium" />

			<div
				className={cn(
					"flex justify-between cursor-pointer items-center flex-row gap-2 mb-3"
				)}
			>
				<Label htmlFor="swiper-autoplay-editor">
					<h3 className={cn("text-sm mb-1  font-bold")}>
						Воспроизвести swiper (autoplay)
					</h3>
					<p className={cn("text-gray-400 font-light")}>
						Будет отключен или включен для редактора
					</p>
				</Label>

				<div className={cn("flex items-center gap-2")}>
					<Switch
						id="swiper-autoplay-editor"
						checked={editorSwiperAutoplay}
						onCheckedChange={(value) => {
							editorSwiperAutoplayAction(value);
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default EditorSetting;
