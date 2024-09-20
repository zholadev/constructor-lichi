import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { useMemo } from "react";
import { ActiveElementType } from "@/components/shared/types/types";

interface IPermission {
	panel: {
		styles: boolean;
		content: boolean;
		setting: boolean;
		component: boolean;
		element: boolean;
		navigator: boolean;
	};
	editor: {
		remove: boolean;
		dnd: boolean;
		add: boolean;
	};
	styles: {
		fill: boolean;
		border: boolean;
		size: boolean;
		spacing: boolean;
		position: boolean;
		typography: boolean;
	};
	content: {
		image: boolean;
		video: boolean;
		link: boolean;
	};
	setting: {
		show: boolean;
		view: boolean;
		action: boolean;
		swiper: boolean;
	};
}

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

	const typeActiveElement: ActiveElementType = useMemo(() => {
		return editorActiveElement.type ?? "";
	}, [editorActiveElement]);

	return useMemo(() => {
		const basePermission: IPermission = {
			panel: {
				styles: false,
				content: false,
				setting: false,
				component: true,
				element: false,
				navigator: true,
			},
			editor: {
				remove: true,
				dnd: false,
				add: false,
			},
			styles: {
				fill: true,
				border: true,
				size: true,
				spacing: true,
				position: true,
				typography: true,
			},
			content: {
				image: true,
				video: true,
				link: true,
			},
			setting: {
				show: true,
				view: true,
				action: true,
				swiper: false,
			},
		};

		switch (typeActiveElement) {
			case "component":
				return {
					...basePermission,
					panel: {
						...basePermission.panel,
						styles: true,
						content: true,
						setting: true,
						element: true,
					},
					editor: {
						...basePermission.editor,
						dnd: false,
						add: true,
					},
				};
			case "element":
				return {
					...basePermission,
					panel: {
						...basePermission.panel,
						styles: true,
						component: true,
						content: true,
					},
					content: {
						...basePermission.content,
						image: false,
						video: false,
					},
					setting: {
						...basePermission.setting,
						show: false,
						view: false,
						swiper: false,
					},
				};
			case "container":
				return {
					...basePermission,
					panel: {
						...basePermission.panel,
						setting: true,
					},
					editor: {
						...basePermission.editor,
						dnd: true,
						add: true,
					},
					styles: {
						fill: false,
						border: false,
						size: false,
						spacing: false,
						position: false,
						typography: false,
					},
					setting: {
						...basePermission.setting,
						show: false,
						view: false,
						swiper: false,
					},
				};
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
	}, [typeActiveElement]);
}
