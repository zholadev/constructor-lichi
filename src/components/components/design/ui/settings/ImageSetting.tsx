import React from "react";
import GalleryDialogContainer from "@/components/widgets/gallery/ui/GalleryDialogContainer";
import Image from "next/image";
import { Button } from "@/components/shared/shadcn/ui/button";
import { ImageIcon } from "@radix-ui/react-icons";
import { IGalleryImageItem } from "@/components/shared/types/interface";
import { cn } from "@/components/lib/utils";

interface Props {
	imageSrc?: IGalleryImageItem;
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

	const toggleExpandedHandle = () => setToggleExpanded(!toggleExpanded);

	return (
		<div className="w-full h-auto">
			{!currentImage ? (
				<Button
					type="button"
					variant="outline"
					className={cn("w-[90px] h-[90px]")}
					onClick={toggleExpandedHandle}
				>
					<ImageIcon width={30} height={30} />
				</Button>
			) : (
				<Image
					src={currentImage.url}
					alt=""
					width={240}
					height={240}
					onClick={toggleExpandedHandle}
					className={cn(
						"w-full block cursor-pointer object-cover mb-2"
					)}
				/>
			)}

			<div className={cn("w-full mt-3")}>
				{currentImage?.name && (
					<div className={cn("flex items-center gap-3 mb-2")}>
						<h3 className={cn("text-gray-500")}>Название: </h3>
						<h3>{currentImage?.name}</h3>
					</div>
				)}

				{currentImage?.info && (
					<div className={cn("flex items-center gap-3")}>
						<h3 className={cn("text-gray-500")}>Размеры: </h3>
						<h3>
							{currentImage?.info.width} x{" "}
							{currentImage?.info.height}
						</h3>
					</div>
				)}
			</div>

			<GalleryDialogContainer
				toggleExpanded={toggleExpanded}
				getImage={setCurrentImage}
				toggleExpandedHandle={toggleExpandedHandle}
				activeImage={currentImage}
			/>
		</div>
	);
};

export default ImageSetting;
