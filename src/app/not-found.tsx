import Link from "next/link";
import { cn } from "@/components/lib/utils";
import Image from "next/image";
import { IMAGES } from "@/components/shared/constants/images";
import React from "react";

export default function NotFound(): React.JSX.Element {
	return (
		<div
			className={cn(
				"size-full h-screen flex items-center justify-center flex-col"
			)}
		>
			<Image
				src={IMAGES.ACTION.page404}
				alt="404 page"
				width={340}
				height={230}
				priority
			/>
			<h2 className={cn("mb-4 font-bold text-xl")}>Page Not Found</h2>
			<p className={cn("mb-4")}>Could not find requested resource</p>
			<Link
				href="/"
				className={cn(
					"max-w-[230px] h-[40px] flex items-center justify-center border px-5"
				)}
			>
				Return Home
			</Link>
		</div>
	);
}
