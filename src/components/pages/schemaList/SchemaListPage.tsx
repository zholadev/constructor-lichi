"use client";

import React, { useEffect } from "react";
import { cn } from "@/components/lib/utils";
import { Skeleton } from "@/components/shared/shadcn/ui/skeleton";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useFetchSchemaListData from "@/components/shared/hooks/useFetchSchemaListData";
import ThemeModeToggle from "@/components/entities/packages/theme/switch/ThemeModeToggle";
import SchemaListPageCreate from "./SchemaListPageCreate";
import SchemaListTableData from "./SchemaListTableData";

/**
 * @author Zholaman Zhumanov
 * @created 14.08.2024
 * @description Главный компонент для вывода список страниц
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const SchemaListPage: React.FC = () => {
	const { schemaListApiParamsPageAction } = useDispatchAction();

	const fetchSchemaListData = useFetchSchemaListData();

	const { schemaListData, schemaListApiLoading, schemaListApiParamsPage } =
		useAppSelector((state) => state.schemaList);

	const changePageHandle = (value: string | number) =>
		schemaListApiParamsPageAction(value);

	useEffect(() => {
		fetchSchemaListData(schemaListData.data.length === 0);
	}, [schemaListApiParamsPage]);

	return (
		<div className={cn("size-full")}>
			<div
				className={cn(
					"mt-5 mb-10 flex items-center justify-between gap-10"
				)}
			>
				<h2 className={cn("uppercase")}>Lichi | Constructor</h2>

				<div className={cn("flex items-center gap-3 ")}>
					<SchemaListPageCreate />
					<ThemeModeToggle />
				</div>
			</div>

			<div>
				{schemaListApiLoading ? (
					<div>
						{Array.from({ length: 10 }).map((_, index) => (
							<Skeleton
								key={index}
								className="h-[45px] w-full mb-1"
							/>
						))}
					</div>
				) : (
					<SchemaListTableData
						data={schemaListData.data}
						pageValue={schemaListApiParamsPage}
						changePageHandle={changePageHandle}
						pagination={schemaListData.pagination}
					/>
				)}
			</div>
		</div>
	);
};

export default SchemaListPage;
