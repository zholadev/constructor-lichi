import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface stateSlice {
	editorSelectElement: unknown;
	editorVideoPlay: boolean;
	editorSwiperAutoplay: boolean;
	editorSelectAddComponent: unknown;
	editorDisabledEdit: boolean;
	editorDraggingTemplate: boolean;
}

const initialState: stateSlice = {
	editorSelectElement: false,
	editorVideoPlay: false,
	editorSwiperAutoplay: false,
	editorSelectAddComponent: {},
	editorDisabledEdit: false,
	editorDraggingTemplate: false,
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
	},
});

export const {
	editorSelectElementReducer,
	editorVideoPlayReducer,
	editorSwiperAutoplayReducer,
	editorSelectAddComponentReducer,
	editorDisabledEditReducer,
	editorDraggingTemplateReducer
} = editorSlice.actions;
export default editorSlice.reducer;
