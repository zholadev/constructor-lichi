import React from "react";

interface Props {
	children: React.ReactNode;
}

/**
 * @author Zholaman Zhumanov
 * @created 16.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const SpaceProvider: React.FC<Props> = (props) => {
	const { children } = props;

	return children;
};

export default SpaceProvider;
