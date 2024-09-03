import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IActiveElement } from "@/components/shared/types/interface-editor";

interface stateSlice {
	editorSelectElement: unknown;
	editorVideoPlay: boolean;
	editorSwiperAutoplay: boolean;
	editorSelectAddComponent: unknown;
	editorDisabledEdit: boolean;
	editorDraggingTemplate: boolean;
	editorActiveElement: IActiveElement;
	editorPreviewMode: boolean;
	editorRemoveTemplate: boolean;
}

const initialState: stateSlice = {
	editorSelectElement: false,
	editorVideoPlay: false,
	editorSwiperAutoplay: false,
	editorSelectAddComponent: {},
	editorDisabledEdit: false,
	editorDraggingTemplate: false,
	editorActiveElement: { id: "", componentData: {}, containerId: "" },
	editorPreviewMode: false,
	editorRemoveTemplate: false,
};

export const editorSlice = createSlice({
	name: "editor",
	initialState,
	reducers: {
		editorSelectElementReducer: (state, action: PayloadAction<unknown>) => {
			state.editorSelectElement = action.payload;
		},
		editorVideoPlayReducer: (state, action: PayloadAction<boolean>) => {
			state.editorVideoPlay = action.payload;
		},
		editorSwiperAutoplayReducer: (
			state,
			action: PayloadAction<boolean>
		) => {
			state.editorSwiperAutoplay = action.payload;
		},
		editorSelectAddComponentReducer: (
			state,
			action: PayloadAction<unknown>
		) => {
			state.editorSelectAddComponent = action.payload;
		},
		editorDisabledEditReducer: (state, action: PayloadAction<boolean>) => {
			state.editorDisabledEdit = action.payload;
		},
		editorDraggingTemplateReducer: (
			state,
			action: PayloadAction<boolean>
		) => {
			state.editorDraggingTemplate = action.payload;
		},
		editorActiveElementReducer: (
			state,
			action: PayloadAction<IActiveElement>
		) => {
			state.editorActiveElement = action.payload;
		},
		editorPreviewModeReducer: (state, action: PayloadAction<boolean>) => {
			state.editorPreviewMode = action.payload;
		},
		editorRemoveTemplateReducer: (
			state,
			action: PayloadAction<boolean>
		) => {
			state.editorRemoveTemplate = action.payload;
		},
	},
});

export const {
	editorSelectElementReducer,
	editorVideoPlayReducer,
	editorSwiperAutoplayReducer,
	editorSelectAddComponentReducer,
	editorDisabledEditReducer,
	editorDraggingTemplateReducer,
	editorActiveElementReducer,
	editorPreviewModeReducer,
	editorRemoveTemplateReducer,
} = editorSlice.actions;
export default editorSlice.reducer;
