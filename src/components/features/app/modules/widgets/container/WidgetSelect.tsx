import React from "react";
import { cn } from "@/components/lib/utils";
import {
	IWidgetList,
	WidgetTypes,
} from "@/components/features/app/modules/widgets/types/interface-widget";
import useUpdateActions from "@/components/shared/hooks/actions/useUpdateActions";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import useUpdateWidgetActions from "@/components/features/app/modules/widgets/hooks/useUpdateWidgetActions";
import { Button } from "@/components/shared/shadcn/ui/button";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";

const widgetListData: IWidgetList[] = [
	{
		id: 1,
		type: "stories",
		name: "Stories (instagram)",
	},
];

/**
 * @author Zholaman Zhumanov
 * @created 13.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const WidgetSelect: React.FC = () => {
	const activeElementData = useActiveElementObserver();

	const { editorWidgetActiveElementAction } = useDispatchAction();

	const updateActions = useUpdateActions();
	const updateWidgetActions = useUpdateWidgetActions();

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для добавления виджета в компонент
	 * @param value
	 */
	const onChangeHandle = (value: WidgetTypes) => {
		editorWidgetActiveElementAction(value);
		updateActions.update(
			{ type: value, data: { components: [] } },
			"widgets"
		);
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для удаления виджета с компонента
	 */
	const removeWidget = () => {
		updateActions.update({}, "widgets", [""], true, false);
		updateWidgetActions.update({}, "widgets", [""], true, false);
	};

	return (
		<div
			className={cn("w-full flex flex-col relative border-l p-5 h-full")}
		>
			<h3 className={cn("w-full text-gray-500")}>Выберите виджет</h3>

			<div className={cn("flex flex-col gap-3 mb-4 mt-4")}>
				<Button variant="destructive" onClick={removeWidget}>
					Удалить виджет
				</Button>
				{widgetListData.map((widget) => {
					return (
						<Button
							key={widget.type}
							variant={
								activeElementData?.selectWidgetActiveData
									?.type === widget.type
									? "default"
									: "secondary"
							}
							disabled={
								activeElementData?.selectWidgetActiveData
									?.type === widget.type
							}
							onClick={() => onChangeHandle(widget.type)}
						>
							{widget.name}
						</Button>
					);
				})}
			</div>
		</div>
	);
};

export default WidgetSelect;
