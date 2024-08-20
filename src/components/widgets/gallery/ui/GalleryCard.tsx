"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
	CopyIcon,
	DotsHorizontalIcon,
	DownloadIcon,
	ReloadIcon,
} from "@radix-ui/react-icons";
import { Trash2Icon } from "lucide-react";
import { IGetApiParams } from "@/components/shared/types/interface";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
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
	url: string;
	path: string;
	size: number;
	title: string;
	publicUrl: string;
}

const ZoomImage = dynamic(
	() => import("@/components/shared/uikit/zoom/ui/ZoomImage"),
	{ ssr: false }
);

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
	const { src, alt, url, path, size, title, publicUrl } = props;

	const imgRef = useRef<any>(null);

	const { getFolderDataAction, updateFolderLoaderAction } =
		useDispatchAction();

	const toastMessage = useToastMessage();

	const { loading, apiFetchHandler } = useApiRequest();

	const [popoverParams, setPopoverParams] = useState<boolean>(false);
	const [loader, setLoader] = useState<boolean>(false);

	const togglePopover = () => setPopoverParams(!popoverParams);

	const copyToClipboard = useCallback(
		(text: string) => {
			navigator.clipboard
				.writeText(text)
				.then(() => {
					toastMessage("Ссылка скопирована в буфер обмена!", "info");
				})
				.catch((err) => {
					console.error("Ошибка при копировании: ", err);
				});
		},
		[url, publicUrl]
	);

	const handleDownloadImage = (): void => {
		try {
			const link = document.createElement("a");
			const downloadLink = url.split("/");

			link.href = url;
			link.target = "_blank";
			link.download = downloadLink[downloadLink.length - 1];
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			toastMessage("Картинка успешно загружена!", "success");
		} catch (error) {
			if (error instanceof Error) {
				console.error("Ошибка при скачивание фото: ", error);
				toastMessage("Ошибка при скачивание фото!", "error");
			}
		}
	};

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
				"delay-75 hover:shadow-md mb-4 relative overflow-hidden break-inside-avoid h-auto rounded-md"
			)}
		>
			<div className={cn("relative")}>
				{/* <div className={cn("absolute top-5 right-5 z-30")}> */}
				{/*	<Popover open={popoverParams} onOpenChange={togglePopover}> */}
				{/*		<PopoverTrigger> */}
				{/*			<div */}
				{/*				className={cn( */}
				{/*					"w-[30px] h-[30px] bg-secondary rounded-full flex justify-center items-center" */}
				{/*				)} */}
				{/*			> */}
				{/*				<DotsHorizontalIcon /> */}
				{/*			</div> */}
				{/*		</PopoverTrigger> */}
				{/*		<PopoverContent className={cn("w-max")}> */}
				{/*			<div */}
				{/*				className={cn( */}
				{/*					"flex flex-row items-center gap-3 justify-between" */}
				{/*				)} */}
				{/*			> */}
				{/*				<div className={cn("text-xs")}> */}
				{/*					<h3>{byteToMbConverter(size)}</h3> */}
				{/*				</div> */}
				{/*				<div className={cn("border-r w-1 h-full")} /> */}

				{/*				<Button */}
				{/*					onClick={() => { */}
				{/*						handleDownloadImage(); */}
				{/*						togglePopover(); */}
				{/*					}} */}
				{/*					variant="outline" */}
				{/*					className={cn( */}
				{/*						"flex items-center flex-row gap-3" */}
				{/*					)} */}
				{/*				> */}
				{/*					<DownloadIcon /> */}
				{/*				</Button> */}
				{/*				<Button */}
				{/*					disabled={loading} */}
				{/*					onClick={fetchRemoveImage} */}
				{/*					variant="destructive" */}
				{/*					className={cn( */}
				{/*						"flex items-center flex-row gap-3" */}
				{/*					)} */}
				{/*				> */}
				{/*					{loading ? ( */}
				{/*						<ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> */}
				{/*					) : ( */}
				{/*						<Trash2Icon /> */}
				{/*					)} */}
				{/*				</Button> */}
				{/*			</div> */}

				{/*			<div className={cn("flex gap-3 mt-2 flex-col")}> */}
				{/*				<Button */}
				{/*					onClick={() => { */}
				{/*						copyToClipboard(url); */}
				{/*						togglePopover(); */}
				{/*					}} */}
				{/*					variant="outline" */}
				{/*					className={cn("gap-3")} */}
				{/*				> */}
				{/*					local <CopyIcon /> */}
				{/*				</Button> */}

				{/*				<Button */}
				{/*					onClick={() => { */}
				{/*						copyToClipboard(publicUrl); */}
				{/*						togglePopover(); */}
				{/*					}} */}
				{/*					variant="outline" */}
				{/*					className={cn("gap-3")} */}
				{/*				> */}
				{/*					prod <CopyIcon /> */}
				{/*				</Button> */}

				{/*				<Button */}
				{/*					onClick={() => { */}
				{/*						copyToClipboard(path); */}
				{/*						togglePopover(); */}
				{/*					}} */}
				{/*					variant="outline" */}
				{/*					className={cn("gap-3")} */}
				{/*				> */}
				{/*					path <CopyIcon /> */}
				{/*				</Button> */}
				{/*			</div> */}
				{/*		</PopoverContent> */}
				{/*	</Popover> */}
				{/* </div> */}
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
					// <ZoomImage>
					<img
						src={src}
						ref={imgRef}
						alt={alt}
						className="rounded-md object-cover w-full max-w-full h-full align-middle inline-block"
						loading="lazy"
					/>
					// </ZoomImage>
				)}

				<h3 className={cn("absolute top-1.5 left-2 text-white")}>
					{title}
				</h3>
			</div>
		</div>
	);
};

export default GalleryCard;
