import React, { useEffect } from "react";
import Image from "next/image";
import { cn } from "@/components/lib/utils";
import { ImageIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/shared/shadcn/ui/button";
import GalleryDialogContainer from "@/components/widgets/gallery/GalleryDialogContainer";
import { ISchemaContentPhotoData } from "@/components/shared/types/interface-schema-content";

interface Props {
	defaultData: ISchemaContentPhotoData;
	onUpdateSchemaHandle: (data: ISchemaContentPhotoData) => void;
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
	const { defaultData, onUpdateSchemaHandle } = props;

	const [schemaValue, setSchemaValue] =
		React.useState<ISchemaContentPhotoData>({
			url: "",
			size: 0,
			created: 0,
			extension: "",
			info: {
				width: 0,
				height: 0,
				luminance: 0,
			},
			name: "",
			path: "",
			public_url: "",
		});
	const [toggleExpanded, setToggleExpanded] = React.useState(false);

	const toggleExpandedHandle = () => setToggleExpanded(!toggleExpanded);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления данных
	 * @param data
	 */
	const onChangeHandle = (data: ISchemaContentPhotoData) => {
		setSchemaValue(data);
		toggleExpandedHandle();
		if (onUpdateSchemaHandle) onUpdateSchemaHandle(data);
	};

	useEffect(() => {
		if (defaultData) {
			setSchemaValue(defaultData);
		}
	}, [defaultData]);

	return (
		<div className="w-full h-auto mb-5">
			{!schemaValue.url ? (
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
						src={schemaValue.url}
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

			<GalleryDialogContainer
				toggleExpanded={toggleExpanded}
				getImage={onChangeHandle}
				toggleExpandedHandle={toggleExpandedHandle}
				activeImage={schemaValue}
			/>
		</div>
	);
};

export default ImageContent;
