import notFolder from "../../../../public/static/images/not-file-icon.png";
import folderBasic from "../../../../public/static/images/Folder.svg";
import folderActive from "../../../../public/static/images/Folder-active.svg";
import folderMasOriginal from "../../../../public/static/images/macos-original-icon.svg";
import folderIconsStatic from "../../../../public/static/images/icons8-folder.svg";
import folderIconsOpenStatic from "../../../../public/static/images/icons8-folder-open.svg";
import folderIconsFillStatic from "../../../../public/static/images/icons8-folder-fill.svg";

import card1 from "../../../../public/static/images/thumbnail/card/card-1.jpg";
import card2 from "../../../../public/static/images/thumbnail/card/card-2.jpg";
import card3 from "../../../../public/static/images/thumbnail/card/card-3.jpg";
import card4 from "../../../../public/static/images/thumbnail/card/card-4.jpg";
import card5 from "../../../../public/static/images/thumbnail/card/card-5.jpg";
import card6 from "../../../../public/static/images/thumbnail/card/card-6.jpg";

import album1 from "../../../../public/static/images/thumbnail/album/album-1.jpeg";

import pageNotFound from "../../../../public/static/images/page/404-error.png";

interface ImageImport {
	height: number;
	src: string;
	width: number;
}

interface IActionData {
	page404: string;
}

interface IImagesData {
	ICON: Record<string, unknown>;
	ACTION: IActionData;
	THUMBNAIL: Record<string, ImageImport[]>;
}

export const IMAGES: IImagesData = {
	ICON: {
		folder: notFolder,
		folderBasicIcon: folderBasic,
		folderActiveIcon: folderActive,
		folderMasOriginalIcon: folderMasOriginal,
		folderIconsStaticIcon: folderIconsStatic,
		folderIconsOpenStaticIcon: folderIconsOpenStatic,
		folderIconsFillStaticIcon: folderIconsFillStatic,
	},
	THUMBNAIL: {
		card: [card1, card2, card3, card4, card5, card6],
		album: [album1],
	},
	ACTION: {
		page404: pageNotFound,
	},
};
