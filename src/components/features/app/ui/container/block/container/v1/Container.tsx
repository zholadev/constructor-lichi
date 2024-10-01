import React from "react";
import { IComponentTotalDataSchema } from "@/components/features/app/ui/components/types/v1/interface-components";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import { cn } from "@/components/lib/utils";
import BaseComponentRender from "@/components/features/app/ui/components/container/BaseComponentRender";
import useStylesFormatted from "@/components/shared/hooks/useStylesFormatted";

interface Props {
	componentsData: IComponentTotalDataSchema[];
	container: ISchemaContainer;
}

/**
 * @author Zholaman Zhumanov
 * @created 01.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const Container: React.FC<Props> = (props) => {
	const { componentsData, container } = props;

	const styleFormatted = useStylesFormatted();

	return (
		<div
			className={cn("size-full")}
			style={{
				height: container.settings?.view?.heightFull
					? "calc(100vh - 110px)"
					: "100%",
				...styleFormatted(container.style),
			}}
		>
			{componentsData.map((component) => {
				return (
					<BaseComponentRender
						key={component.id}
						containerData={container}
						componentData={component.data}
						type={component.data?.type}
						componentId={component.id}
					/>
				);
			})}
		</div>
	);
};

export default Container;
