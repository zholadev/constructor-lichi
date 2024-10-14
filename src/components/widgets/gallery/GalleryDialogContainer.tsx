import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/shared/shadcn/ui/dialog";
import GalleryFolderNav from "@/components/widgets/gallery/GalleryFolderNav";
import GalleryImageView from "@/components/widgets/gallery/GalleryImageView";
import { IGalleryImageItem } from "@/components/shared/types/interface";

interface Props {
	toggleExpanded: boolean;
	toggleExpandedHandle: () => void;
	getImage: (data: IGalleryImageItem) => void;
	activeImage?: IGalleryImageItem;
}

/**
 * @author Zholaman Zhumanov
 * @created 20.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo refactoring
 * @fixme
 * @param props
 * @constructor
 */
const GalleryDialogContainer: React.FC<Props> = (props) => {
	const { toggleExpanded, toggleExpandedHandle, getImage, activeImage } =
		props;

	return (
		<Dialog open={toggleExpanded} onOpenChange={toggleExpandedHandle}>
			<DialogContent className="w-full max-w-[1200px]">
				<DialogHeader>
					<DialogTitle>Media Gallery</DialogTitle>
				</DialogHeader>
				<div className="w-full flex flex-row h-full gap-4 max-h-[600px] overflow-hidden">
					<GalleryFolderNav />
					<GalleryImageView
						getImage={getImage}
						activeImage={activeImage}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default GalleryDialogContainer;
