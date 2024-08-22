import React from "react";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { cn } from "@/components/lib/utils";
import DeviceEmulatorContainer from "@/components/widgets/device/ui/DeviceEmulatorContainer";
import { Button } from "@/components/shared/shadcn/ui/button";
import { Skeleton } from "@/components/shared/shadcn/ui/skeleton";

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

	const { spaceTemplateApiLoading } = useAppSelector((state) => state.space);

	return spaceTemplateApiLoading ? (
		<div
			className={cn(
				"p-3 size-full flex flex-col items-center justify-center w-full"
			)}
		>
			<Skeleton className="h-[290px] w-full mb-4" />
			<Skeleton className="h-[290px] w-full mb-4" />
			<Skeleton className="h-[290px] w-full mb-4" />
			<Skeleton className="h-[290px] w-full mb-4" />
			<Skeleton className="h-[290px] w-full mb-4" />
		</div>
	) : (
		<div className={cn("w-full bg-secondary h-full overflow-y-auto")}>
			{spaceModeDeviceType === "desktop" ? (
				<div />
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
