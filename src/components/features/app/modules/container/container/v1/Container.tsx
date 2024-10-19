import React from "react";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import { cn } from "@/components/lib/utils";
import BaseComponentRender from "@/components/features/app/modules/components/container/v1/BaseComponentRender";
import useStylesFormatted from "@/components/shared/hooks/useStylesFormatted";
import useDeviceHeightProperty from "@/components/shared/hooks/useDeviceHeightProperty";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";

interface Props {
	componentsData: ISchemaComponent[];
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

	const heightDeviceProperty = useDeviceHeightProperty();

	const styleFormatted = useStylesFormatted();

	return (
		<div
			className={cn("size-full")}
			style={{
				height: heightDeviceProperty(
					container.settings?.view?.heightFull ?? false
				),
				...styleFormatted(
					container.style,
					!container?.settings?.view?.darkTheme
				),
			}}
		>
			{componentsData.map((component) => {
				return (
					<BaseComponentRender
						key={component.id}
						containerData={container}
						componentData={component}
						type={component?.type}
						componentId={component.id ?? ""}
					/>
				);
			})}
		</div>
	);
};

export default Container;
