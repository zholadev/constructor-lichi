import React from "react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/shared/shadcn/ui/dialog";
import { Button } from "@/components/shared/shadcn/ui/button";
import GalleryFolderNav from "@/components/widgets/gallery/ui/GalleryFolderNav";
import GalleryImageView from "@/components/widgets/gallery/ui/GalleryImageView";

interface Props {}

/**
 * @author Zholaman Zhumanov
 * @created 20.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const GalleryDialogContainer: React.FC<Props> = (props) => {
	const {} = props;

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Add Image</Button>
			</DialogTrigger>
			<DialogContent className="w-full max-w-[1200px]">
				<DialogHeader>
					<DialogTitle>Media Gallery</DialogTitle>
				</DialogHeader>
				<div className="w-full flex flex-row h-full gap-4 max-h-[600px] overflow-hidden">
					<GalleryFolderNav />
					<GalleryImageView />
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default GalleryDialogContainer;
