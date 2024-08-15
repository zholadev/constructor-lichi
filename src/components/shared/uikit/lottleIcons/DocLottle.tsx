import React from "react";
import LottleIcon from "@/components/shared/constants/file";
import Lottie from "react-lottie";

interface Props {
}

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
const DocLottle: React.FC<Props> = (props) => {
	const {} = props;

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: LottleIcon.LottleDocIcon,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	return <Lottie options={defaultOptions} height={140} width={100} />;
};

export default DocLottle;
