"use client";

import React from "react";
import { cn } from "@/components/lib/utils";
import { ButtonIcon, Component1Icon, LayersIcon } from "@radix-ui/react-icons";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { IElementTotal } from "@/components/features/app/modules/elements/types/v1/interface-elements";
import useActiveElement from "@/components/shared/hooks/useActiveElement";
import { ActiveElementType } from "@/components/shared/types/types";
import { GalleryThumbnailsIcon } from "lucide-react";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";

interface Props {
	type: ActiveElementType;
	containerId: string;
	componentId?: string;
	elementId?: string;
	activeId: string;
	data: ISchemaContainer | ISchemaComponent | IElementTotal;
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
	const { type, containerId, data, activeId, elementId, componentId } = props;

	const { editorNavigatorHoverIdAction } = useDispatchAction();

	const activeElementHandle = useActiveElement();

	const onMouseOverHandle = (id: string | null) =>
		editorNavigatorHoverIdAction(id);

	const formattedName = (name: string) => {
		if (typeof name === "string") {
			return name.replace(/_/g, " ");
		}

		return name;
	};

	const onClickHandle = () => {
		if (type === "element") {
			activeElementHandle({
				activeData: data,
				containerId,
				type,
				componentId,
				activeId,
				elementId,
			});
			return;
		}

		activeElementHandle({
			activeData: data,
			containerId,
			type,
			componentId,
			activeId,
		});
	};

	const getIconsRender = () => {
		switch (type) {
			case "container":
				return <LayersIcon />;
			case "element":
				return <ButtonIcon />;
			case "swiper":
				return <GalleryThumbnailsIcon />;
			case "component":
				return <Component1Icon />;
			default:
				return <Component1Icon />;
		}
	};

	return (
		<div className={cn("pl-3")}>
			<div
				onMouseMove={() => onMouseOverHandle(data?.id)}
				onClick={onClickHandle}
				onMouseLeave={() => onMouseOverHandle(null)}
				className={cn(
					"w-full flex uppercase text-xs flex-row items-center gap-2 py-2 border-b cursor-pointer hover:bg-secondary transition-bg"
				)}
			>
				<span>{getIconsRender()}</span>{" "}
				{formattedName(data?.type) ?? "Выберите компонент"}
			</div>
			{data?.components &&
				data?.components.map((component: ISchemaComponent) => {
					return (
						<div
							className={cn("w-full flex flex-col")}
							key={component.id}
						>
							<NavigatorLayer
								containerId={containerId}
								data={component}
								type="component"
								componentId={component?.id}
								activeId={component?.id}
							/>

							{component?.elements &&
								component?.elements.map((element) => (
									<div
										className={cn("pl-3")}
										key={element.id}
									>
										<NavigatorLayer
											containerId={containerId}
											data={element}
											type="element"
											componentId={component?.id}
											activeId={element?.id}
											elementId={element?.id}
										/>
									</div>
								))}
						</div>
					);
				})}
		</div>
	);
};

export default NavigatorLayer;
