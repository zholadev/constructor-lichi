import React, { useEffect } from "react";
import { Button } from "@/components/shared/shadcn/ui/button";
import { cn } from "@/components/lib/utils";
import { ImageIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Input } from "@/components/shared/shadcn/ui/input";
import GalleryDialogContainer from "@/components/widgets/gallery/GalleryDialogContainer";
import { Label } from "@/components/shared/shadcn/ui/label";
import { Switch } from "@/components/shared/shadcn/ui/switch";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import {
	ISchemaContentPhotoData,
	ISchemaContentVideoParams,
} from "@/components/shared/types/interface-schema-content";
import useToastMessage from "@/components/shared/hooks/useToastMessage";

interface Props {
	onUpdateSchemaHandle?: (data: ISchemaContentVideoParams) => void;
	defaultData?: ISchemaContentVideoParams;
}

/**
 * @author Zholaman Zhumanov
 * @created 21.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo refactoring, poster fix
 * @fixme
 * @param props
 * @constructor
 */
const VideoContent: React.FC<Props> = (props) => {
	const { onUpdateSchemaHandle, defaultData } = props;

	const toastMessage = useToastMessage();

	const { editorVideoPlayAction } = useDispatchAction();
	const { editorVideoPlay } = useAppSelector((state) => state.editor);

	const [schemaValue, setSchemaValue] =
		React.useState<ISchemaContentVideoParams>({
			poster: {
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
			},
			videoSrc: "",
		});

	const [toggleExpanded, setToggleExpanded] = React.useState(false);

	const toggleExpandedHandle = () => setToggleExpanded(!toggleExpanded);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления данных
	 * @param value
	 * @param key
	 */
	const onChangeHandle = (
		value: string | ISchemaContentPhotoData,
		key: keyof ISchemaContentVideoParams
	) => {
		if (!value || !key) {
			toastMessage("ValueError: key or value is not defined!", "error");
			return;
		}

		toggleExpandedHandle();
		setSchemaValue((prev) => {
			const updateValues = {
				...prev,
				[key]: value,
			};

			if (onUpdateSchemaHandle) onUpdateSchemaHandle(updateValues);

			return updateValues;
		});
	};

	useEffect(() => {
		if (defaultData) {
			setSchemaValue(defaultData);
		}
	}, [defaultData]);

	return (
		<div>
			<div
				className={cn(
					"flex justify-between cursor-pointer items-center flex-row gap-2 mb-3"
				)}
			>
				<Label htmlFor="video-autoplay">
					<h3 className={cn("text-xs uppercase text-gray-500")}>
						Autoplay (editor)
					</h3>
				</Label>

				<div className={cn("flex items-center gap-2")}>
					<Switch
						id="video-autoplay"
						checked={editorVideoPlay}
						onCheckedChange={(value) => {
							editorVideoPlayAction(value);
						}}
					/>
				</div>
			</div>

			<div className={cn("w-full")}>
				<h3 className={cn("uppercase text-xs mb-2 text-gray-500")}>
					Постер
				</h3>
				<div className="w-full h-auto mb-9">
					{!schemaValue.poster?.url ? (
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
								src={schemaValue.poster?.url}
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
						getImage={(value) => {
							onChangeHandle(value, "poster");
						}}
						toggleExpandedHandle={toggleExpandedHandle}
						activeImage={schemaValue.poster}
					/>
				</div>
			</div>

			<div className={cn("w-full mb-3")}>
				<h3 className={cn("uppercase text-xs mb-2 text-gray-500")}>
					Ссылка на видео{" "}
				</h3>
				<Input
					value={schemaValue.videoSrc}
					placeholder="Введите ссылку видео"
					onChange={(e) => {
						onChangeHandle(e.target.value, "videoSrc");
					}}
				/>
			</div>
		</div>
	);
};

export default VideoContent;
