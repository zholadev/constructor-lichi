import React from "react";
import usePermission from "@/components/shared/hooks/usePermission";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import Image from "next/image";
import { IMAGES } from "@/components/shared/constants/images";
import styles from "@/components/styles/header-mode-view.module.sass";

interface Props {}

/**
 * @author Zholaman Zhumanov
 * @created 30.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const HeaderModeView: React.FC<Props> = (props) => {
	const {} = props;

	const permission = usePermission();
	const activeElementData = useActiveElementObserver();

	return (
		<header className={styles.header}>
			<Image
				src={IMAGES.LOGO.headerLogo}
				alt=""
				width={120}
				height={50}
			/>
			<nav className={styles.categories}>
				<ul>
					<li>NEW</li>
					<li>CLOTHES</li>
					<li>ACCESSORIES</li>
					<li>SHOES</li>
				</ul>
			</nav>

			<nav className={styles.categories}>
				<ul>
					<li>PROFILE</li>
					<li>CART</li>
					<li>FAVORITES</li>
				</ul>
			</nav>
		</header>
	);
};

export default HeaderModeView;
