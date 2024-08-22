import React, { useState } from "react";
import { cn } from "@/components/lib/utils";
import TreeItem from "./TreeItem";

interface TreeNode {
	path: string;
	name: string;
	items?: TreeNode[];
}

interface Props {
	data: TreeNode[];
}

/**
 * @author Zholaman Zhumanov
 * @created 09.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const Tree: React.FC<Props> = (props) => {
	const { data = [] } = props;

	const [activePath, setActivePath] = useState<string>("");

	const handleItemClick = (path: string) => {
		setActivePath(path);
	};

	const renderTree = (nodes: TreeNode) => (
		<TreeItem
			key={nodes.path}
			label={nodes.name || "Unnamed"}
			path={nodes.path}
			activePath={activePath}
			onClick={handleItemClick}
		>
			{Array.isArray(nodes.items) && nodes.items.length > 0
				? nodes.items.map((node) => renderTree(node))
				: null}
		</TreeItem>
	);

	return (
		<div>
			{data.map((treeNode) => renderTree(treeNode))}
		</div>
	);
};

export default Tree;
