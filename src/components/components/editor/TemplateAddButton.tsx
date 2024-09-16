import React from "react";
import { cn } from "@/components/lib/utils";
import { ImageIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/shared/shadcn/ui/button";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";

interface Props {}

/**
 * @author Zholaman Zhumanov
 * @created 27.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const TemplateAddButton: React.FC<Props> = (props) => {
	const {} = props;

	const { dialogAddTemplateAction } = useDispatchAction();
	const { dialogAddTemplate } = useAppSelector((state) => state.dialog);

	const toggleDialogAddTemplateHandle = () =>
		dialogAddTemplateAction(!dialogAddTemplate);

	return (
		<div
			className={cn(
				"w-full bg-white p-3 h-[40vh] flex items-center justify-center border rounded-md"
			)}
		>
			<Button
				variant="outline"
				className={cn(
					"flex flex-col w-[240px] h-[320px] hover:text-green-500 "
				)}
				onClick={toggleDialogAddTemplateHandle}
			>
				<ImageIcon
					width={120}
					height={120}
					className="mb-10 text-gray-500"
				/>
				<PlusIcon width={40} height={40} />
			</Button>
		</div>
	);
};

export default TemplateAddButton;
