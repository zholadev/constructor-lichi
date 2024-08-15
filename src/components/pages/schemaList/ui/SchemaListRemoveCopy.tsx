import React from "react";
import { cn } from "@/components/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/shared/shadcn/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/shared/shadcn/ui/dialog";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { IGetApiParams } from "@/components/shared/types/interface";
import useApiRequest from "@/components/shared/hooks/useApiRequest";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useFetchSchemaListData from "@/components/shared/hooks/useFetchSchemaListData";
import {
	apiMethodSchemaCopy,
	apiMethodSchemaDelete,
} from "@/components/shared/backend/requests/schema/requests";
import PaperRemoveIcon from "@/components/shared/uikit/lottleIcons/PaperRemoveIcon";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import DocLottle from "@/components/shared/uikit/lottleIcons/DocLottle";

/**
 * @author Zholaman Zhumanov
 * @created 15.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const SchemaListRemoveCopy: React.FC = () => {
	const { apiFetchHandler, loading } = useApiRequest();

	const toastMessage = useToastMessage();

	const {
		dialogRemovePageAction,
		schemaListApiParamsIdAction,
		schemaListApiTypeAction,
	} = useDispatchAction();

	const fetchSchemaListData = useFetchSchemaListData();

	const { dialogRemovePage } = useAppSelector((state) => state.dialog);
	const { schemaListApiParamsId, schemaListApiType } = useAppSelector(
		(state) => state.schemaList
	);

	const toggleDialogHandle = () => dialogRemovePageAction(!dialogRemovePage);

	const onSubmit = async () => {
		if (!schemaListApiParamsId) {
			toastMessage("Отсутствует Id страницы", "error");
			return;
		}
		if (schemaListApiType === "initial") {
			toastMessage("Не выбран тип метода", "error");
			return;
		}
		await apiFetchHandler(
			schemaListApiType === "copy"
				? apiMethodSchemaCopy
				: apiMethodSchemaDelete,
			false,
			{
				onGetData: (params: IGetApiParams) => {
					if (params.success) {
						toggleDialogHandle();
						fetchSchemaListData();
						schemaListApiParamsIdAction(0);
						schemaListApiTypeAction("initial");
					}
				},
			},
			[schemaListApiParamsId]
		);
	};

	return (
		<Dialog open={dialogRemovePage} onOpenChange={toggleDialogHandle}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className={cn("text-sm text-center")}>
						{schemaListApiType === "copy"
							? "Вы уверены, что хотите сделать копию этой страницы?"
							: "Вы действительно хотите удалить страницу?"}
					</DialogTitle>
				</DialogHeader>
				<div className="flex items-center flex-col mb-3 mt-4 space-x-2">
					<div className={cn("mb-3.5")}>
						{schemaListApiType === "copy" ? (
							<DocLottle />
						) : (
							<PaperRemoveIcon />
						)}
					</div>
					<DialogFooter className="sm:justify-center w-full">
						<DialogClose asChild>
							<Button
								disabled={loading}
								type="button"
								className="text-xs"
								variant="secondary"
							>
								Отмена
							</Button>
						</DialogClose>

						<Button
							disabled={loading}
							onClick={onSubmit}
							className={cn("flex items-center gap-2 text-xs")}
						>
							{loading && (
								<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
							)}
							Подтвердить
						</Button>
					</DialogFooter>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default SchemaListRemoveCopy;
