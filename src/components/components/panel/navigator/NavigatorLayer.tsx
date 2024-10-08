import React from "react";
import { cn } from "@/components/lib/utils";
import { ButtonIcon, Component1Icon, LayersIcon } from "@radix-ui/react-icons";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { IElementTotal } from "@/components/features/app/modules/elements/types/v1/interface-elements";
import useActiveElement from "@/components/shared/hooks/useActiveElement";
import {
	ActiveElementType,
	TotalComponentTypes,
} from "@/components/shared/types/types";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import { GalleryThumbnailsIcon } from "lucide-react";

interface Props {
	data: ISchemaContainer;
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

	const formattedName = (name: string) => {
		if (typeof name === "string") {
			return name.replace(/_/g, " ");
		}

		return name;
	};

	const onClickHandle = (
		type: ActiveElementType,
		data: TotalComponentTypes
	) => {
		activeElementHandle({
			activeData: data,
			containerId,
			type,
			componentId: data?.id,
			activeId: data?.id,
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
				onClick={() => {
					onClickHandle(type, data);
				}}
				onMouseLeave={() => onMouseOverHandle(null)}
				className={cn(
					"w-full flex uppercase text-xs flex-row items-center gap-2 py-2 border-b cursor-pointer hover:bg-secondary transition-bg"
				)}
			>
				<span>{getIconsRender()}</span>{" "}
				{formattedName(data?.type) ?? "Выберите компонент"}
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
