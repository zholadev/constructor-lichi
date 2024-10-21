"use client";

import React from "react";
import { cn } from "@/components/lib/utils";
import { ButtonIcon, Component1Icon, LayersIcon } from "@radix-ui/react-icons";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useActiveElement from "@/components/shared/hooks/useActiveElement";
import { ActiveElementType, SchemaData } from "@/components/shared/types/types";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";
import { formattedName } from "@/components/shared/utils/utils";

interface Props {
	type: ActiveElementType;
	containerId: string;
	componentId?: string;
	data: SchemaData;
}

/**
 * @author Zholaman Zhumanov
 * @created 16.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo refactoring
 * @fixme
 * @param props
 * @constructor
 */
const NavigatorLayer: React.FC<Props> = (props) => {
	const { type, containerId, data, componentId } = props;

	const { editorNavigatorHoverIdAction } = useDispatchAction();

	const activeElementHandle = useActiveElement();

	const onMouseOverHandle = (id: string | null) =>
		editorNavigatorHoverIdAction(id);

	const onClickHandle = () => {
		activeElementHandle({
			selectActiveData: data ?? null,
			selectType: type,
			selectComponentId:
				type === "component" ? (data?.id ?? "") : (componentId ?? ""),
			selectWidgetActiveId: "",
			selectActiveId: data?.id ?? "",
			selectContainerId: containerId ?? "",
			selectElementId: "",
			selectWidgetActiveData: null,
			selectWidgetActiveType: "none",
			selectWidgetComponentId: "",
		});
	};

	const getIconsRender = () => {
		switch (type) {
			case "container":
				return <LayersIcon />;
			case "element":
				return <ButtonIcon />;
			case "component":
				return <Component1Icon />;
			default:
				return <Component1Icon />;
		}
	};

	return (
		<div className={cn("pl-3")}>
			<div
				onMouseMove={() => onMouseOverHandle(data?.id ?? null)}
				onClick={onClickHandle}
				onMouseLeave={() => onMouseOverHandle(null)}
				className={cn(
					"w-full flex uppercase text-xs flex-row items-center gap-2 py-2 border-b cursor-pointer hover:bg-secondary transition-bg"
				)}
			>
				<span>{getIconsRender()}</span>{" "}
				{formattedName(data?.type) ?? "Выберите компонент"}
			</div>
			{"components" in data &&
				data.components &&
				data.components.map((component: ISchemaComponent) => (
					<div
						className={cn("w-full flex flex-col")}
						key={component.id}
					>
						<NavigatorLayer
							containerId={containerId}
							data={component}
							type="component"
							componentId={component?.id}
						/>

						{component.elements?.map((element) => (
							<div className={cn("pl-3")} key={element.id}>
								<NavigatorLayer
									containerId={containerId}
									data={element}
									type="element"
									componentId={component?.id}
								/>
							</div>
						))}
					</div>
				))}
		</div>
	);
};

export default NavigatorLayer;
