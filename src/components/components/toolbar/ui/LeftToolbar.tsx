"use client";

import React from "react";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/shared/shadcn/ui/tabs";
import { cn } from "@/components/lib/utils";
import BlockContainer from "@/components/components/blocks/ui/BlockContainer";
import BaseElementContainer from "@/components/components/elements/ui/BaseElementContainer";
import SpecialElementContainer from "@/components/components/elements/ui/SpecialElementContainer";
import {
	Component1Icon,
	Component2Icon,
	LayersIcon,
} from "@radix-ui/react-icons";

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
const LeftToolbar: React.FC = () => {
	return (
		<div
			className={cn("w-[400px] border")}
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
						<BlockContainer />
					</TabsContent>
					<TabsContent value="elements">
						<BaseElementContainer />
						<SpecialElementContainer />
					</TabsContent>
					<TabsContent value="layers">
						Change your password here.
					</TabsContent>
				</div>
			</Tabs>
		</div>
	);
};

export default LeftToolbar;
