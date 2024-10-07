import React from "react";
import {
	ISchemaContainer,
	ISchemaContainerComponentWrapper,
} from "@/components/shared/types/interface-schema-container";
import { cn } from "@/components/lib/utils";
import BaseComponentRender from "@/components/features/app/modules/components/container/v1/BaseComponentRender";
import useStylesFormatted from "@/components/shared/hooks/useStylesFormatted";

interface Props {
	componentsData: ISchemaContainerComponentWrapper;
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
