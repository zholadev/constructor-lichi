import React, {useState} from "react";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { cn } from "@/components/lib/utils";
import NavigatorLayer from "@/components/features/app/components/naviagtor/NavigatorLayer";

interface Props {}

/**
 * @author Zholaman Zhumanov
 * @created 16.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const Navigator: React.FC<Props> = (props) => {
	const {} = props;

	const { spaceTemplateData } = useAppSelector((state) => state.space);

	const [selectedNode, setSelectedNode] = useState<Node | null>(null);

	const handleSelect = (node: Node) => {
		setSelectedNode(node);
		console.log('Selected node:', node);
	};

	return (
		<div className={cn("w-full my-4")}>
			{spaceTemplateData.map((container, index) => {
				return <NavigatorLayer key={container.id} node={container} onSelect={handleSelect} />;
			})}
		</div>
	);
};

export default Navigator;
