import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TemplateType, ThemeSpaceMode } from "@/components/shared/types/types";

interface stateSlice {
	spaceTemplateData: unknown;
	modeTheme: ThemeSpaceMode;
	modeLanguage: string;
	modePreviewShop: string;
	modeDeviceType: string;
	modeDeviceFrame: string;
	modeTemplateType: TemplateType;
}

const initialState: stateSlice = {
	spaceTemplateData: {},
	modeTheme: "light",
	modeLanguage: "ru",
	modePreviewShop: "ru",
	modeDeviceType: "pc",
	modeDeviceFrame: "desktop",
	modeTemplateType: "default",
};

export const spaceSlice = createSlice({
	name: "space",
	initialState,
	reducers: {
		spaceTemplateDataReducer: (state, action: PayloadAction<unknown>) => {
			state.spaceTemplateData = action.payload;
		},
		modeThemeReducer: (state, action: PayloadAction<ThemeSpaceMode>) => {
			state.modeTheme = action.payload;
		},
		modeLanguageReducer: (state, action: PayloadAction<string>) => {
			state.modeLanguage = action.payload;
		},
		modePreviewShopReducer: (state, action: PayloadAction<string>) => {
			state.modePreviewShop = action.payload;
		},
		modeDeviceTypeReducer: (state, action: PayloadAction<string>) => {
			state.modeDeviceType = action.payload;
		},
		modeDeviceFrameReducer: (state, action: PayloadAction<string>) => {
			state.modeDeviceFrame = action.payload;
		},
		modeTemplateTypeReducer: (
			state,
			action: PayloadAction<TemplateType>
		) => {
			state.modeTemplateType = action.payload;
		},
	},
});

export const {
	spaceTemplateDataReducer,
	modeThemeReducer,
	modeLanguageReducer,
	modePreviewShopReducer,
	modeDeviceTypeReducer,
	modeDeviceFrameReducer,
	modeTemplateTypeReducer,
} = spaceSlice.actions;
export default spaceSlice.reducer;
