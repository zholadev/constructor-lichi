import React from "react";
import GalleryDialogContainer from "@/components/widgets/gallery/ui/GalleryDialogContainer";
import Image from "next/image";
import { Button } from "@/components/shared/shadcn/ui/button";
import { ImageIcon } from "@radix-ui/react-icons";
import { IGalleryImageItem } from "@/components/shared/types/interface";
import { cn } from "@/components/lib/utils";

interface Props {
	imageSrc: IGalleryImageItem;
}

/**
 * @author Zholaman Zhumanov
 * @created 26.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const ImageSetting: React.FC<Props> = (props) => {
	const { imageSrc } = props;

	const [currentImage, setCurrentImage] =
		React.useState<IGalleryImageItem | null>(imageSrc || null);
	const [toggleExpanded, setToggleExpanded] = React.useState(false);

	const toggleeExpandedHandle = () => setToggleExpanded(!toggleExpanded);

	return (
		<div className="w-full h-auto">
			{!currentImage ? (
				<Button
					type="button"
					variant="outline"
					className={cn("w-[90px] h-[90px]")}
					onClick={toggleeExpandedHandle}
				>
					<ImageIcon width={30} height={30} />
				</Button>
			) : (
				// <AspectRatio ratio={4 / 3}>
				<Image
					src={currentImage.url}
					alt=""
					width={240}
					height={240}
					onClick={toggleeExpandedHandle}
					className={cn(
						"w-full block cursor-pointer object-cover mb-2"
					)}
				/>
				// </AspectRatio>
			)}

			<div>
				<div className={cn("flex items-center gap-1")}>
					<h3 className={cn("text-gray-500")}>Название: </h3>
					<h3>{currentImage?.name}</h3>
				</div>

				<div className={cn("flex items-center gap-1")}>
					<h3 className={cn("text-gray-500")}>Размеры: </h3>
					<h3>
						{currentImage?.info.width} x {currentImage?.info.height}
					</h3>
				</div>
			</div>

			<GalleryDialogContainer
				toggleExpanded={toggleExpanded}
				getImage={setCurrentImage}
				toggleExpandedHandle={toggleeExpandedHandle}
				activeImage={currentImage}
			/>
		</div>
	);
};

export default ImageSetting;
