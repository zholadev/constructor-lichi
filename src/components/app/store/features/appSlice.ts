import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
	ILangListDataItem,
	IShopsListDataItem,
} from "@/components/shared/types/interface";

interface stateSlice {
	languageData: ILangListDataItem[];
	shopsData: IShopsListDataItem[];
}

const initialState: stateSlice = {
	languageData: [],
	shopsData: [],
};

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		languageDataReducer: (
			state,
			action: PayloadAction<ILangListDataItem[]>
		) => {
			state.languageData = action.payload;
		},
		shopsDataReducer: (
			state,
			action: PayloadAction<IShopsListDataItem[]>
		) => {
			state.shopsData = action.payload;
		},
	},
});

export const { languageDataReducer, shopsDataReducer } = appSlice.actions;
export default appSlice.reducer;
