import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";

interface IUpdateContainerWrapper {
	containerUpdateWrapper: (
		updateFn: (component: ISchemaComponent) => ISchemaComponent
	) => ISchemaContainer[];
}

/**
 * @author Zholaman Zhumanov
 * @created 08.10.2024
 * @description Хук для обновления компонентов контейнера
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
export default function useUpdateContainerWrapper(): IUpdateContainerWrapper {
	const activeElementData = useActiveElementObserver();

	const { spaceTemplateData } = useAppSelector((state) => state.space);

	/**
	 * @description Метод для обновления компонентов в контейнере
	 */
	const containerUpdateWrapper = (
		updateFn: (component: ISchemaComponent) => ISchemaComponent
	): ISchemaContainer[] => {
		// Возвращаем новый массив контейнеров с обновленными компонентами
		return spaceTemplateData.map((container: ISchemaContainer) => {
			// Проверяем, является ли контейнер активным
			if (container.id === activeElementData?.selectContainerId) {
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
