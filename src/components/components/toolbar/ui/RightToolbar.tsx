import React from "react";
import { cn } from "@/components/lib/utils";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/shared/shadcn/ui/tabs";
import DesignContent from "@/components/components/design/ui/DesignContent";
import SettingContainer from "@/components/components/design/ui/SettingContainer";

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
			className={cn("w-[420px] border")}
			style={{ height: "calc(100vh - 60px)" }}
		>
			<Tabs defaultValue="design" className="w-full">
				<div className={cn("p-2")}>
					<TabsList
						className={cn("w-full justify-start rounded-none")}
					>
						<TabsTrigger value="design">Design</TabsTrigger>
						<TabsTrigger value="settings">Settings</TabsTrigger>
					</TabsList>
				</div>
				<div
					className={cn("p-2 overflow-hidden")}
					style={{ height: "calc(100vh - 60px)" }}
				>
					<TabsContent
						value="design"
						className={cn("overflow-y-auto")}
						style={{ height: "calc(100vh - 120px)" }}
					>
						<DesignContent />
					</TabsContent>
					<TabsContent
						value="settings"
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
