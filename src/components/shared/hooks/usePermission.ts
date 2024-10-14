import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { useMemo } from "react";
import {
	ActiveElementType,
	DisplayContainerType,
	IContainerType,
} from "@/components/shared/types/types";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import {
	ComponentBaseTypes,
	ComponentSpecialTypes,
	ElementBaseTypes,
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
		return activeElementData?.widgetType !== "none"
			? activeElementData.widgetActiveType
			: (activeElementData?.type ?? "none");
	}, [activeElementData]);

	/**
	 * @author Zholaman Zhumanov
	 * @description Получаем тип элемента
	 */
	const typeDataActiveElement:
		| ComponentBaseTypes
		| ElementBaseTypes
		| IContainerType
		| ComponentSpecialTypes
		| "none" = useMemo(() => {
		return activeElementData?.widgetType !== "none"
			? activeElementData.widgetActiveData?.type
			: (activeElementData?.activeData?.type ?? "none");
	}, [activeElementData]);

	const activeTypeVersion: string = useMemo(() => {
		return activeElementData?.widgetType !== "none"
			? activeElementData.widgetActiveData?.version
			: (activeElementData?.activeData?.version ?? "");
	}, [activeElementData]);

	const activeDisplayBlockType: DisplayContainerType = useMemo(() => {
		return activeElementData?.activeData?.display ?? "block";
	}, [activeElementData]);

	/**
	 * @author Zholaman Zhumanov
	 * @description Получаем активный компонент с permission данными
	 */
	const currentPermission = useMemo(() => {
		switch (typeActiveElement) {
			case "component":
				return permissionGetComponents(
					typeDataActiveElement,
					activeTypeVersion
				);
			case "element":
				return permissionGetElementsData(
					typeDataActiveElement,
					activeTypeVersion
				);
			case "container":
				return permissionGetContainers(
					typeDataActiveElement,
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
		typeDataActiveElement,
	]);

	return currentPermission || basePermission;
}
