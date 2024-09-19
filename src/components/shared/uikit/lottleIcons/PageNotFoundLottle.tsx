import React from "react";
import LottleIcon from "@/components/shared/constants/file";
import Lottie from "react-lottie";

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
const PageNotFoundLottle: React.FC = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: LottleIcon.LottlePageNotFoundIcon,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	return <Lottie options={defaultOptions} height={140} width={100} />;
};

export default PageNotFoundLottle;
