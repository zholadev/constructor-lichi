import React from "react";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { cn } from "@/components/lib/utils";
import DeviceEmulatorContainer from "@/components/widgets/device/ui/DeviceEmulatorContainer";
import { Button } from "@/components/shared/shadcn/ui/button";
import { Skeleton } from "@/components/shared/shadcn/ui/skeleton";
import { TemplateBaseSchema } from "@/components/shared/types/interface-components";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/shared/shadcn/ui/context-menu";
import TemplateAddButton from "./TemplateAddButton";

interface Props {}

/**
 * @author Zholaman Zhumanov
 * @created 20.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const WhiteBoard: React.FC<Props> = (props) => {
	const {} = props;

	const { spaceModeDeviceType } = useAppSelector((state) => state.space);

	const { spaceTemplateApiLoading, spaceTemplateData } = useAppSelector(
		(state) => state.space
	);

	if (spaceTemplateApiLoading) {
		return (
			<div
				className={cn(
					"p-3 size-full flex flex-col items-center justify-center w-full"
				)}
			>
				{Array.from({ length: 5 }).map((_, index) => (
					<Skeleton key={index} className="h-[290px] w-full mb-4" />
				))}
			</div>
		);
	}

	return (
		<div className={cn("w-full bg-secondary p-2 h-screen overflow-y-auto")}>
			{spaceModeDeviceType === "desktop" ? (
				<div className={cn("h-full overflow-y-auto")}>
					{Object.values(spaceTemplateData).map(
						(template: TemplateBaseSchema, index) => {
							return (
								<ContextMenu>
									<ContextMenuTrigger>
										<div
											key={index}
											className={cn(
												"border w-full h-80 bg-white"
											)}
											style={{
												...template.style,
											}}
										>
											{template.components.map((item) => {
												return (
													<div
														key={item.id}
														className={cn(
															"border w-full hover:bg-secondary cursor-pointer"
														)}
													/>
												);
											})}
										</div>
									</ContextMenuTrigger>
									<ContextMenuContent>
										<ContextMenuItem>
											Удалить
										</ContextMenuItem>
										<ContextMenuItem>
											Переместить
										</ContextMenuItem>
									</ContextMenuContent>
								</ContextMenu>
							);
						}
					)}
					<TemplateAddButton />
				</div>
			) : spaceModeDeviceType === "mobile" ? (
				<div className={cn("flex items-center justify-center mt-10")}>
					<DeviceEmulatorContainer>
						<div className={cn("overflow-y-auto")}>
							<img
								src="https://static.lichi.com/product/47770/51364bd7f027855fb6fab48c4c393afb.jpg?v=0_47770.0"
								alt=""
								className={cn("w-full block")}
							/>

							<Button>Text</Button>
						</div>
					</DeviceEmulatorContainer>
				</div>
			) : null}
		</div>
	);
};

export default WhiteBoard;
