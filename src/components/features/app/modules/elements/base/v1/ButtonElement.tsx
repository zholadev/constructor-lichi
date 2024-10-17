import React from "react";
import useStylesFormatted from "@/components/shared/hooks/useStylesFormatted";
import { ISchemaElementInterfaces } from "../../types/v1/interface-elements";

interface Props<T extends ISchemaElementInterfaces> {
	data: T;
	title: string;
}

/**
 * @author Zholaman Zhumanov
 * @created 03.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const ButtonElement: React.FC<Props<ISchemaElementInterfaces>> = (props) => {
	const { data, title } = props;

	const styleFormatted = useStylesFormatted();

	if (!data) {
		return <div />;
	}

	return (
		<button
			type="button"
			style={{
				...styleFormatted(data.style, !data.settings?.view.darkTheme),
			}}
		>
			{title ?? "Default Title"}
		</button>
	);
};

export default ButtonElement;
