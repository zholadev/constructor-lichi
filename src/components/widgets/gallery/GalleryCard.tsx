"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { DotsHorizontalIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Trash2Icon } from "lucide-react";
import { IGetApiParams } from "@/components/shared/types/interface";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useApiRequest from "@/components/shared/hooks/useApiRequest";
import {
	apiMethodRemove,
	apiMethodTree,
} from "@/components/shared/backend/requests/file/requests";
import { cn } from "@/components/lib/utils";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/shared/shadcn/ui/popover";
import { Button } from "@/components/shared/shadcn/ui/button";
import { AspectRatio } from "@/components/shared/shadcn/ui/aspect-ratio";

interface Props {
	src: string;
	alt: string;
	path: string;
	title: string;
	activeImage: boolean;
	getImage: () => void;
}

/**
 * @author Zholaman Zhumanov
 * @created 11.06.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const GalleryCard: React.FC<Props> = (props) => {
	const { src, alt, path, title, activeImage, getImage } = props;

	const imgRef = useRef<any>(null);

	const { getFolderDataAction, updateFolderLoaderAction } =
		useDispatchAction();

	const { loading, apiFetchHandler } = useApiRequest();

	const [popoverParams, setPopoverParams] = useState<boolean>(false);
	const [loader, setLoader] = useState<boolean>(false);

	const togglePopover = () => setPopoverParams(!popoverParams);

	const getTreeData = async () => {
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

	const fetchRemoveImage = async () => {
		await apiFetchHandler(
			apiMethodRemove,
			false,
			{
				onGetData: async (params: IGetApiParams) => {
					if (params.success) {
						await getTreeData();
						togglePopover();
					}
				},
			},
			[{ type: "file", object: path }]
		);
	};

	useEffect(() => {
		if (!imgRef?.current?.complete) {
			setLoader(true);
		}
	}, [imgRef.current]);

	return (
		<div
			className={cn(
				"delay-75 hover:shadow-md mb-4 bg-white border py-3 relative overflow-hidden break-inside-avoid h-auto rounded-md",
				activeImage ? "border-blue-400 border" : ""
			)}
		>
			<div className={cn("relative")}>
				<div className={cn("absolute top-1 right-2 z-30")}>
					<Popover open={popoverParams} onOpenChange={togglePopover}>
						<PopoverTrigger>
							<div
								className={cn(
									"w-[25px] h-[25px] bg-secondary rounded-full flex justify-center items-center"
								)}
							>
								<DotsHorizontalIcon />
							</div>
						</PopoverTrigger>
						<PopoverContent className={cn("w-max")}>
							<div
								className={cn(
									"flex flex-row items-center gap-3 justify-between"
								)}
							>
								<Button
									disabled={loading}
									onClick={fetchRemoveImage}
									variant="destructive"
									className={cn(
										"flex items-center flex-row gap-3"
									)}
								>
									{loading ? (
										<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
									) : (
										<div
											className={cn(
												"flex items-center gap-1 flex-row"
											)}
										>
											<Trash2Icon /> <span>Удалить</span>
										</div>
									)}
								</Button>
							</div>
						</PopoverContent>
					</Popover>
				</div>
				{!loader ? (
					<AspectRatio ratio={9 / 16} className="bg-muted">
						<Image
							src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
							alt={alt}
							width={350}
							height={450}
							className="rounded-md h"
						/>
					</AspectRatio>
				) : (
					<AspectRatio ratio={5 / 4}>
						<img
							src={src}
							ref={imgRef}
							alt={alt}
							className={cn(
								"object-contain w-full max-w-full h-full align-middle inline-block"
							)}
							loading="lazy"
							onClick={() => {
								getImage();
							}}
						/>
					</AspectRatio>
				)}

				<h3 className={cn("p-2")}>{title}</h3>
			</div>
		</div>
	);
};

export default GalleryCard;
