import React, { useEffect } from "react";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useApiRequest from "@/components/shared/hooks/useApiRequest";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { IGetApiParams } from "@/components/shared/types/interface";
import { apiMethodTree } from "@/components/shared/backend/requests/file/requests";
import { Skeleton } from "@/components/shared/shadcn/ui/skeleton";
import { Button } from "@/components/shared/shadcn/ui/button";
import { FolderPlus } from "lucide-react";
import Tree from "@/components/shared/uikit/tree/ui/Tree";
import { cn } from "@/components/lib/utils";

interface Props {}

/**
 * @author Zholaman Zhumanov
 * @created 20.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const GalleryFolderNav: React.FC<Props> = (props) => {
	const {} = props;

	const {
		getFolderDataAction,
		updateFolderLoaderAction,
		dialogCreateDirectoryAction,
	} = useDispatchAction();
	const { apiFetchHandler, loading } = useApiRequest();
	const { folderData } = useAppSelector((state) => state.folder);
	const { dialogCreateDirectory } = useAppSelector((state) => state.dialog);

	const toggleDialogCreateDirectory = () =>
		dialogCreateDirectoryAction(!dialogCreateDirectory);

	const getTreeDataInit = async () => {
		await apiFetchHandler(
			apiMethodTree,
			updateFolderLoaderAction,
			{
				onGetData: (params: IGetApiParams) => {
					getFolderDataAction(params?.data?.tree);
				},
			},
			[]
		);
	};

	useEffect(() => {
		getTreeDataInit();
	}, []);

	const renderLoadingSkeletons = () => (
		<div className="flex w-[350px] items-center flex-col gap-3">
			{Array(10)
				.fill(0)
				.map((_, index) => (
					<div key={index} className="mb-2">
						<Skeleton className="h-[30px] w-[350px]" />
					</div>
				))}
		</div>
	);

	return (
		<aside className="h-full top-0 border-r overflow-hidden">
			<div className="w-full h-[50px] flex items-center justify-between border-b py-1">
				<Button
					onClick={toggleDialogCreateDirectory}
					variant="ghost"
					className={cn("text-xs flex items-center gap-1 p-1")}
				>
					<FolderPlus /> <span>Добавить папку</span>
				</Button>
			</div>
			{loading ? (
				renderLoadingSkeletons()
			) : (
				<div
					className="w-[350px] overflow-y-auto py-3"
					style={{ height: "calc(100% - 60px)" }}
				>
					<Tree data={folderData} />
				</div>
			)}
		</aside>
	);
};

export default GalleryFolderNav;
