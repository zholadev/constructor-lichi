import { useEffect, useState } from "react";

/**
 * @author Zholaman Zhumanov
 * @created 21.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
export default function useFirstRender(): boolean {
	const [firstRender, setFirstRender] = useState<boolean>(true);

	useEffect(() => {
		setFirstRender(false);

		return () => {
			setFirstRender(true);
		};
	}, []);

	return firstRender;
}
