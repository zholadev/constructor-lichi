"use client";

import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { dialogSlice } from "./features/dialogSlice";
import { schemaListSlice } from "./features/schemaListSlice";

export const siteStore = (): EnhancedStore => {
	return configureStore({
		reducer: {
			dialog: dialogSlice.reducer,
			schemaList: schemaListSlice.reducer,
		},
	});
};

export type AppStore = ReturnType<typeof siteStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
