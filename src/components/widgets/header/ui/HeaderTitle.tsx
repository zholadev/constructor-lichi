"use client";

import React from "react";
import { cn } from "@/components/lib/utils";
import { ArrowLeftIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/shared/shadcn/ui/button";
import { useRouter } from "next/navigation";

interface Props {
	title: string;
}

/**
 * @author Zholaman Zhumanov
 * @created 19.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const HeaderTitle: React.FC<Props> = (props) => {
	const { title = "Page Title" } = props;

	const router = useRouter();

	return (
		<div className={cn("text-sm flex items-center gap-2")}>
			<Button
				onClick={() => router.push("/")}
				tabIndex={0}
				type="button"
				variant="outline"
			>
				<ArrowLeftIcon />
			</Button>
			<div className={cn("flex items-center gap-3")}>
				<span className={cn("text-gray-400")}>Page: </span> {title}
				<Button type="button" variant="outline" size="icon">
					<Pencil2Icon />
				</Button>
			</div>
		</div>
	);
};

export default HeaderTitle;
