import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";

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
export default function useActiveElement(): any {
	const { editorActiveElementAction } = useDispatchAction();

	const { editorActiveElement } = useAppSelector((state) => state.editor);

	return {};
}
