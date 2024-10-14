import React, { useEffect } from "react";
import Image from "next/image";
import { cn } from "@/components/lib/utils";
import { ImageIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/shared/shadcn/ui/button";
import { IGalleryImageItem } from "@/components/shared/types/interface";
import GalleryDialogContainer from "@/components/widgets/gallery/GalleryDialogContainer";

interface Props {
	imageSrc: IGalleryImageItem;
	onChange: (imageSrc?: IGalleryImageItem) => void;
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
const ImageContent: React.FC<Props> = (props) => {
	const { imageSrc, onChange } = props;

	const [currentImage, setCurrentImage] = React.useState<IGalleryImageItem>();
	const [toggleExpanded, setToggleExpanded] = React.useState(false);

	const toggleExpandedHandle = () => setToggleExpanded(!toggleExpanded);

	const updateDataHandle = (data: IGalleryImageItem) => {
		setCurrentImage(data);
		toggleExpandedHandle();
		if (onChange) onChange(data);
	};

	useEffect(() => {
		setCurrentImage(imageSrc);
	}, [imageSrc]);

	return (
		<div className="w-full h-auto mb-5">
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
				<div
					className={cn(
						"hover:opacity-70 duration-120 ease-in-out transition-opacity"
					)}
				>
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
				</div>
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
				getImage={updateDataHandle}
				toggleExpandedHandle={toggleExpandedHandle}
				activeImage={currentImage}
			/>
		</div>
	);
};

export default ImageContent;
