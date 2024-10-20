import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { useMemo } from "react";
import {
	ActiveElementType,
	DisplayContainerType,
	IContainerType,
} from "@/components/shared/types/types";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import {
	SchemaComponentTypes,
	SchemaElementTypes,
} from "@/components/shared/types/types-components";
import { IPermission } from "@/components/app/permission/types/interface-permission";
import { permissionGetComponents } from "@/components/app/permission/model/components/permission-get-components";
import { permissionGetElementsData } from "@/components/app/permission/model/elements/v1/permission-get-elements-data";
import { permissionGetContainers } from "@/components/app/permission/model/containers/permission-get-containers";

export const basePermission: IPermission = {
	panel: {
		styles: false,
		content: false,
		setting: false,
		component: true,
		element: true,
		navigator: true,
	},
	editor: {
		remove: true,
		dnd: true,
		add: false,
	},
	styles: {
		fill: {
			root: false,
			backgroundColor: false,
		},
		border: {
			root: false,
			border: false,
			radius: false,
		},
		size: {
			root: false,
			width: false,
			height: false,
		},
		spacing: {
			padding: false,
			margin: false,
			root: false,
		},
		position: {
			justifyContent: false,
			alignItems: false,
			root: false,
		},
		typography: {
			root: false,
			fontSize: false,
			fontFamily: false,
			color: false,
			fontStyle: false,
			fontWeight: false,
			textAlign: false,
		},
		grid: {
			root: false,
			gap: false,
		},
	},
	content: {
		image: false,
		video: false,
		link: false,
		textFill: false,
		stories: false,
		animation: false,
	},
	setting: {
		show: {
			root: false,
			siteType: false,
		},
		view: {
			root: false,
			contentType: false,
			navbarThemeMode: false,
			heightFull: false,
			darkTheme: true,
		},
		timer: false,
		action: {
			root: false,
			add: false,
			remove: false,
		},
		swiper: {
			root: false,
		},
		element: false,
	},
	widget: {
		root: false,
		stories: {
			root: false,
		},
	},
};

/**
 * @author Zholaman Zhumanov
 * @created 20.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo РЕФАКТОРИНГ
 * @fixme
 * @constructor
 */
export default function usePermission(): IPermission {
	const { editorActiveElement } = useAppSelector((state) => state.editor);

	const activeElementData = useActiveElementObserver();

	/**
	 * @author Zholaman Zhumanov
	 * @description Получаем тип глобального элемента
	 */
	const typeActiveElement: ActiveElementType = useMemo(() => {
		return activeElementData?.selectWidgetIsEditing
			? activeElementData?.selectWidgetActiveType
			: (activeElementData?.selectType ?? "none");
	}, [activeElementData, editorActiveElement]);
	console.log("typeActiveElement", typeActiveElement)

	/**
	 * @author Zholaman Zhumanov
	 * @description Получаем тип элемента
	 */
	const typeElementActive = useMemo((): SchemaElementTypes | string => {
		return activeElementData?.selectWidgetIsEditing
			? (activeElementData?.selectWidgetActiveData?.type ?? "none")
			: (activeElementData?.selectElementData?.type ?? "none");
	}, [activeElementData, editorActiveElement]);

	const typeComponentActive = useMemo((): SchemaComponentTypes | string => {
		return activeElementData?.selectWidgetIsEditing
			? (activeElementData?.selectWidgetActiveData?.type ?? "none")
			: (activeElementData?.selectComponentData?.type ?? "none");
	}, [activeElementData, editorActiveElement]);

	const typeContainerActive = useMemo((): IContainerType => {
		return activeElementData?.selectContainerData?.type ?? "initial";
	}, [activeElementData, editorActiveElement]);

	const activeTypeVersion = useMemo((): string => {
		return activeElementData?.selectWidgetIsEditing
			? (activeElementData?.selectWidgetActiveData?.version ?? "")
			: (activeElementData?.selectContainerData?.version ?? "");
	}, [activeElementData, editorActiveElement]);

	const activeDisplayBlockType = useMemo((): DisplayContainerType => {
		return activeElementData?.selectContainerData?.display ?? "block";
	}, [activeElementData, editorActiveElement]);

	/**
	 * @author Zholaman Zhumanov
	 * @description Получаем активный компонент с permission данными
	 */
	const currentPermission = useMemo(() => {
		switch (typeActiveElement) {
			case "component":
				return permissionGetComponents(
					typeComponentActive,
					activeTypeVersion
				);
			case "element":
				return permissionGetElementsData(typeElementActive);
			case "container":
				return permissionGetContainers(
					typeContainerActive,
					activeDisplayBlockType,
					activeTypeVersion
				);
			default:
				return false;
		}
	}, [
		typeActiveElement,
		basePermission,
		editorActiveElement,
		typeContainerActive,
		typeComponentActive,
		typeElementActive,
		activeElementData,
		activeDisplayBlockType,
		activeTypeVersion,
	]);

	return currentPermission || basePermission;
}
