import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface stateSlice {
	dialogCreatePage: boolean;
	dialogRemovePage: boolean;
	dialogActivatePage: boolean;
	dialogPlatformType: boolean;
}

const initialState: stateSlice = {
	dialogCreatePage: false,
	dialogRemovePage: false,
	dialogActivatePage: false,
	dialogPlatformType: false,
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
		dialogActivatePageReducer: (state, action: PayloadAction<boolean>) => {
			state.dialogActivatePage = action.payload;
		},
		dialogPlatformTypeReducer: (state, action: PayloadAction<boolean>) => {
			state.dialogPlatformType = action.payload;
		},
	},
});

export const {
	dialogCreatePageReducer,
	dialogRemovePageReducer,
	dialogActivatePageReducer,
	dialogPlatformTypeReducer,
} = dialogSlice.actions;
export default dialogSlice.reducer;
