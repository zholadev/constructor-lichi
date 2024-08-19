import * as React from "react";
import {
	IActiveCountry,
	ISchemaListItem,
	ISchemaListPagination,
} from "@/components/shared/types/interface";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/shared/shadcn/ui/table";
import { Badge } from "@/components/shared/shadcn/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/shared/shadcn/ui/button";
import { ArrowRightIcon, CopyIcon, TrashIcon } from "@radix-ui/react-icons";
import { cn } from "@/components/lib/utils";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import SchemaListRemoveCopy from "@/components/pages/schemaList/ui/SchemaListRemoveCopy";
import { TypeMethodSchema } from "@/components/shared/types/types";
import SchemaListPageActivate from "@/components/pages/schemaList/ui/SchemaListPageActivate";
import SchemaListSelectPlatform from "@/components/pages/schemaList/ui/SchemaListSelectPlatform";
import SchemaListTablePagination from "./SchemaListTablePagination";

interface Props {
	pagination: ISchemaListPagination;
	data: ISchemaListItem[];
	pageValue?: string | number;
	changePageHandle?: (value: string | number) => void;
}

/**
 * @author Zholaman Zhumanov
 * @created 14.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo refactoring
 * @fixme
 * @param props
 * @constructor
 */
const SchemaListTableData: React.FC<Props> = (props) => {
	const { data, pagination, pageValue, changePageHandle } = props;

	const {
		dialogRemovePageAction,
		schemaListApiParamsIdAction,
		schemaListApiTypeAction,
		dialogActivatePageAction,
		dialogPlatformTypeAction,
		spaceTemplatePageIdAction,
	} = useDispatchAction();

	const { dialogRemovePage, dialogActivatePage, dialogPlatformType } =
		useAppSelector((state) => state.dialog);

	const toggleDialogPlatformHandle = (id: number) => {
		dialogPlatformTypeAction(!dialogPlatformType);
		spaceTemplatePageIdAction(id);
	};

	const toggleRemoveCopyDialogHandle = (
		id: number,
		typeMethod: TypeMethodSchema
	) => {
		dialogRemovePageAction(!dialogRemovePage);
		schemaListApiParamsIdAction(id);
		schemaListApiTypeAction(typeMethod);
	};

	const toggleActivateDialogHandle = (id: number) => {
		dialogActivatePageAction(!dialogActivatePage);
		schemaListApiParamsIdAction(id);
	};

	if (!data) {
		return null;
	}

	return (
		<div className="w-full">
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[50px]">#</TableHead>
							<TableHead className="w-max-[400px]">
								Наименование
							</TableHead>
							<TableHead>Активен</TableHead>
							<TableHead>Дата создания</TableHead>
							<TableHead>Автор</TableHead>
							<TableHead>Действия</TableHead>
							<TableHead />
							<TableHead />
							<TableHead />
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.map((page: ISchemaListItem) => (
							<TableRow key={page.hp_guid}>
								<TableCell className="font-medium text-muted-foreground">
									{page.hp_id}
								</TableCell>
								<TableCell className="font-medium">
									{page.hp_name}
								</TableCell>
								<TableCell>
									<div className="flex items-center flex-wrap gap-1">
										{page.hp_active?.map(
											(item: IActiveCountry) => (
												<Badge key={item.id}>
													{item.name}
												</Badge>
											)
										)}
									</div>
								</TableCell>
								<TableCell>
									{format(
										page.hp_created || new Date(),
										"dd.MM.yyyy"
									)}
								</TableCell>
								<TableCell>{page.hp_user.name}</TableCell>
								<TableCell>
									<Button
										variant="outline"
										className={
											(cn(
												"flex items-center gap-1 text-xs"
											),
											page.hp_active.length > 0
												? "bg-green-400 w-[140px]"
												: "w-[140px]")
										}
										onClick={() =>
											toggleActivateDialogHandle(
												page.hp_id
											)
										}
										disabled={page.hp_active.length > 0}
									>
										{page.hp_active.length > 0
											? "Активен"
											: "Активировать"}
									</Button>
								</TableCell>
								<TableCell>
									<Button
										variant="destructive"
										className={
											(cn(
												"flex items-center gap-1 text-xs"
											),
											page.hp_active.length > 0
												? "cursor-no-drop"
												: "")
										}
										disabled={page.hp_active.length > 0}
										onClick={() => {
											toggleRemoveCopyDialogHandle(
												page.hp_id,
												"remove"
											);
										}}
									>
										<TrashIcon />
									</Button>
								</TableCell>
								<TableCell>
									<Button
										variant="outline"
										className="flex items-center gap-1 text-xs"
										onClick={() => {
											toggleRemoveCopyDialogHandle(
												page.hp_id,
												"copy"
											);
										}}
									>
										<CopyIcon />
									</Button>
								</TableCell>
								<TableCell>
									<Button
										variant="secondary"
										onClick={() =>
											toggleDialogPlatformHandle(
												page.hp_id
											)
										}
										className="flex items-center gap-1 text-xs"
									>
										Перейти <ArrowRightIcon />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			{pagination.max_page > 1 && (
				<SchemaListTablePagination
					pageValue={pageValue || pagination.page}
					changePageHandle={changePageHandle}
					maxPage={pagination.max_page}
				/>
			)}

			<SchemaListSelectPlatform />
			<SchemaListRemoveCopy />
			<SchemaListPageActivate />
		</div>
	);
};

export default SchemaListTableData;
