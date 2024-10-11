import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IActiveElement } from "@/components/shared/types/interface-editor";
import { WidgetTypes, IContainerType } from "@/components/shared/types/types";

interface stateSlice {
	editorSelectElement: unknown;
	editorVideoPlay: boolean;
	editorSwiperAutoplay: boolean;
	editorSelectAddComponent: unknown;
	editorDisabledEdit: boolean;
	editorDraggingTemplate: boolean;
	editorActiveElement: IActiveElement;
	editorPreviewMode: boolean;
	editorRemoveTemplate: boolean;
	editorNavigatorHoverId: string | null;
	editorAddComponentType: IContainerType;
	editorSwiperIndexShow: boolean;
	editorAdditionalActiveElement: WidgetTypes;
	editorHeightProperty: string;
}

const initialState: stateSlice = {
	editorSelectElement: false,
	editorVideoPlay: false,
	editorSwiperAutoplay: false,
	editorSelectAddComponent: {},
	editorDisabledEdit: false,
	editorDraggingTemplate: false,
	editorActiveElement: { id: "", componentData: {}, containerId: "" },
	editorPreviewMode: false,
	editorRemoveTemplate: false,
	editorNavigatorHoverId: null,
	editorAddComponentType: "initial",
	editorSwiperIndexShow: true,
	editorAdditionalActiveElement: "none",
	editorHeightProperty: "100%",
};

export const editorSlice = createSlice({
	name: "editor",
	initialState,
	reducers: {
		editorSelectElementReducer: (state, action: PayloadAction<unknown>) => {
			state.editorSelectElement = action.payload;
		},
		editorVideoPlayReducer: (state, action: PayloadAction<boolean>) => {
			state.editorVideoPlay = action.payload;
		},
		editorSwiperAutoplayReducer: (
			state,
			action: PayloadAction<boolean>
		) => {
			state.editorSwiperAutoplay = action.payload;
		},
		editorSelectAddComponentReducer: (
			state,
			action: PayloadAction<unknown>
		) => {
			state.editorSelectAddComponent = action.payload;
		},
		editorDisabledEditReducer: (state, action: PayloadAction<boolean>) => {
			state.editorDisabledEdit = action.payload;
		},
		editorDraggingTemplateReducer: (
			state,
			action: PayloadAction<boolean>
		) => {
			state.editorDraggingTemplate = action.payload;
		},
		editorActiveElementReducer: (
			state,
			action: PayloadAction<IActiveElement>
		) => {
			state.editorActiveElement = action.payload;
		},
		editorPreviewModeReducer: (state, action: PayloadAction<boolean>) => {
			state.editorPreviewMode = action.payload;
		},
		editorRemoveTemplateReducer: (
			state,
			action: PayloadAction<boolean>
		) => {
			state.editorRemoveTemplate = action.payload;
		},
		editorNavigatorHoverIdReducer: (
			state,
			action: PayloadAction<string | null>
		) => {
			state.editorNavigatorHoverId = action.payload;
		},
		editorAddComponentTypeReducer: (
			state,
			action: PayloadAction<IContainerType>
		) => {
			state.editorAddComponentType = action.payload;
		},
		editorSwiperIndexShowReducer: (
			state,
			action: PayloadAction<boolean>
		) => {
			state.editorSwiperIndexShow = action.payload;
		},
		editorAdditionalActiveElementReducer: (
			state,
			action: PayloadAction<WidgetTypes>
		) => {
			state.editorAdditionalActiveElement = action.payload;
		},
		editorHeightPropertyReducer: (state, action: PayloadAction<string>) => {
			state.editorHeightProperty = action.payload;
		},
	},
});

export const {
	editorSelectElementReducer,
	editorVideoPlayReducer,
	editorSwiperAutoplayReducer,
	editorSelectAddComponentReducer,
	editorDisabledEditReducer,
	editorDraggingTemplateReducer,
	editorActiveElementReducer,
	editorPreviewModeReducer,
	editorRemoveTemplateReducer,
	editorNavigatorHoverIdReducer,
	editorAddComponentTypeReducer,
	editorSwiperIndexShowReducer,
	editorAdditionalActiveElementReducer,
	editorHeightPropertyReducer,
} = editorSlice.actions;
export default editorSlice.reducer;
