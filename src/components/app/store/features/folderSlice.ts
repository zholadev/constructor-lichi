import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface stateSlice {
	folderData: [];
	folderDataLoader: boolean;
	folderCurrentItem: string | unknown;
}

const initialState: stateSlice = {
	folderData: [],
	folderDataLoader: false,
	folderCurrentItem: null,
};

export const folderSlice = createSlice({
	name: "folder",
	initialState,
	reducers: {
		getFolderDataReducer: (state, action: PayloadAction<[]>) => {
			state.folderData = action.payload;
		},
		updateFolderLoaderReducer: (state, action: PayloadAction<boolean>) => {
			state.folderDataLoader = action.payload;
		},
		updateFolderCurrentItemReducer: (
			state,
			action: PayloadAction<string | unknown>
		) => {
			state.folderCurrentItem = action.payload;
		},
	},
});

export const {
	getFolderDataReducer,
	updateFolderLoaderReducer,
	updateFolderCurrentItemReducer,
} = folderSlice.actions;
export default folderSlice.reducer;
