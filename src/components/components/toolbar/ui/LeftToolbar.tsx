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
const LeftToolbar: React.FC<Props> = (props) => {
	const {} = props;

	return (
		<div
			className={cn("w-[400px] border")}
			style={{ height: "calc(100vh - 60px)" }}
		>
			<Tabs defaultValue="components" className="w-full">
				<TabsList
					className={cn("w-full justify-start py-4 rounded-none")}
				>
					<TabsTrigger value="components">Компоненты</TabsTrigger>
					<TabsTrigger value="elements">Элементы</TabsTrigger>
					<TabsTrigger value="layers">Навигатор</TabsTrigger>
				</TabsList>
				<div className={cn("p-2")}>
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
