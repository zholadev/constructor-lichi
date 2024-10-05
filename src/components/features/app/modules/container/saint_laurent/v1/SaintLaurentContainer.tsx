import React from "react";
import useStylesFormatted from "@/components/shared/hooks/useStylesFormatted";
import { cn } from "@/components/lib/utils";
import { IComponentTotalDataSchema } from "@/components/features/app/modules/components/types/v1/interface-components";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import SpecialComponentRender from "@/components/features/app/modules/components/container/v1/SpecialComponentRender";
import { useAppSelector } from "@/components/app/store/hooks/hooks";

interface Props {
	componentsData: IComponentTotalDataSchema[];
	container: ISchemaContainer;
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
	const { componentsData, container } = props;

	const styleFormatted = useStylesFormatted();

	const { spaceModeDeviceType } = useAppSelector((state) => state.space);

	return (
		<div
			className={cn("size-full flex justify-center items-center")}
			style={{
				...styleFormatted(
					{
						backgroundColor: "#ffffff",
						backgroundColorDark: "#181a1b",
					},
					!container?.settings?.view?.darkTheme
				),
			}}
		>
			<div
				className={cn(
					`saint-laurent-container-v1 ${spaceModeDeviceType === "tablet" ? "saint_laurent_container_table" : spaceModeDeviceType === "mobile" ? "saint_laurent_container_mobile" : ""}`
				)}
				style={{
					height: container.settings?.view?.heightFull
						? "100vh"
						: "100%",
					...styleFormatted(
						container.style,
						!container?.settings?.view?.darkTheme
					),
				}}
			>
				{componentsData.map((component, index: number) => {
					return (
						<SpecialComponentRender
							key={component.id}
							type="saint_laurent"
							componentIndex={index}
							containerData={container}
							componentId={component.id}
							componentData={component.data}
							componentLen={componentsData?.length}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default SaintLaurentContainer;
