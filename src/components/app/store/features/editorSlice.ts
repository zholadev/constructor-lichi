import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface stateSlice {
	editorSelectElement: unknown;
	editorVideoPlay: boolean;
	editorSwiperAutoplay: boolean;
}

const initialState: stateSlice = {
	editorSelectElement: false,
	editorVideoPlay: false,
	editorSwiperAutoplay: false,
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
	},
});

export const {
	editorSelectElementReducer,
	editorVideoPlayReducer,
	editorSwiperAutoplayReducer,
} = editorSlice.actions;
export default editorSlice.reducer;
