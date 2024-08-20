"use client";

import React from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/shared/shadcn/ui/dialog";
import { cn } from "@/components/lib/utils";
import { Button } from "@/components/shared/shadcn/ui/button";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { DesktopIcon, MobileIcon } from "@radix-ui/react-icons";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/shared/shadcn/ui/tooltip";
import { PlatformType } from "@/components/shared/types/types";
import { useRouter } from "next/navigation";

/**
 * @author Zholaman Zhumanov
 * @created 19.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const SchemaListSelectPlatform: React.FC = () => {
	const router = useRouter();

	const toastMessage = useToastMessage();

	const {
		dialogPlatformTypeAction,
		spaceModePlatformTypeAction,
		spaceModeDeviceTypeAction,
	} = useDispatchAction();

	const { dialogPlatformType } = useAppSelector((state) => state.dialog);
	const { spaceModePlatformType, spaceTemplatePageId } = useAppSelector(
		(state) => state.space
	);

	const toggleDialogHandle = () => {
		dialogPlatformTypeAction(!dialogPlatformType);
		selectPlatform(null);
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для подтверждения и перехода в страницу редактора и назначение тип девайса
	 */
	const confirmPlatform = () => {
		if (spaceModePlatformType === null) {
			toastMessage("Вы не выбрали платформу", "warning");
		}

		if (spaceModePlatformType && spaceTemplatePageId) {
			router.push(
				`/space?page_id=${spaceTemplatePageId}&platform=${spaceModePlatformType}`
			);
			toggleDialogHandle();

			switch (spaceModePlatformType) {
				case "browser":
					spaceModeDeviceTypeAction("desktop");
					break;
				case "app":
					spaceModeDeviceTypeAction("mobile");
					break;
				default:
					spaceModeDeviceTypeAction(null);
					break;
			}
		}
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для выбора тип платформы
	 * @param value
	 */
	const selectPlatform = (value: PlatformType | null) => {
		spaceModePlatformTypeAction(value);
	};

	return (
		<Dialog open={dialogPlatformType} onOpenChange={toggleDialogHandle}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className={cn("text-sm text-center")}>
						Выберите платформу чтоб перейти к редактору!
					</DialogTitle>
				</DialogHeader>
				<div className="flex items-center flex-col mb-3 mt-4 space-x-2">
					<div className={cn("flex gap-2 items-center mb-10")}>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										type="button"
										variant={
											spaceModePlatformType === "browser"
												? "default"
												: "outline"
										}
										className={cn("w-[90px] h-[90px]")}
										onClick={() =>
											selectPlatform("browser")
										}
									>
										<DesktopIcon width={30} height={30} />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Сайт</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										type="button"
										variant={
											spaceModePlatformType === "app"
												? "default"
												: "outline"
										}
										onClick={() => selectPlatform("app")}
										className={cn("w-[90px] h-[90px]")}
									>
										<MobileIcon width={30} height={40} />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Мобильное приложение</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
					<DialogFooter className="sm:justify-center w-full">
						<DialogClose asChild>
							<Button
								type="button"
								className="text-xs"
								variant="secondary"
							>
								Отмена
							</Button>
						</DialogClose>

						<Button
							onClick={confirmPlatform}
							className={cn("flex items-center gap-2 text-xs")}
						>
							Перейти
						</Button>
					</DialogFooter>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default SchemaListSelectPlatform;
