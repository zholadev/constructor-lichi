import React from "react";
import { cn } from "@/components/lib/utils";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/shared/shadcn/ui/tabs";
import GalleryDialogContainer from "@/components/widgets/gallery/ui/GalleryDialogContainer";

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

	return (
		<div
			className={cn("w-[400px] border")}
			style={{ height: "calc(100vh - 60px)" }}
		>
			<Tabs defaultValue="design" className="w-full">
				<TabsList
					className={cn("w-full justify-start py-4 rounded-none")}
				>
					<TabsTrigger value="design">Design</TabsTrigger>
					<TabsTrigger value="prototype">Prototype</TabsTrigger>
				</TabsList>
				<div className={cn("p-2")}>
					<TabsContent value="design">
						<GalleryDialogContainer />
					</TabsContent>
					<TabsContent value="prototype">
						Prototype Content
					</TabsContent>
				</div>
			</Tabs>
		</div>
	);
};

export default RightToolbar;
