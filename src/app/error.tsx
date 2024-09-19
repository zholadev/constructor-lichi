"use client";

import { useEffect } from "react";
import { cn } from "@/components/lib/utils";

export default function Error({ error, reset }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div
			className={cn("h-screen flex flex-col items-center justify-center")}
		>
			<h2 className={cn("mb-4 text-center")}>Something went wrong!</h2>
			<button type="button" onClick={() => reset()}>
				Try again
			</button>
		</div>
	);
}
