import React, { useState } from "react";
import {
	DotsHorizontalIcon,
	DotsVerticalIcon,
	ReloadIcon,
} from "@radix-ui/react-icons";
import { Trash2Icon } from "lucide-react";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useApiRequest from "@/components/shared/hooks/useApiRequest";
import {
	apiMethodRemove,
	apiMethodTree,
} from "@/components/shared/backend/requests/file/requests";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/shared/shadcn/ui/popover";
import { cn } from "@/components/lib/utils";
import { Button } from "@/components/shared/shadcn/ui/button";
import { IRequestApiParams } from "@/components/shared/types/interface-app";

type IconType = "horizontal" | "vertical";

interface Props {
	path: string;
	type: string;
	children?: React.ReactNode;
	typeIcon?: IconType;
}

/**
 * @author Zholaman Zhumanov
 * @created 13.06.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const RemoveObject: React.FC<Props> = (props) => {
	const { path, type, children, typeIcon = "horizontal" } = props;

	const { getFolderDataAction, updateFolderLoaderAction } =
		useDispatchAction();

	const { loading, apiFetchHandler } = useApiRequest();

	const [popoverParams, setPopoverParams] = useState<boolean>(false);

	const togglePopover = () => setPopoverParams(!popoverParams);

	const getTreeData = async () => {
		await apiFetchHandler(
			apiMethodTree,
			updateFolderLoaderAction,
			{
				onGetData: (params: IRequestApiParams) => {
					getFolderDataAction(params?.data?.tree);
				},
			},
			[]
		);
	};

	const fetchRemoveImage = async () => {
		await apiFetchHandler(
			apiMethodRemove,
			false,
			{
				onGetData: async (params: IRequestApiParams) => {
					if (params.success) {
						await getTreeData();
						togglePopover();
					}
				},
			},
			[{ type, object: path }]
		);
	};

	return (
		<Popover open={popoverParams} onOpenChange={togglePopover}>
			<PopoverTrigger>
				<div
					className={cn(
						"w-[30px] h-[30px] bg-secondary rounded-full flex justify-center items-center"
					)}
				>
					{typeIcon === "horizontal" ? (
						<DotsHorizontalIcon />
					) : (
						<DotsVerticalIcon />
					)}
				</div>
			</PopoverTrigger>
			<PopoverContent className={cn("w-max")}>
				<div
					className={cn(
						"flex flex-row items-center gap-3 justify-between"
					)}
				>
					{children}
					<Button
						disabled={loading}
						onClick={fetchRemoveImage}
						variant="destructive"
						className={cn("flex items-center flex-row gap-3")}
					>
						{loading ? (
							<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
						) : (
							<span className="flex text-xs items-center flex-row gap-2">
								Удалить <Trash2Icon />
							</span>
						)}
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default RemoveObject;
