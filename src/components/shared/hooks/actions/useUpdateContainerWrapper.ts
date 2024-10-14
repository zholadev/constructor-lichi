import useToastMessage from "@/components/shared/hooks/useToastMessage";
import useActiveElement from "@/components/shared/hooks/useActiveElement";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";

interface IUpdateContainerWrapper {
	containerUpdateWrapper: (component: ISchemaComponent) => any;
}

/**
 * @author Zholaman Zhumanov
 * @created 08.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
export default function useUpdateContainerWrapper(): IUpdateContainerWrapper {
	const toastMessage = useToastMessage();
	const activeElementHandle = useActiveElement();
	const dialog = useDialogAction();
	const { spaceTemplateDataAction } = useDispatchAction();
	const activeElementData = useActiveElementObserver();

	const { spaceTemplateData } = useAppSelector((state) => state.space);
	const { editorActiveElement } = useAppSelector((state) => state.editor);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод
	 */
	const containerUpdateWrapper = (
		updateFn: (component: ISchemaComponent) => any
	) => {
		return spaceTemplateData.map((container: ISchemaContainer) => {
			if (container.id === activeElementData?.containerId) {
				return {
					...container,
					components: container.components.map((component) =>
						updateFn(component)
					),
				};
			}
			return container;
		});
	};

	return {
		containerUpdateWrapper,
	};
}
