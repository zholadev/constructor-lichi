"use client";

import React from "react";
import { cn } from "@/components/lib/utils";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/shared/shadcn/ui/tabs";
import { Bolt, BookImage, Paintbrush } from "lucide-react";
import StylesContainer from "@/components/components/panel/container/StylesContainer";
import ContentContainer from "@/components/components/panel/container/ContentContainer";
import SettingContainer from "@/components/components/panel/container/SettingContainer";

interface Props {
	isStatic?: boolean;
}

/**
 * @author Zholaman Zhumanov
 * @created 20.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const PanelContent: React.FC<Props> = (props) => {
	const { isStatic = false } = props;

	return (
		<div
			className={cn(`w-[340px] border ${isStatic ? "bg-white" : ""}`)}
			style={{ height: isStatic ? "100%" : "calc(100vh - 60px)" }}
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
					style={{ height: isStatic ? "100%" : "calc(100vh - 60px)" }}
				>
					<TabsContent
						value="styles"
						className={cn("overflow-y-auto")}
						style={{
							height: isStatic ? "100%" : "calc(100vh - 120px)",
						}}
					>
						<StylesContainer />
					</TabsContent>
					<TabsContent
						value="content"
						className={cn("overflow-y-auto")}
						style={{
							height: isStatic ? "100%" : "calc(100vh - 100px)",
						}}
					>
						<ContentContainer />
					</TabsContent>
					<TabsContent
						value="settings"
						className={cn("overflow-y-auto")}
						style={{
							height: isStatic ? "100%" : "calc(100vh - 120px)",
						}}
					>
						<SettingContainer />
					</TabsContent>
				</div>
			</Tabs>
		</div>
	);
};

export default PanelContent;
