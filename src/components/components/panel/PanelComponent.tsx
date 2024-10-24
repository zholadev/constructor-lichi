"use client";

import React from "react";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/shared/shadcn/ui/tabs";
import { cn } from "@/components/lib/utils";
import ElementBaseContainer from "@/components/components/elements/ElementBaseContainer";
import ElementSpecialContainer from "@/components/components/elements/ElementSpecialContainer";
import {
	Component1Icon,
	Component2Icon,
	LayersIcon,
} from "@radix-ui/react-icons";
import Navigator from "@/components/components/panel/navigator/Navigator";
import usePreviewMode from "@/components/shared/hooks/usePreviewMode";
import ComponentContent from "./components/ComponentContent";

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
const PanelComponent: React.FC = () => {
	const previewMode = usePreviewMode();

	if (previewMode.previewModeEditor) {
		return null;
	}

	return (
		<div
			className={cn("w-full max-w-[345px] border")}
			style={{ height: "calc(100vh - 60px)" }}
		>
			<Tabs defaultValue="components" className="w-full">
				<div className={cn("p-2")}>
					<TabsList
						className={cn("w-full justify-start rounded-none")}
					>
						<TabsTrigger value="components">
							<div
								className={cn(
									"flex items-center text-xs flex-row gap-1"
								)}
							>
								<Component1Icon />
								<span>Компоненты</span>
							</div>
						</TabsTrigger>
						<TabsTrigger value="elements">
							<div
								className={cn(
									"flex items-center text-xs flex-row gap-1"
								)}
							>
								<Component2Icon />
								<span>Элементы</span>
							</div>
						</TabsTrigger>
						<TabsTrigger value="layers">
							<div
								className={cn(
									"flex items-center text-xs flex-row gap-1"
								)}
							>
								<LayersIcon />
								<span>Навигатор</span>
							</div>
						</TabsTrigger>
					</TabsList>
				</div>
				<div className={cn("p-3")}>
					<TabsContent value="components">
						<ComponentContent />
					</TabsContent>
					<TabsContent value="elements">
						<ElementBaseContainer />
						<ElementSpecialContainer />
					</TabsContent>
					<TabsContent value="layers">
						<Navigator />
					</TabsContent>
				</div>
			</Tabs>
		</div>
	);
};

export default PanelComponent;
