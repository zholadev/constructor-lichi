import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface stateSlice {
	pathCurrentFolder: string;
}

const initialState: stateSlice = {
	pathCurrentFolder: "/",
};

export const pathSlice = createSlice({
	name: "path",
	initialState,
	reducers: {
		pathCurrentFolderReducer: (state, action: PayloadAction<string>) => {
			state.pathCurrentFolder = action.payload;
		},
	},
});

export const { pathCurrentFolderReducer } = pathSlice.actions;
export default pathSlice.reducer;
