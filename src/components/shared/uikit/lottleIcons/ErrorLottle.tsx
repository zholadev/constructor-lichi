import React from "react";
import Lottie from "react-lottie";
import LottleIcon from "@/components/shared/constants/file";

/**
 * @author Zholaman Zhumanov
 * @created 19.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const ErrorLottle: React.FC = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: LottleIcon.LottleErrorPageIcon,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	return <Lottie options={defaultOptions} height={140} width={100} />;
};

export default ErrorLottle;
