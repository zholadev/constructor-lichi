import React from "react";
import useStylesFormatted from "@/components/shared/hooks/useStylesFormatted";
import { cn } from "@/components/lib/utils";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import SpecialComponentRender from "@/components/features/app/modules/components/container/v1/SpecialComponentRender";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { DeviceType } from "@/components/shared/types/types";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";

interface Props {
	componentsData: ISchemaComponent;
	containerData: ISchemaContainer;
}

/**
 * @author Zholaman Zhumanov
 * @created 02.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const SaintLaurentContainer: React.FC<Props> = (props) => {
	const { componentsData, containerData } = props;

	const styleFormatted = useStylesFormatted();

	const { spaceModeDeviceType } = useAppSelector((state) => state.space);

	const deviceMode: DeviceType = spaceModeDeviceType;

	return (
		<div
			className={cn("size-full flex justify-center items-center")}
			style={{
				...styleFormatted(
					{
						backgroundColor: "#ffffff",
						backgroundColorDark: "#181a1b",
					},
					!containerData?.settings?.view?.darkTheme
				),
			}}
		>
			<div
				className={cn(
					`saint-laurent-container-v1 ${deviceMode === "tablet" ? "saint_laurent_container_table" : deviceMode === "mobile" ? "saint_laurent_container_mobile" : ""}`
				)}
				style={{
					height: containerData.settings?.view?.heightFull
						? "100vh"
						: "100%",
					...styleFormatted(
						containerData.style,
						!containerData?.settings?.view?.darkTheme
					),
				}}
			>
				{componentsData.map((component, index: number) => {
					return (
						<SpecialComponentRender
							key={component.id}
							type="saint_laurent"
							componentIndex={index}
							containerData={containerData}
							componentId={component.id}
							componentData={component}
							componentLen={componentsData?.length}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default SaintLaurentContainer;
