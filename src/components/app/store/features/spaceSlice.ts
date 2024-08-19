import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
	DeviceType,
	PlatformType,
	TemplateType,
	ThemeSpaceMode,
} from "@/components/shared/types/types";

interface stateSlice {
	spaceTemplateData: unknown;
	spaceModeTheme: ThemeSpaceMode;
	spaceModeLanguage: string;
	spaceModePreviewShop: string;
	spaceModeDeviceType: DeviceType | null;
	spaceModeDeviceFrame: string;
	spaceModeTemplateType: TemplateType;
	spaceModePlatformType: PlatformType | null;
	spaceTemplatePageId: string | null;
}

const initialState: stateSlice = {
	spaceTemplateData: {},
	spaceModeTheme: "light",
	spaceModeLanguage: "ru",
	spaceModePreviewShop: "ru",
	spaceModeDeviceType: null,
	spaceModeDeviceFrame: "desktop",
	spaceModeTemplateType: "page",
	spaceModePlatformType: null,
	spaceTemplatePageId: null,
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
		spaceModeDeviceTypeReducer: (
			state,
			action: PayloadAction<DeviceType | null>
		) => {
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
		spaceModePlatformTypeReducer: (
			state,
			action: PayloadAction<PlatformType | null>
		) => {
			state.spaceModePlatformType = action.payload;
		},
		spaceTemplatePageIdReducer: (
			state,
			action: PayloadAction<string | null>
		) => {
			state.spaceTemplatePageId = action.payload;
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
	spaceModePlatformTypeReducer,
	spaceTemplatePageIdReducer,
} = spaceSlice.actions;
export default spaceSlice.reducer;
