import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface stateSlice {
	dialogCreatePage: boolean;
	dialogRemovePage: boolean;
}

const initialState: stateSlice = {
	dialogCreatePage: false,
	dialogRemovePage: false,
};

export const dialogSlice = createSlice({
	name: "dialog",
	initialState,
	reducers: {
		dialogCreatePageReducer: (state, action: PayloadAction<boolean>) => {
			state.dialogCreatePage = action.payload;
		},
		dialogRemovePageReducer: (state, action: PayloadAction<boolean>) => {
			state.dialogRemovePage = action.payload;
		},
	},
});

export const { dialogCreatePageReducer, dialogRemovePageReducer } =
	dialogSlice.actions;
export default dialogSlice.reducer;
