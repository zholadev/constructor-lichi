"use client";

import React from "react";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/shared/shadcn/ui/dialog";
import { cn } from "@/components/lib/utils";
import FileUploaderDrop from "../fileUploader/FileUploaderDrop";

/**
 * @author Zholaman Zhumanov
 * @created 12.06.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const DialogUploadFile = (): React.JSX.Element => {
	const { dialogUploadFileAction } = useDispatchAction();

	const { dialogUploadFile } = useAppSelector((state) => state.dialog);

	const toggleDialogUploadFileAction = () =>
		dialogUploadFileAction(!dialogUploadFile);

	return (
		<Dialog
			open={dialogUploadFile}
			onOpenChange={toggleDialogUploadFileAction}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						<h2 className={cn("mb-2")}>Загрузка файла</h2>
					</DialogTitle>

					<FileUploaderDrop
						onAfterSend={toggleDialogUploadFileAction}
						maxFiles={1}
						multiple={false}
					/>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default DialogUploadFile;
