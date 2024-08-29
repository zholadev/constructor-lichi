import React from "react";
import { cn } from "@/components/lib/utils";
import Divider from "@/components/shared/uikit/divider/ui/Divider";

interface Props {}

/**
 * @author Zholaman Zhumanov
 * @created 28.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const ComponentBaseContent: React.FC<Props> = (props) => {
	const {} = props;

	return (
		<div className={cn("w-full")}>
			<h2 className={cn("text-sm mb-2")}>Компоненты</h2>
			<p className={cn("text-xs text-gray-400")}>
				Выберите компонент чтоб добавить ее в выбранной блок!
			</p>

			<Divider spacing="large" />
		</div>
	);
};

export default ComponentBaseContent;
