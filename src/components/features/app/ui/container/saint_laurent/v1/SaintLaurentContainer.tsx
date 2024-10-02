import React from "react";
import useStylesFormatted from "@/components/shared/hooks/useStylesFormatted";
import { cn } from "@/components/lib/utils";
import { IComponentTotalDataSchema } from "@/components/features/app/ui/components/types/v1/interface-components";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import SpecialComponentRender from "@/components/features/app/ui/components/container/SpecialComponentRender";

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
				className={cn("saint-laurent-container-v1")}
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
				{componentsData.map((component) => {
					return (
						<SpecialComponentRender
							key={component.id}
							containerData={container}
							componentData={component.data}
							type="saint_laurent"
							componentId={component.id}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default SaintLaurentContainer;
