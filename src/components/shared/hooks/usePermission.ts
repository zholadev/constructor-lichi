import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { useMemo } from "react";
import { ActiveElementType } from "@/components/shared/types/types";
import { IPermission } from "@/components/entities/permission/types/interface-permission";
import useActiveElementFollowUp from "@/components/shared/hooks/useActiveElementFollowUp";
import { permissionGetComponentsData } from "@/components/entities/permission/model/components/v1/permission-get-components-data";
import {
	ComponentBaseTypes,
	ElementBaseTypes,
} from "@/components/shared/types/types-components";
import { permissionGetElementsData } from "@/components/entities/permission/model/elements/v1/permission-get-elements-data";
import { TemplateBaseType } from "@/components/shared/types/interface-templates";
import { permissionGetContainersData } from "@/components/entities/permission/model/containers/v1/permission-get-containers-data";

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
	},
	setting: {
		show: {
			root: false,
			siteType: false,
		},
		view: {
			root: false,
			contentType: false,
			navbarMode: false,
			heightFull: false,
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
};

/**
 * @author Zholaman Zhumanov
 * @created 20.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
export default function usePermission(): IPermission {
	const { editorActiveElement } = useAppSelector((state) => state.editor);

	const activeElementData = useActiveElementFollowUp();

	/**
	 * @author Zholaman Zhumanov
	 * @description Получаем тип глобального элемента
	 */
	const typeActiveElement: ActiveElementType = useMemo(() => {
		return activeElementData.type;
	}, [activeElementData]);

	/**
	 * @author Zholaman Zhumanov
	 * @description Получаем тип элемента
	 */
	const typeDataActiveElement:
		| ComponentBaseTypes
		| ElementBaseTypes
		| TemplateBaseType = useMemo(() => {
		return activeElementData?.data?.type ?? "";
	}, [activeElementData]);

	/**
	 * @author Zholaman Zhumanov
	 * @description Получаем активный компонент с permission данными
	 */
	const currentPermission = useMemo(() => {
		switch (typeActiveElement) {
			case "component":
				return permissionGetComponentsData(typeDataActiveElement);
			case "element":
				return permissionGetElementsData(typeDataActiveElement);
			case "container":
				return permissionGetContainersData(typeDataActiveElement);
			case "swiper":
				return permissionGetContainersData(typeDataActiveElement);
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
