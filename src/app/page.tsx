"use client";

import React from "react";
import SchemaListPage from "@/components/pages/schemaList/ui/SchemaListPage";

export default function Home(): React.JSX.Element {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<SchemaListPage />
		</main>
	);
}
