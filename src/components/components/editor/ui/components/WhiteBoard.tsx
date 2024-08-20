import React from "react";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { Progress } from "@/components/shared/shadcn/ui/progress";
import { cn } from "@/components/lib/utils";

interface Props {}

/**
 * @author Zholaman Zhumanov
 * @created 20.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const WhiteBoard: React.FC<Props> = (props) => {
	const {} = props;

	const [progress, setProgress] = React.useState(13);

	React.useEffect(() => {
		const timer = setTimeout(() => setProgress(66), 500);
		return () => clearTimeout(timer);
	}, []);

	const { spaceTemplateApiLoading } = useAppSelector((state) => state.space);

	return spaceTemplateApiLoading ? (
		<div
			className={cn(
				"size-full flex items-center justify-center max-w-[360px]"
			)}
		>
			<Progress value={progress} className="w-[60%]" />
		</div>
	) : (
		<div className={cn("w-full bg-secondary")} />
	);
};

export default WhiteBoard;
