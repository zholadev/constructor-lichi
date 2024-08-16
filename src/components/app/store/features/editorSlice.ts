import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface stateSlice {
	editorSelectElement: unknown;
}

const initialState: stateSlice = {
	editorSelectElement: false,
};

export const editorSlice = createSlice({
	name: "editor",
	initialState,
	reducers: {
		editorSelectElementReducer: (state, action: PayloadAction<unknown>) => {
			state.editorSelectElement = action.payload;
		},
	},
});

export const { editorSelectElementReducer } = editorSlice.actions;
export default editorSlice.reducer;
