import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface stateSlice {
	boardData: [];
	boardDataLoader: boolean;
}

const initialState: stateSlice = {
	boardData: [],
	boardDataLoader: false,
};

export const boardSlice = createSlice({
	name: "board",
	initialState,
	reducers: {
		getBorderDataReducer: (state, action: PayloadAction<[]>) => {
			state.boardData = action.payload;
		},
		updateBorderLoaderReducer: (state, action: PayloadAction<boolean>) => {
			state.boardDataLoader = action.payload;
		},
	},
});

export const { getBorderDataReducer, updateBorderLoaderReducer } =
	boardSlice.actions;
export default boardSlice.reducer;
