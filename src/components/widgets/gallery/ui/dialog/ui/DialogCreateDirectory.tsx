"use client";

import React, { useEffect } from "react";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { IGetApiParams } from "@/components/shared/types/interface";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useApiRequest from "@/components/shared/hooks/useApiRequest";
import {
	apiMethodCreateDir,
	apiMethodTree,
} from "@/components/shared/backend/requests/file/requests";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/shared/shadcn/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/shared/shadcn/ui/form";
import { Input } from "@/components/shared/shadcn/ui/input";
import { Button } from "@/components/shared/shadcn/ui/button";
import {cn} from "@/components/lib/utils";

/**
 * @created 12.06.2024
 * @description
 * @last-updated
 * @update-description
 * @todo refactoring
 * @fixme
 * @constructor
 */
const DialogCreateDirectory: React.FC = (): React.JSX.Element => {
	const {
		dialogCreateDirectoryAction,
		getFolderDataAction,
		updateFolderLoaderAction,
	} = useDispatchAction();

	const { loading, apiFetchHandler } = useApiRequest();

	const { pathCurrentFolder } = useAppSelector((state) => state.path);
	const { dialogCreateDirectory } = useAppSelector((state) => state.dialog);

	const toggleDialogCreateDirectory = () => {
		dialogCreateDirectoryAction(!dialogCreateDirectory);
	};

	const formSchema = z.object({
		path: z.string().min(1).max(100),
		name: z.string().min(3).max(100),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			path: pathCurrentFolder,
			name: "",
		},
	});

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для получения список папок
	 */
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

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для создания новой папки
	 */
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		await apiFetchHandler(
			apiMethodCreateDir,
			false,
			{
				onGetData: async (params: IGetApiParams) => {
					if (params.success) {
						toggleDialogCreateDirectory();
						await getTreeData();
						form.clearErrors();
					}
				},
			},
			[{ name: values.name, path: values.path }]
		);
	};

	useEffect(() => {
		form.reset({
			path: pathCurrentFolder,
			name: "",
		});
	}, [dialogCreateDirectory]);

	return (
		<Dialog
			open={dialogCreateDirectory}
			onOpenChange={toggleDialogCreateDirectory}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						<h2 className={cn("mb-2")}>Создание папки</h2>
					</DialogTitle>
					<DialogDescription>
						<p className={cn("mb-5")}>
							Чтобы создать папку введите название папки и путь
							папки
						</p>
					</DialogDescription>

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-8"
						>
							<FormField
								control={form.control}
								name="path"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Введите путь</FormLabel>
										<FormControl>
											<Input placeholder="/" {...field} />
										</FormControl>
										<FormDescription>
											Например: /1/2
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Введите название папки
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Я папка"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit" disabled={loading}>
								{loading ? (
									<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
								) : null}
								Создать
							</Button>
						</form>
					</Form>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default DialogCreateDirectory;
