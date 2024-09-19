import React from "react";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { cn } from "@/components/lib/utils";
import NavigatorLayer from "@/components/features/app/components/navigator/NavigatorLayer";
import { ITemplateBaseSchema } from "@/components/shared/types/interface-templates";

/**
 * @author Zholaman Zhumanov
 * @created 16.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const Navigator: React.FC = () => {
	const { spaceTemplateData } = useAppSelector((state) => state.space);

	return (
		<div className={cn("w-full my-4")}>
			{spaceTemplateData.map((container: ITemplateBaseSchema) => {
				return (
					<NavigatorLayer
						type="container"
						key={container.id}
						node={container}
					/>
				);
			})}
		</div>
	);
};

export default Navigator;
