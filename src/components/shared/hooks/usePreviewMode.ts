import { useAppSelector } from "@/components/app/store/hooks/hooks";

interface PreviewMode {
	showIndexSwiper: boolean;
	previewModeEditor: boolean;
}

/**
 * @author Zholaman Zhumanov
 * @created 08.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
export default function usePreviewMode(): PreviewMode {
	const { editorPreviewMode, editorSwiperIndexShow } = useAppSelector(
		(state) => state.editor
	);

	return {
		showIndexSwiper: editorSwiperIndexShow && !editorPreviewMode,
		previewModeEditor: editorPreviewMode,
	};
}
