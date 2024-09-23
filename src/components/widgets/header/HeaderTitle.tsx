"use client";

import React from "react";
import { cn } from "@/components/lib/utils";
import { ArrowLeftIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/shared/shadcn/ui/button";
import { useRouter } from "next/navigation";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import HeaderDeviceType from "@/components/widgets/header/HeaderDeviceType";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import DialogContainer from "@/components/widgets/dialog/DialogContainer";
import RenamePage from "@/components/entities/actions/RenamePage";

interface Props {
	title: string;
}

/**
 * @author Zholaman Zhumanov
 * @created 19.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const HeaderTitle: React.FC<Props> = (props) => {
	const { title = "Untitled" } = props;

	const dialog = useDialogAction();
	const { spaceModePlatformTypeAction } = useDispatchAction();

	const router = useRouter();

	return (
		<div className={cn("text-sm flex items-center gap-2")}>
			<Button
				onClick={() => {
					router.push("/");
					spaceModePlatformTypeAction(null);
				}}
				tabIndex={0}
				type="button"
				variant="outline"
			>
				<ArrowLeftIcon />
			</Button>
			<div className={cn("flex items-center gap-3")}>
				<span className={cn("text-gray-400")}>Страница: </span> {title}
				<Button
					type="button"
					variant="ghost"
					size="icon"
					onClick={() => dialog.dialogRenameTitle.toggle()}
				>
					<Pencil2Icon />
				</Button>
			</div>

			<HeaderDeviceType />

			<DialogContainer
				open={dialog.dialogRenameTitle.open}
				toggle={dialog.dialogRenameTitle.toggle}
				title="Переименование название"
			>
				<RenamePage
					name=""
					confirmAction={dialog.dialogRenameTitle.toggle}
				/>
			</DialogContainer>
		</div>
	);
};

export default HeaderTitle;
