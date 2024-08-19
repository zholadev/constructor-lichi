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

interface Props {}

/**
 * @author Zholaman Zhumanov
 * @created 19.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const SchemaListSelectPlatform: React.FC<Props> = (props) => {
	const {} = props;

	const toastMessage = useToastMessage();

	const { dialogPlatformTypeAction, spaceModePlatformTypeAction } =
		useDispatchAction();

	const { dialogPlatformType } = useAppSelector((state) => state.dialog);
	const { spaceModePlatformType } = useAppSelector((state) => state.space);

	const toggleDialogHandle = () =>
		dialogPlatformTypeAction(!dialogPlatformType);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для подтверждения и перехода в страницу редактора
	 */
	const confirmPlatform = () => {
		if (spaceModePlatformType === null) {
			toastMessage("Вы не выбрали платформу", "warning");
		}
	};

	const selectPlatform = (value: PlatformType) => {
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
					<div className={cn("flex gap-6 items-center mb-10")}>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										type="button"
										variant={
											spaceModePlatformType === "browser"
												? "outline"
												: "ghost"
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
												? "outline"
												: "ghost"
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
							{spaceModePlatformType !== null
								? "Перейти"
								: "Выберите"}
						</Button>
					</DialogFooter>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default SchemaListSelectPlatform;
