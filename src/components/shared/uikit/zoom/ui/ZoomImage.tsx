"use client";

import React from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface Props {
	children: React.ReactNode;
}

/**
 * @author Zholaman Zhumanov
 * @created 11.06.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const ZoomImage: React.FC<Props> = (props) => {
	const { children } = props;

	return <Zoom>{children}</Zoom>;
};

export default ZoomImage;
