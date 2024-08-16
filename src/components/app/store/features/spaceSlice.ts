import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TemplateType, ThemeSpaceMode } from "@/components/shared/types/types";

interface stateSlice {
	spaceTemplateData: unknown;
	spaceModeTheme: ThemeSpaceMode;
	spaceModeLanguage: string;
	spaceModePreviewShop: string;
	spaceModeDeviceType: string;
	spaceModeDeviceFrame: string;
	spaceModeTemplateType: TemplateType;
}

const initialState: stateSlice = {
	spaceTemplateData: {},
	spaceModeTheme: "light",
	spaceModeLanguage: "ru",
	spaceModePreviewShop: "ru",
	spaceModeDeviceType: "pc",
	spaceModeDeviceFrame: "desktop",
	spaceModeTemplateType: "page",
};

export const spaceSlice = createSlice({
	name: "space",
	initialState,
	reducers: {
		spaceTemplateDataReducer: (state, action: PayloadAction<unknown>) => {
			state.spaceTemplateData = action.payload;
		},
		spaceModeThemeReducer: (
			state,
			action: PayloadAction<ThemeSpaceMode>
		) => {
			state.spaceModeTheme = action.payload;
		},
		spaceModeLanguageReducer: (state, action: PayloadAction<string>) => {
			state.spaceModeLanguage = action.payload;
		},
		spaceModePreviewShopReducer: (state, action: PayloadAction<string>) => {
			state.spaceModePreviewShop = action.payload;
		},
		spaceModeDeviceTypeReducer: (state, action: PayloadAction<string>) => {
			state.spaceModeDeviceType = action.payload;
		},
		spaceModeDeviceFrameReducer: (state, action: PayloadAction<string>) => {
			state.spaceModeDeviceFrame = action.payload;
		},
		spaceModeTemplateTypeReducer: (
			state,
			action: PayloadAction<TemplateType>
		) => {
			state.spaceModeTemplateType = action.payload;
		},
	},
});

export const {
	spaceTemplateDataReducer,
	spaceModeThemeReducer,
	spaceModeLanguageReducer,
	spaceModePreviewShopReducer,
	spaceModeDeviceTypeReducer,
	spaceModeDeviceFrameReducer,
	spaceModeTemplateTypeReducer,
} = spaceSlice.actions;
export default spaceSlice.reducer;
