"use client";

import React, { Suspense } from "react";
import DocSchemaPage from "@/components/pages/documentation/DocSchemaPage";

/**
 * @author Zholaman Zhumanov
 * @constructor
 */
export default function Space(): React.JSX.Element {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<DocSchemaPage />
		</Suspense>
	);
}
