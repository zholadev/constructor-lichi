import React from "react";
import { cn } from "@/components/lib/utils";
import { ButtonIcon, Component1Icon, LayersIcon } from "@radix-ui/react-icons";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { IElementTotal } from "@/components/features/app/elements/types/interface-elements";
import useActiveElement from "@/components/shared/hooks/useActiveElement";
import {
	ActiveElementType,
	TotalComponentTypes,
} from "@/components/shared/types/types";
import { ITemplateSchemaGlobal } from "@/components/shared/types/interface";
import { IComponentBaseFullSchema } from "@/components/features/app/blocks/types/interface-components";

interface Props {
	data: ITemplateSchemaGlobal;
	type: ActiveElementType;
	containerId: string;
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
	const { data, onSelect, type, containerId } = props;

	const { editorNavigatorHoverIdAction } = useDispatchAction();

	const activeElementHandle = useActiveElement();

	const onMouseOverHandle = (id: string | null) =>
		editorNavigatorHoverIdAction(id);

	const onClickHandle = (
		type: ActiveElementType,
		data: TotalComponentTypes
	) => {
		activeElementHandle({
			data,
			containerId,
			type: type,
			componentId: data?.id,
			currentId: data?.id,
		});
	};

	return (
		<div className={cn("pl-3")}>
			<div
				onMouseMove={() =>
					onMouseOverHandle(
						type === "container" || type === "element"
							? data?.id
							: data?.data?.id
					)
				}
				onClick={() => {
					onClickHandle(type, type === "component" ? data?.data : data);
				}}
				onMouseLeave={() => onMouseOverHandle(null)}
				className={cn(
					"w-full flex uppercase text-xs flex-row items-center gap-2 py-2 border-b cursor-pointer hover:bg-secondary transition-bg"
				)}
			>
				<span>
					{type === "container" ? (
						<LayersIcon />
					) : type === "component" ? (
						<Component1Icon />
					) : type === "element" ? (
						<ButtonIcon />
					) : null}
				</span>{" "}
				{data?.type || data?.data?.type}
			</div>
			{data?.components &&
				data?.components.map((component) => {
					return (
						<div
							className={cn("w-full flex flex-col")}
							key={component.id}
						>
							<NavigatorLayer
								containerId={containerId}
								key={component.id}
								data={component}
								onSelect={onSelect}
								type="component"
							/>

							{component.data?.elements &&
								component.data?.elements.map(
									(element: IElementTotal) => (
										<div
											className={cn("pl-3")}
											key={element.id}
										>
											<NavigatorLayer
												containerId={containerId}
												key={element.id}
												data={element}
												onSelect={onSelect}
												type="element"
											/>
										</div>
									)
								)}
						</div>
					);
				})}
		</div>
	);
};

export default NavigatorLayer;
