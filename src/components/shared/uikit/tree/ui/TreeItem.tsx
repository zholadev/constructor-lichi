import React, { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES } from "@/components/shared/constants/images";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";

interface Props {
	label: string;
	path: string;
	children?: ReactNode;
	activePath: string;
	onClick: (path: string) => void;
}

/**
 * @author Zholaman Zhumanov
 * @created 09.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const TreeItem: React.FC<Props> = (props) => {
	const { label, path, children, activePath, onClick } = props;

	const { pathCurrentFolderAction } = useDispatchAction();

	const isOpen = activePath.startsWith(path);

	const handleClick = () => {
		pathCurrentFolderAction(path);
		window.scroll({ top: 0, left: 0, behavior: "smooth" });
		onClick(path);
	};

	return (
		<div className="ml-3">
			<div
				className={`flex items-center cursor-pointer justify-between gap-4 space-x-2 mb-4 ${
					isOpen ? "text-orange-500" : "text-gray-800"
				} font-medium`}
			>
				<div
					className="flex w-full items-center cursor-pointer space-x-2 mb-2"
					onClick={handleClick}
				>
					{isOpen ? (
						<Image
							src={IMAGES.ICON.folderIconsOpenStaticIcon}
							width={20}
							height={18}
							alt="folder"
						/>
					) : (
						<Image
							src={IMAGES.ICON.folderIconsStaticIcon}
							width={20}
							height={18}
							alt="folder"
						/>
					)}
					<span>{label}</span>
				</div>
				{/* <RemoveObject path={path} type="folder" /> */}
			</div>
			<motion.div
				initial={false}
				animate={{ height: isOpen ? "auto" : 0 }}
				style={{ overflow: "hidden" }}
				transition={{ duration: 0.3 }}
				className="ml-4"
			>
				{isOpen && children}
			</motion.div>
		</div>
	);
};

export default TreeItem;
