import React from "react";
import { cn } from "@/components/lib/utils";

interface Props {
	node: Node;
	onSelect: (node: Node) => void;
}

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
const NavigatorLayer: React.FC<Props> = (props) => {
	const { node, onSelect } = props;

	const handleClick = () => {
		onSelect(node);
	};

	return (
		<div style={{ paddingLeft: "10px" }}>
			<div
				onClick={handleClick}
				style={{ cursor: "pointer", padding: "5px 0" }}
			>
				{node.type || node?.data?.type}
			</div>
			{node.components &&
				node.components.map((component) => {
					return (
						<div className={cn("w-full flex flex-col")}>
							<NavigatorLayer
								key={component.id}
								node={component}
								onSelect={onSelect}
							/>

							{component.data.elements &&
								component.data.elements.map((element) => (
									<div className={cn("pl-2")}>
										<NavigatorLayer
											key={element.id}
											node={element}
											onSelect={onSelect}
										/>
									</div>
								))}
						</div>
					);
				})}
		</div>
	);
};

export default NavigatorLayer;
