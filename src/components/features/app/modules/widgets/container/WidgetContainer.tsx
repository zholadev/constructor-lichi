import React from "react";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import { cn } from "@/components/lib/utils";
import styles from "@/components/styles/widget.module.sass";
import WidgetTypeDisplay from "@/components/features/app/modules/widgets/container/WidgetTypeDisplay";
import WidgetSelect from "@/components/features/app/modules/widgets/container/WidgetSelect";
import { Cross1Icon } from "@radix-ui/react-icons";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";

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
const WidgetContainer: React.FC = () => {
	const dialog = useDialogAction();
	const { editorWidgetActiveElementAction } = useDispatchAction();

	const closeStoriesHandle = () => {
		editorWidgetActiveElementAction("none");
		dialog.dialogWidget.toggle();
	};

	return (
		<div
			className={cn(
				`${styles.widget} ${dialog.dialogWidget.open ? styles.active : ""}`
			)}
		>
			<button
				type="button"
				onClick={closeStoriesHandle}
				className={cn(`${styles.close}`)}
			>
				<Cross1Icon />
			</button>
			<div className={cn("w-full grid h-full grid-cols-3")}>
				<div className={cn("col-span-2")}>
					<WidgetTypeDisplay />
				</div>
				<WidgetSelect />
			</div>
		</div>
	);
};

export default WidgetContainer;
