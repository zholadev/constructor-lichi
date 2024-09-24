import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
	DeviceType,
	PlatformType,
	TemplateType,
	ThemeSpaceMode,
} from "@/components/shared/types/types";
import { ITemplateBaseSchema } from "@/components/shared/types/interface-templates";
import {
	ITemplateSchemaDevices,
	ITemplateSpaceActionData,
} from "@/components/shared/types/interface";

interface stateSlice {
	spaceTemplateActionData: ITemplateSpaceActionData;
	spaceTemplateData: ITemplateBaseSchema[];
	spaceTemplateSchemaDevicesData: ITemplateSchemaDevices;
	spaceTemplateApiLoading: boolean;
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
	spaceTemplateActionData: {
		active: [],
		name: "Untitled",
		guid: "unknown_id",
		id: 0,
		meta: {},
	},
	spaceTemplateSchemaDevicesData: {
		desktop: [],
		tablet: [],
		mobile: [],
	},
	spaceTemplateData: [],
	spaceModeTheme: "light",
	spaceModeLanguage: "ru",
	spaceModePreviewShop: "ru",
	spaceModeDeviceType: null,
	spaceModeDeviceFrame: "desktop",
	spaceModeTemplateType: "page",
	spaceModePlatformType: null,
	spaceTemplatePageId: null,
	spaceTemplateApiLoading: false,
};

export const spaceSlice = createSlice({
	name: "space",
	initialState,
	reducers: {
		spaceTemplateDataReducer: (
			state,
			action: PayloadAction<ITemplateBaseSchema[]>
		) => {
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
		spaceTemplateApiLoadingReducer: (
			state,
			action: PayloadAction<boolean>
		) => {
			state.spaceTemplateApiLoading = action.payload;
		},
		spaceTemplateActionDataReducer: (
			state,
			action: PayloadAction<unknown>
		) => {
			state.spaceTemplateActionData = action.payload;
		},
		spaceTemplateSchemaDevicesDataReducer: (
			state,
			action: PayloadAction<{
				deviceType: keyof ITemplateSchemaDevices;
				data: ITemplateBaseSchema[] | [];
			}>
		) => {
			const { deviceType, data } = action.payload;
			state.spaceTemplateSchemaDevicesData[deviceType] = data;
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
	spaceTemplateApiLoadingReducer,
	spaceTemplateActionDataReducer,
	spaceTemplateSchemaDevicesDataReducer,
} = spaceSlice.actions;
export default spaceSlice.reducer;
