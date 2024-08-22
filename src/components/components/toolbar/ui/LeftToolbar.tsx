import React from "react";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/shared/shadcn/ui/tabs";
import { cn } from "@/components/lib/utils";
import { motion } from "framer-motion";
import BlockContainer from "@/components/components/blocks/ui/BlockContainer";
import BaseElementContainer from "@/components/components/elements/ui/BaseElementContainer";
import SpecialElementContainer from "@/components/components/elements/ui/SpecialElementContainer";

interface Props {}

const slideLeft = {
	hidden: { opacity: 0, x: "-100%" },
	visible: {
		opacity: 1,
		x: "0%",
		transition: {
			duration: .4,
		},
	},
};

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
		<motion.div
			initial="hidden"
			animate="visible"
			variants={slideLeft}
			className={cn("w-[400px] border")}
			style={{ height: "calc(100vh - 60px)" }}
		>
			<Tabs defaultValue="components" className="w-full">
				<div className={cn("p-2")}>
					<TabsList
						className={cn("w-full justify-start rounded-none")}
					>
						<TabsTrigger value="components">Компоненты</TabsTrigger>
						<TabsTrigger value="elements">Элементы</TabsTrigger>
						<TabsTrigger value="layers">Навигатор</TabsTrigger>
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
		</motion.div>
	);
};

export default LeftToolbar;
