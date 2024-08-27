import React from "react";
import { cn } from "@/components/lib/utils";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/shared/shadcn/ui/accordion";
import ImageSetting from "@/components/components/design/ui/settings/ImageSetting";
import {
	ImageIcon,
	Link1Icon,
	SliderIcon,
	VideoIcon,
} from "@radix-ui/react-icons";
import { GalleryHorizontalEnd } from "lucide-react";
import SwiperSetting from "@/components/components/design/ui/settings/SwiperSetting";
import LinkSetting from "@/components/components/design/ui/settings/LinkSetting";
import VideoSetting from "@/components/components/design/ui/settings/VideoSetting";

interface Props {}

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
const SettingContainer: React.FC<Props> = (props) => {
	const {} = props;

	const [defaultExpanded, setExpanded] = React.useState<string[]>([
		"image",
		// "swiper",
		"video",
		"link",
	]);

	return (
		<div className={cn("w-full p-3")}>
			<Accordion
				type="multiple"
				className="w-full"
				value={defaultExpanded}
				onValueChange={setExpanded}
			>
				<AccordionItem value="image">
					<AccordionTrigger>
						<div
							className={cn(
								"w-full flex flex-row items-center gap-2"
							)}
						>
							<ImageIcon width={20} height={20} />
							Image
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<ImageSetting />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="video">
					<AccordionTrigger>
						<div
							className={cn(
								"w-full flex flex-row items-center gap-2"
							)}
						>
							<VideoIcon width={20} height={20} />
							Video
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<VideoSetting
							defaultParams={{ poster: null, videoSrc: "" }}
						/>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="link">
					<AccordionTrigger>
						<div
							className={cn(
								"w-full flex flex-row items-center gap-2"
							)}
						>
							<Link1Icon width={20} height={20} />
							Link
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<LinkSetting defaultParams={{ url: "" }} />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="swiper">
					<AccordionTrigger>
						<div
							className={cn(
								"w-full flex flex-row items-center gap-2"
							)}
						>
							<GalleryHorizontalEnd />
							Slider
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<SwiperSetting />
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default SettingContainer;
