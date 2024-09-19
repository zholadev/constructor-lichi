import React from "react";
import { cn } from "@/components/lib/utils";
import { ButtonIcon, Component1Icon, LayersIcon } from "@radix-ui/react-icons";
import { ITemplateBaseSchema } from "@/components/shared/types/interface-templates";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { IElementTotal } from "@/components/features/app/elements/types/interface-elements";

type LayerType = "container" | "component" | "element";

interface Props {
	node: ITemplateBaseSchema | IElementTotal;
	type: LayerType;
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
	const { node, onSelect, type } = props;

	const { editorNavigatorHoverIdAction } = useDispatchAction();

	const onMouseOverHandle = (id: string | null) =>
		editorNavigatorHoverIdAction(id);

	return (
		<div className={cn("pl-3")}>
			<div
				onMouseMove={() =>
					onMouseOverHandle(
						type === "container" || type === "element"
							? node.id
							: node?.data?.id
					)
				}
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
				{node.type || node?.data?.type}
			</div>
			{node.components &&
				node.components.map((component) => {
					return (
						<div
							className={cn("w-full flex flex-col")}
							key={component.id}
						>
							<NavigatorLayer
								key={component.id}
								node={component}
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
												key={element.id}
												node={element}
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
