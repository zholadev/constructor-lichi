import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ISchemaListData } from "@/components/shared/types/interface";
import { TypeMethodSchema } from "@/components/shared/types/types";

interface stateSlice {
	schemaListData: ISchemaListData;
	schemaListApiLoading: boolean;
	schemaListApiParamsPage: number | string;
	schemaListApiParamsId: number;
	schemaListApiType: TypeMethodSchema;
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
	schemaListApiParamsId: 0,
	schemaListApiType: "initial",
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
		schemaListApiParamsIdReducer: (
			state,
			action: PayloadAction<number>
		) => {
			state.schemaListApiParamsId = action.payload;
		},
		schemaListApiTypeReducer: (
			state,
			action: PayloadAction<TypeMethodSchema>
		) => {
			state.schemaListApiType = action.payload;
		},
	},
});

export const {
	schemaListDataReducer,
	schemaListApiLoadingReducer,
	schemaListApiParamsPageReducer,
	schemaListApiParamsIdReducer,
	schemaListApiTypeReducer,
} = schemaListSlice.actions;
export default schemaListSlice.reducer;
