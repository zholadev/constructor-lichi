"use client";

import React from "react";
import { Button } from "@/components/shared/shadcn/ui/button";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import { cn } from "@/components/lib/utils";

interface Props {
	changePageHandle?: (value: string | number) => void;
	pageValue: string | number;
	maxPage: string | number;
}
/**
 * @author Zholaman Zhumanov
 * @created 14.08.2024
 * @todo refactoring
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const SchemaTablePagination: React.FC<Props> = ({
	changePageHandle,
	pageValue,
	maxPage,
}): React.JSX.Element => {
	const prevPage = () => {
		try {
			if (changePageHandle) {
				changePageHandle(Number(pageValue) - 1);
			}
		} catch (error) {
			errorHandler("tablePageDataPagination", "prevPage", error);
		}
	};

	const nextPage = () => {
		try {
			if (changePageHandle) {
				changePageHandle(Number(pageValue) + 1);
			}
		} catch (error) {
			errorHandler("tablePageDataPagination", "nextPage", error);
		}
	};

	const selectFirstPage = () => {
		try {
			if (changePageHandle) {
				changePageHandle(1);
			}
		} catch (error) {
			errorHandler("tablePageDataPagination", "selectFirstPage", error);
		}
	};

	const selectLastPage = () => {
		try {
			if (changePageHandle) {
				changePageHandle(maxPage);
			}
		} catch (error) {
			errorHandler("tablePageDataPagination", "selectLastPage", error);
		}
	};

	return (
		<div className="flex md:items-center lg:flex-row flex-col justify-end px-2 py-4 border-t">
			<div className="flex md:items-center md:flex-row flex-col gap-4">
				<div className={cn("flex items-center flex-row gap-3")}>
					<div className="flex w-[100px] items-center text-sm font-medium">
						Page {pageValue} of {maxPage}
					</div>

					<div className="flex items-center space-x-2">
						<Button
							variant="outline"
							className="hidden h-8 w-8 p-0 lg:flex"
							onClick={selectFirstPage}
							disabled={pageValue === 1}
						>
							<span className="sr-only">Go to first page</span>
							<DoubleArrowLeftIcon className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							className="h-8 w-8 p-0"
							onClick={prevPage}
							disabled={pageValue === 1}
						>
							<span className="sr-only">Go to previous page</span>
							<ChevronLeftIcon className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							className="h-8 w-8 p-0"
							onClick={nextPage}
						>
							<span className="sr-only">Go to next page</span>
							<ChevronRightIcon className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							className="hidden h-8 w-8 p-0 lg:flex"
							onClick={selectLastPage}
							disabled={pageValue === maxPage}
						>
							<span className="sr-only">Go to last page</span>
							<DoubleArrowRightIcon className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SchemaTablePagination;
