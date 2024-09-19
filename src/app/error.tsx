"use client";

import React, { useEffect } from "react";
import { cn } from "@/components/lib/utils";
import ErrorLottle from "@/components/shared/uikit/lottleIcons/ErrorLottle";
import { Button } from "@/components/shared/shadcn/ui/button";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}): React.ReactNode {
	useEffect(() => {
		console.error("ERROR: ", error);
	}, [error]);

	return (
		<div
			className={cn("h-screen flex flex-col items-center justify-center")}
		>
			<ErrorLottle />
			<h2 className={cn("mb-4 text-center")}>
				Crash! Пожалуйста обратитесь к разработчикам
			</h2>
			<Button type="button" onClick={() => reset()}>
				Try again
			</Button>
		</div>
	);
}
