"use client";

import React from "react";
import { cn } from "@/components/lib/utils";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import NavigatorLayer from "./NavigatorLayer";

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

	if (spaceTemplateData && spaceTemplateData.length === 0) {
		return null;
	}

	return (
		<div className={cn("w-full my-4")}>
			{spaceTemplateData.map((container: ISchemaContainer) => {
				return (
					<NavigatorLayer
						type="container"
						key={container.id}
						data={container}
						containerId={container.id}
						activeId={container.id}
					/>
				);
			})}
		</div>
	);
};

export default Navigator;
