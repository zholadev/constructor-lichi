import React from "react";
import { cn } from "@/components/lib/utils";
import { Button } from "@/components/shared/shadcn/ui/button";

interface Props {}

/**
 * @author Zholaman Zhumanov
 * @created 20.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const ActionSetting: React.FC<Props> = (props) => {
	const {} = props;

	return (
		<div className={cn("w-full px-1 mb-3")}>
			<div className={cn("w-full flex flex-col gap-3")}>
				<Button type="button" variant="outline">
					Добавить
				</Button>
				<Button type="button" variant="destructive">
					Удалить
				</Button>
			</div>
		</div>
	);
};

export default ActionSetting;
