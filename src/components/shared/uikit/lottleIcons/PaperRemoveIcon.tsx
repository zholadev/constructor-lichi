import React from "react";
import Lottie from "react-lottie";
import LottleIcon from "@/components/shared/constants/file";

interface Props {}

/**
 * @author Zholaman Zhumanov
 * @created 15.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const PaperRemoveIcon: React.FC<Props> = (props) => {
	const {} = props;

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: LottleIcon.LottleTrashIcon,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	return <Lottie options={defaultOptions} height={100} width={100} />;
};

export default PaperRemoveIcon;
