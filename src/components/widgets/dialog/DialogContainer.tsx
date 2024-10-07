import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/shared/shadcn/ui/dialog";
import { cn } from "@/components/lib/utils";

interface Props {
	children: React.ReactNode;
	title?: string;
	open: boolean;
	toggle?: () => void;
	footer?: React.ReactNode;
	clsContent?: string;
}

/**
 * @author Zholaman Zhumanov
 * @created 28.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const DialogContainer: React.FC<Props> = (props) => {
	const { children, title, open, toggle, footer, clsContent } = props;

	const onOpenChange = () => {
		if (toggle) toggle();
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className={cn("sm:max-w-md", clsContent)}>
				{title && (
					<DialogHeader>
						<DialogTitle className={cn("text-md")}>
							{title}
						</DialogTitle>
					</DialogHeader>
				)}

				<div className="w-full">{children}</div>

				{footer}
			</DialogContent>
		</Dialog>
	);
};

export default DialogContainer;
