import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ISchemaListData } from "@/components/shared/types/interface";

interface stateSlice {
	schemaListData: ISchemaListData;
	schemaListApiLoading: boolean;
	schemaListApiParamsPage: number | string;
	schemaListRemoveId: number;
}

const initialState: stateSlice = {
	schemaListData: {
		data: [],
		pagination: {
			total: 0,
			page: 1,
			max_page: 1,
			limit: 10,
		},
	},
	schemaListApiLoading: false,
	schemaListApiParamsPage: 1,
	schemaListRemoveId: 0,
};

export const schemaListSlice = createSlice({
	name: "schemaList",
	initialState,
	reducers: {
		schemaListDataReducer: (
			state,
			action: PayloadAction<ISchemaListData>
		) => {
			state.schemaListData = action.payload;
		},
		schemaListApiLoadingReducer: (
			state,
			action: PayloadAction<boolean>
		) => {
			state.schemaListApiLoading = action.payload;
		},
		schemaListApiParamsPageReducer: (
			state,
			action: PayloadAction<number | string>
		) => {
			state.schemaListApiParamsPage = action.payload;
		},
		schemaListRemoveIdReducer: (state, action: PayloadAction<number>) => {
			state.schemaListRemoveId = action.payload;
		},
	},
});

export const {
	schemaListDataReducer,
	schemaListApiLoadingReducer,
	schemaListApiParamsPageReducer,
	schemaListRemoveIdReducer,
} = schemaListSlice.actions;
export default schemaListSlice.reducer;
