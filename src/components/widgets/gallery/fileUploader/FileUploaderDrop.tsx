"use client";

import React, { useState } from "react";
import { Paperclip } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { IGetApiParams } from "@/components/shared/types/interface";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useApiRequest from "@/components/shared/hooks/useApiRequest";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import {
	apiMethodTree,
	apiMethodUploadFile,
} from "@/components/shared/backend/requests/file/requests";
import {
	FileInput,
	FileUploader,
	FileUploaderContent,
	FileUploaderItem,
} from "@/components/shared/shadcn/ui/file-uploader";
import { cn } from "@/components/lib/utils";
import { Button } from "@/components/shared/shadcn/ui/button";
import FileSvgDraw from "./FileSvgDraw";

interface Props {
	maxFiles: number;
	maxSize?: number;
	multiple: boolean;
	onAfterSend: () => void;
}

/**
 * @author Zholaman Zhumanov
 * @created 12.06.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const FileUploaderDrop: React.FC<Props> = (props) => {
	const {
		maxFiles = 1,
		maxSize = 1024 * 1024 * 4,
		multiple = false,
		onAfterSend,
	} = props;

	const { loading, apiFetchHandler } = useApiRequest();

	const { getFolderDataAction, updateFolderLoaderAction } =
		useDispatchAction();

	const { pathCurrentFolder } = useAppSelector((state) => state.path);

	const [files, setFiles] = useState<File[] | null>(null);

	const dropZoneConfig = {
		maxFiles,
		maxSize,
		multiple,
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

	const uploadFilesSubmit = async () => {
		await apiFetchHandler(
			apiMethodUploadFile,
			false,
			{
				onGetData: async (params: IGetApiParams) => {
					if (params.success) {
						onAfterSend();
						await getTreeData();
					}
				},
			},
			[files, pathCurrentFolder]
		);
	};

	return (
		<FileUploader
			value={files}
			onValueChange={setFiles}
			dropzoneOptions={dropZoneConfig}
			className="relative bg-background rounded-lg p-2"
		>
			<FileInput className="outline-dashed outline-1 outline-white">
				<div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
					<FileSvgDraw />
				</div>
			</FileInput>
			<FileUploaderContent>
				{files &&
					files.length > 0 &&
					files.map((file, i) => (
						<FileUploaderItem key={i} index={i}>
							<Paperclip className="h-4 w-4 stroke-current" />
							<span>{file.name}</span>
						</FileUploaderItem>
					))}
			</FileUploaderContent>

			<div className={cn("mt-2 w-full flex flex-col")}>
				<Button
					disabled={loading}
					type="button"
					onClick={uploadFilesSubmit}
					className={cn("mb-3.5")}
				>
					{loading ? (
						<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
					) : null}
					Отправить
				</Button>
				<Button
					disabled={loading}
					onClick={onAfterSend}
					variant="outline"
					type="button"
				>
					Отмена
				</Button>
			</div>
		</FileUploader>
	);
};

export default FileUploaderDrop;
