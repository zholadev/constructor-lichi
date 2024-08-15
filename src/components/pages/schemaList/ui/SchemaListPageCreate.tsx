"use client";

import React from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/shared/shadcn/ui/dialog";
import { Button } from "@/components/shared/shadcn/ui/button";
import { Input } from "@/components/shared/shadcn/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/shared/shadcn/ui/form";
import useApiRequest from "@/components/shared/hooks/useApiRequest";
import { apiMethodSchemaCreate } from "@/components/shared/backend/requests/schema/requests";
import { IGetApiParams } from "@/components/shared/types/interface";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/components/lib/utils";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useFetchSchemaListData from "@/components/shared/hooks/useFetchSchemaListData";

const FormSchema = z.object({
	name: z.string().min(2, {
		message: "Название страницы должно состоять минимум из 2 символов.",
	}),
});

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
const SchemaListPageCreate: React.FC = (): React.JSX.Element => {
	const { apiFetchHandler, loading } = useApiRequest();

	const { dialogCreatePageAction } = useDispatchAction();

	const fetchSchemaListData = useFetchSchemaListData();

	const { dialogCreatePage } = useAppSelector((state) => state.dialog);

	const toggleDialogHandle = () => dialogCreatePageAction(!dialogCreatePage);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		await apiFetchHandler(
			apiMethodSchemaCreate,
			false,
			{
				onGetData: (params: IGetApiParams) => {
					if (params.success) {
						toggleDialogHandle();
						fetchSchemaListData();
					}
				},
			},
			[data.name]
		);
	};

	return (
		<Dialog open={dialogCreatePage} onOpenChange={toggleDialogHandle}>
			<Button onClick={toggleDialogHandle}>Создать страницу</Button>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className={cn("text-md")}>Создать новую страницу</DialogTitle>
				</DialogHeader>
				<div className="flex items-center mb-3 mt-4 space-x-2">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-full space-y-6"
						>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder="Введите название страницы"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<DialogFooter className="sm:justify-end">
								<DialogClose asChild>
									<Button
										disabled={loading}
										type="button"
										variant="secondary"
										className="text-xs"
									>
										Отмена
									</Button>
								</DialogClose>

								<Button
									disabled={loading}
									type="submit"
									className={cn("flex items-center gap-2 text-xs")}
								>
									{loading && (
										<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
									)}
									Подтвердить
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default SchemaListPageCreate;
