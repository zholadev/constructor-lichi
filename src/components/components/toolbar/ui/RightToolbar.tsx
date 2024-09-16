"use client";

import React, { useMemo } from "react";
import { cn } from "@/components/lib/utils";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/shared/shadcn/ui/tabs";
import DesignContent from "@/components/components/design/ui/DesignContent";
import SettingContainer from "@/components/components/design/ui/SettingContainer";
import { Bolt, BookImage, Paintbrush } from "lucide-react";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";

interface Props {}

/**
 * @author Zholaman Zhumanov
 * @created 20.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const RightToolbar: React.FC<Props> = (props) => {
	const {} = props;

	const { editorActiveElement } = useAppSelector((state) => state.editor);

	const imageContent = useMemo(() => {
		try {
			const findImage = editorActiveElement.componentData?.content?.photo;
			return {
				desktop: findImage?.desktop,
				tablet: findImage?.tablet,
				mobile: findImage?.mobile,
			};
		} catch (error) {
			if (error instanceof Error) {
				errorHandler("RightToolbar", "imageContent", error);
			}
		}
	}, [editorActiveElement]);

	return (
		<div
			className={cn("w-[420px] border")}
			style={{ height: "calc(100vh - 60px)" }}
		>
			<Tabs defaultValue="styles" className="w-full">
				<div className={cn("p-2")}>
					<TabsList
						className={cn("w-full justify-start rounded-none")}
					>
						<TabsTrigger value="styles">
							<div
								className={cn(
									"flex text-xs items-center flex-row gap-1"
								)}
							>
								<Paintbrush width={15} height={15} />
								<span>Стилизация</span>
							</div>
						</TabsTrigger>
						<TabsTrigger value="content">
							<div
								className={cn(
									"flex text-xs items-center flex-row gap-1"
								)}
							>
								<BookImage width={15} height={15} />
								<span>Контент</span>
							</div>
						</TabsTrigger>
						<TabsTrigger value="settings">
							<div
								className={cn(
									"flex text-xs items-center flex-row gap-1"
								)}
							>
								<Bolt width={15} height={15} />
								<span>Настройки</span>
							</div>
						</TabsTrigger>
					</TabsList>
				</div>
				<div
					className={cn("p-2 overflow-hidden")}
					style={{ height: "calc(100vh - 60px)" }}
				>
					<TabsContent
						value="styles"
						className={cn("overflow-y-auto")}
						style={{ height: "calc(100vh - 120px)" }}
					>
						<DesignContent />
					</TabsContent>
					<TabsContent
						value="content"
						className={cn("overflow-y-auto")}
						style={{ height: "calc(100vh - 100px)" }}
					>
						<SettingContainer />
					</TabsContent>
				</div>
			</Tabs>
		</div>
	);
};

export default RightToolbar;
