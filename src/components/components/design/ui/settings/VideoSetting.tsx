import React, { useEffect } from "react";
import { IGalleryImageItem } from "@/components/shared/types/interface";
import { Button } from "@/components/shared/shadcn/ui/button";
import { cn } from "@/components/lib/utils";
import { ImageIcon, PlayIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Input } from "@/components/shared/shadcn/ui/input";
import GalleryDialogContainer from "@/components/widgets/gallery/ui/GalleryDialogContainer";
import { Label } from "@/components/shared/shadcn/ui/label";
import { Switch } from "@/components/shared/shadcn/ui/switch";
import { GalleryThumbnails } from "lucide-react";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";

interface IVideoSettings {
	poster: IGalleryImageItem | null;
	videoSrc: string;
}

interface Props {
	onSendParams?: (data: IVideoSettings | null) => void;
	defaultParams?: IVideoSettings;
}

/**
 * @author Zholaman Zhumanov
 * @created 21.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const VideoSetting: React.FC<Props> = (props) => {
	const { onSendParams, defaultParams } = props;

	const { editorVideoPlayAction } = useDispatchAction();
	const { editorVideoPlay } = useAppSelector((state) => state.editor);

	const [videoSetting, setVideoSetting] = React.useState<IVideoSettings>({
		poster: null,
		videoSrc: "",
	});

	const [toggleExpanded, setToggleExpanded] = React.useState(false);

	const toggleExpandedHandle = () => setToggleExpanded(!toggleExpanded);

	const onChangeSettings = (
		value: string | IGalleryImageItem,
		key: keyof IVideoSettings
	) => {
		if (!value || !key) {
			return;
		}

		setVideoSetting((prev) => {
			const updateValues = {
				...prev,
				[key]: value,
			};

			if (onSendParams) onSendParams(updateValues);

			return updateValues;
		});
	};

	useEffect(() => {
		setVideoSetting({
			poster: defaultParams.poster,
			videoSrc: defaultParams.videoSrc,
		});
	}, [defaultParams]);

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
					{!videoSetting.poster ? (
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
								src={videoSetting.poster.url}
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
						{videoSetting?.poster?.name && (
							<div className={cn("flex items-center gap-3 mb-2")}>
								<h3 className={cn("text-gray-500")}>
									Название:{" "}
								</h3>
								<h3>{videoSetting?.poster.name}</h3>
							</div>
						)}

						{videoSetting?.poster?.info && (
							<div className={cn("flex items-center gap-3")}>
								<h3 className={cn("text-gray-500")}>
									Размеры:{" "}
								</h3>
								<h3>
									{videoSetting?.poster.info.width} x{" "}
									{videoSetting?.poster.info.height}
								</h3>
							</div>
						)}
					</div>

					<GalleryDialogContainer
						toggleExpanded={toggleExpanded}
						getImage={(value) => {
							onChangeSettings(value, "poster");
						}}
						toggleExpandedHandle={toggleExpandedHandle}
						activeImage={videoSetting.poster}
					/>
				</div>
			</div>

			<div className={cn("w-full mb-3")}>
				<h3 className={cn("uppercase text-xs mb-2 text-gray-500")}>
					Ссылка на видео{" "}
				</h3>
				<Input
					value={videoSetting.videoSrc}
					placeholder="Введите ссылку видео"
					onChange={(e) => {
						onChangeSettings(e.target.value, "videoSrc");
					}}
				/>
			</div>
		</div>
	);
};

export default VideoSetting;
