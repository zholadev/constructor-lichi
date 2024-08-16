import React from "react";
import useApiRequest from "@/components/shared/hooks/useApiRequest";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useFetchSchemaListData from "@/components/shared/hooks/useFetchSchemaListData";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiMethodSchemaSetActive } from "@/components/shared/backend/requests/schema/requests";
import {
	IGetApiParams,
	IShopsListDataItem,
} from "@/components/shared/types/interface";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/shared/shadcn/ui/dialog";
import { Button } from "@/components/shared/shadcn/ui/button";
import { cn } from "@/components/lib/utils";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/shared/shadcn/ui/form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Checkbox } from "@/components/shared/shadcn/ui/checkbox";

interface Props {}

const FormSchema = z.object({
	countries: z
		.array(z.string())
		.nonempty("Вы должны выбрать хотя бы одну страну.")
		.min(1, "Вы должны выбрать хотя бы одну страну."),
});

/**
 * @author Zholaman Zhumanov
 * @created 16.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const SchemaListPageActivate: React.FC<Props> = (props) => {
	const { apiFetchHandler, loading } = useApiRequest();

	const { dialogActivatePageAction } = useDispatchAction();

	const fetchSchemaListData = useFetchSchemaListData();

	const { dialogActivatePage } = useAppSelector((state) => state.dialog);
	const { shopsData } = useAppSelector((state) => state.app);
	const { schemaListApiParamsId } = useAppSelector(
		(state) => state.schemaList
	);

	const toggleDialogHandle = () => {
		dialogActivatePageAction(!dialogActivatePage);
		form.reset();
	};

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			countries: [],
		},
	});

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		await apiFetchHandler(
			apiMethodSchemaSetActive,
			false,
			{
				onGetData: (params: IGetApiParams) => {
					if (params.success) {
						toggleDialogHandle();
						fetchSchemaListData();
						form.reset();
					}
				},
			},
			[data.countries, schemaListApiParamsId]
		);
	};

	return (
		<Dialog open={dialogActivatePage} onOpenChange={toggleDialogHandle}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className={cn("text-sm")}>
						Выберите страны, чтобы запустить страницу
					</DialogTitle>
				</DialogHeader>
				<div className="flex items-center mb-3 mt-4 space-x-2">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-full space-y-6"
						>
							<FormField
								control={form.control}
								name="countries"
								render={({ field }) => (
									<FormItem
										className={cn(
											"grid grid-cols-2 gap-2 items-center"
										)}
									>
										{shopsData.map(
											(shop: IShopsListDataItem) => {
												return (
													<FormControl key={shop.id}>
														<span
															className={cn(
																"flex items-center gap-1 text-sm"
															)}
														>
															<Checkbox
																checked={field.value.includes(
																	shop.id
																)}
																id={shop.id}
																onCheckedChange={(
																	checked
																) => {
																	if (
																		checked
																	) {
																		field.onChange(
																			[
																				...field.value,
																				shop.id,
																			]
																		);
																	} else {
																		field.onChange(
																			field.value.filter(
																				(
																					name
																				) =>
																					name !==
																					shop.id
																			)
																		);
																	}
																}}
															/>
															<div className="grid gap-1.5 leading-none">
																<label
																	id={shop.id}
																	className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
																>
																	{shop.name}
																</label>
															</div>
														</span>
													</FormControl>
												);
											}
										)}
										<FormMessage />
									</FormItem>
								)}
							/>
							<DialogFooter className="sm:justify-end mt-3 pt-5 border-t">
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
									className={cn(
										"flex items-center gap-2 text-xs"
									)}
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

export default SchemaListPageActivate;
