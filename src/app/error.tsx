"use client";

import { useEffect } from "react";
import { cn } from "@/components/lib/utils";
import ErrorLottle from "@/components/shared/uikit/lottleIcons/ErrorLottle";

export default function Error({ error, reset }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div
			className={cn("h-screen flex flex-col items-center justify-center")}
		>
			<ErrorLottle />
			<h2 className={cn("mb-4 text-center")}>Something went wrong!</h2>
			<button type="button" onClick={() => reset()}>
				Try again
			</button>
		</div>
	);
}
