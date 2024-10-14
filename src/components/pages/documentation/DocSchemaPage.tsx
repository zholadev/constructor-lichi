import React from "react";
import { cn } from "@/components/lib/utils";
import DocSchemaContainer from "@/components/pages/documentation/DocSchemaContainer";

/**
 * @author Zholaman Zhumanov
 * @created 07.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const DocSchemaPage: React.FC = () => {
	return (
		<div
			className={cn(
				"size-full p-5 flex flex-col justify-center overflow-auto items-center"
			)}
		>
			<h1
				className={cn(
					"text-lg uppercase mt-10 text-center border-b border-b-black mb-10"
				)}
			>
				Документация
			</h1>

			<div className={cn("w-full max-w-[1440px] h-full overflow-auto")}>
				<DocSchemaContainer />
			</div>
		</div>
	);
};

export default DocSchemaPage;
