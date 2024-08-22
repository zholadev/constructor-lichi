import React, { useEffect } from "react";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useApiRequest from "@/components/shared/hooks/useApiRequest";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { apiMethodGet } from "@/components/shared/backend/requests/file/requests";
import { IGetApiParams } from "@/components/shared/types/interface";
import { Skeleton } from "@/components/shared/shadcn/ui/skeleton";
import { cn } from "@/components/lib/utils";
import { IMAGES } from "@/components/shared/constants/images";
import Image from "next/image";
import GalleryCard from "./GalleryCard";

interface Props {}

interface IDataItem {
	url: string;
	size: number;
	created: number;
	extension: string;
	info: {
		width: number;
		height: number;
		luminance: number;
	};
	name: string;
	path: string;
	public_url: string;
}

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
const GalleryImageView: React.FC<Props> = (props) => {
	const {} = props;

	const { updateBorderLoaderAction, getBorderDataAction } =
		useDispatchAction();

	const { apiFetchHandler, loading } = useApiRequest();

	const { boardData } = useAppSelector((state) => state.board);
	const { folderData } = useAppSelector((state) => state.folder);
	const { pathCurrentFolder } = useAppSelector((state) => state.path);

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
			className={cn("w-full overflow-y-auto flex flex-col pb-20")}
			style={{ height: "calc(700px - 50px)" }}
		>
			{boardData.length === 0 && (
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
						"lg:columns-3 md:columns-2 columns-1 py-2 px-2 gap-4 bg-secondary"
					)}
				>
					{boardData?.map((data: IDataItem, index: number) => (
						<li key={index} className={cn("h-auto")}>
							<GalleryCard
								src={data?.url}
								url={data?.url}
								alt={data?.name}
								path={data.path}
								index={index}
								size={data.size}
								title={data.name}
								publicUrl={data.public_url}
							/>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default GalleryImageView;
