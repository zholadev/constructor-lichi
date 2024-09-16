import React, { useEffect } from "react";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useApiRequest from "@/components/shared/hooks/useApiRequest";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { apiMethodGet } from "@/components/shared/backend/requests/file/requests";
import {
	IGalleryImageItem,
	IGetApiParams,
} from "@/components/shared/types/interface";
import { Skeleton } from "@/components/shared/shadcn/ui/skeleton";
import { cn } from "@/components/lib/utils";
import { IMAGES } from "@/components/shared/constants/images";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/shared/shadcn/ui/button";
import { HomeIcon, UploadIcon } from "@radix-ui/react-icons";
import { FolderPlus } from "lucide-react";
import GalleryCard from "./GalleryCard";

interface Props {
	getImage: (data: IGalleryImageItem) => void;
	activeImage: IGalleryImageItem | null;
}

/**
 * @author Zholaman Zhumanov
 * @created 20.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo refactoring
 * @fixme
 * @param props
 * @constructor
 */
const GalleryImageView: React.FC<Props> = (props) => {
	const { getImage, activeImage } = props;

	const {
		updateBorderLoaderAction,
		getBorderDataAction,
		pathCurrentFolderAction,
	} = useDispatchAction();

	const { apiFetchHandler, loading } = useApiRequest();

	const { boardData } = useAppSelector((state) => state.board);
	const { folderData } = useAppSelector((state) => state.folder);
	const { pathCurrentFolder } = useAppSelector((state) => state.path);

	const { dialogUploadFileAction } = useDispatchAction();

	const { dialogCreateDirectoryAction } = useDispatchAction();

	const { dialogCreateDirectory, dialogUploadFile } = useAppSelector(
		(state) => state.dialog
	);

	const toggleDialogCreateDirectory = () =>
		dialogCreateDirectoryAction(!dialogCreateDirectory);
	const toggleDialogUploadFileAction = () =>
		dialogUploadFileAction(!dialogUploadFile);

	const fetchBoardImageData = async () => {
		await apiFetchHandler(
			apiMethodGet,
			updateBorderLoaderAction,
			{
				onGetData: (params: IGetApiParams) => {
					if (params.success) {
						getBorderDataAction(params.data.files);
					}
				},
			},
			[pathCurrentFolder]
		);
	};

	useEffect(() => {
		fetchBoardImageData();
	}, [pathCurrentFolder, folderData]);

	return (
		<div
			className={cn(
				"w-full bg-secondary overflow-y-auto flex flex-col pb-20"
			)}
			style={{ height: "calc(700px - 50px)" }}
		>
			<div className={cn("w-full mb-10 h-auto mt-5 py-3")}>
				<div className="w-full h-auto flex gap-3 border-b pb-3 justify-between px-3">
					<Button
						variant="outline"
						className="gap-2 text-xs"
						onClick={() => {
							pathCurrentFolderAction("/");
						}}
					>
						Главная <HomeIcon />
					</Button>

					<div className={cn("flex items-center gap-2")}>
						<Button
							onClick={toggleDialogCreateDirectory}
							variant="outline"
							className="gap-2 text-xs"
						>
							Новая папка <FolderPlus />
						</Button>
						<Button
							onClick={toggleDialogUploadFileAction}
							className="gap-2 text-xs"
						>
							Загрузить <UploadIcon />
						</Button>
					</div>
				</div>
			</div>
			{boardData.length === 0 && !loading && (
				<div
					className={cn(
						"flex w-full h-full items-center justify-center"
					)}
				>
					<div
						className={cn(
							"w-full flex justify-center flex-col items-center my-10 h-full"
						)}
					>
						<Image
							src={IMAGES.ICON.folder}
							alt="empty page"
							width={60}
							height={50}
						/>
					</div>
				</div>
			)}

			{loading ? (
				<div className={cn("grid grid-cols-3 gap-4 grid-flow-dense")}>
					<Skeleton className="h-[290px] w-full" />
					<Skeleton className="h-[290px] w-full" />
					<Skeleton className="h-[290px] w-full" />
					<Skeleton className="h-[290px] w-full" />
					<Skeleton className="h-[290px] w-full" />
					<Skeleton className="h-[290px] w-full" />
					<Skeleton className="h-[290px] w-full" />
					<Skeleton className="h-[290px] w-full" />
				</div>
			) : (
				<ul
					className={cn(
						"lg:columns-3 md:columns-2 columns-1 py-2 px-2 gap-4"
					)}
				>
					{boardData?.map(
						(data: IGalleryImageItem, index: number) => (
							<motion.li
								whileHover={{ scale: 1.03 }}
								key={index}
								className={cn("h-auto cursor-pointer")}
							>
								<GalleryCard
									src={data?.url}
									alt={data?.name}
									path={data.path}
									getImage={() => {
										getImage(data);
									}}
									title={data.name}
									activeImage={activeImage?.url === data.url}
								/>
							</motion.li>
						)
					)}
				</ul>
			)}
		</div>
	);
};

export default GalleryImageView;
