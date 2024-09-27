import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { useMemo } from "react";
import { ActiveElementType } from "@/components/shared/types/types";
import { IPermission } from "@/components/entities/permission/interface-permission";
import useActiveElementFollowUp from "@/components/shared/hooks/useActiveElementFollowUp";
import { getComponentPermissionData } from "@/components/entities/permission/get-component-permission-data";
import {
	ComponentBaseTypes,
	ElementBaseTypes,
} from "@/components/shared/types/types-components";
import { getElementPermissionData } from "@/components/entities/permission/get-element-permission-data";
import { TemplateBaseType } from "@/components/shared/types/interface-templates";
import { getContainerPermissionData } from "@/components/entities/permission/get-container-permission-data";

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

	return useMemo(() => {
		switch (typeActiveElement) {
			case "component":
				return getComponentPermissionData(typeDataActiveElement);
			case "element":
				return getElementPermissionData(typeDataActiveElement);
			case "container":
				return getContainerPermissionData(typeDataActiveElement);
			case "swiper":
				return {
					...basePermission,
					panel: {
						...basePermission.panel,
						setting: true,
					},
					editor: {
						...basePermission.editor,
						dnd: false,
						add: true,
					},
					styles: {
						...basePermission.styles,
						size: false,
						spacing: false,
						position: false,
					},
					setting: {
						...basePermission.setting,
						swiper: true,
					},
				};
			default:
				return basePermission;
		}
	}, [typeActiveElement, basePermission, editorActiveElement]);
}
