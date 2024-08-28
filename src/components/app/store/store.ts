"use client";

import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { dialogSlice } from "./features/dialogSlice";
import { schemaListSlice } from "./features/schemaListSlice";
import { appSlice } from "./features/appSlice";
import { spaceSlice } from "./features/spaceSlice";
import { folderSlice } from "./features/folderSlice";
import { pathSlice } from "./features/pathSlice";
import { boardSlice } from "./features/boardSlice";
import { editorSlice } from "./features/editorSlice";

export const siteStore = (): EnhancedStore => {
	return configureStore({
		reducer: {
			dialog: dialogSlice.reducer,
			schemaList: schemaListSlice.reducer,
			app: appSlice.reducer,
			space: spaceSlice.reducer,
			folder: folderSlice.reducer,
			path: pathSlice.reducer,
			board: boardSlice.reducer,
			editor: editorSlice.reducer,
		},
	});
};

export type AppStore = ReturnType<typeof siteStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
