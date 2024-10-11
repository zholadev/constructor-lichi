import { useAppDispatch } from "@/components/app/store/hooks/hooks";
import {
	dialogActivatePageReducer,
	dialogAddComponentReducer,
	dialogAddTemplateReducer,
	dialogCopyTemplateReducer,
	dialogCreateDirectoryReducer,
	dialogCreatePageReducer,
	dialogEditorSettingReducer,
	dialogFileManagerReducer,
	dialogPlatformTypeReducer,
	dialogRemovePageReducer,
	dialogRenameTitleReducer,
	dialogSaveSchemaReducer,
	dialogSchemaViewReducer,
	dialogSettingActionAddComponentReducer,
	dialogStoriesContainerReducer,
	dialogUploadFileReducer,
} from "@/components/app/store/features/dialogSlice";
import {
	ILangListDataItem,
	ISchemaListData,
	IShopsListDataItem,
} from "@/components/shared/types/interface";
import {
	schemaListApiLoadingReducer,
	schemaListApiParamsIdReducer,
	schemaListApiParamsPageReducer,
	schemaListApiTypeReducer,
	schemaListDataReducer,
} from "@/components/app/store/features/schemaListSlice";
import {
	BottomBarTypes,
	DeviceType,
	IContainerType,
	PlatformType,
	TemplateType,
	ThemeSpaceMode,
	TypeMethodSchema,
	WidgetTypes,
} from "@/components/shared/types/types";
import {
	languageDataReducer,
	shopsDataReducer,
} from "@/components/app/store/features/appSlice";
import {
	spaceBottomBarTypeReducer,
	spaceModeDeviceFrameReducer,
	spaceModeDeviceTypeReducer,
	spaceModeLanguageReducer,
	spaceModePlatformTypeReducer,
	spaceModePreviewShopReducer,
	spaceModeTemplateTypeReducer,
	spaceModeThemeReducer,
	spaceTemplateActionDataReducer,
	spaceTemplateApiLoadingReducer,
	spaceTemplateDataReducer,
	spaceTemplatePageIdReducer,
	spaceTemplateSchemaDevicesDataReducer,
} from "@/components/app/store/features/spaceSlice";
import {
	getFolderDataReducer,
	updateFolderCurrentItemReducer,
	updateFolderLoaderReducer,
} from "@/components/app/store/features/folderSlice";
import { pathCurrentFolderReducer } from "@/components/app/store/features/pathSlice";
import {
	getBorderDataReducer,
	updateBorderLoaderReducer,
} from "@/components/app/store/features/boardSlice";
import {
	editorActiveElementReducer,
	editorAddComponentTypeReducer,
	editorAdditionalActiveElementReducer,
	editorDisabledEditReducer,
	editorDraggingTemplateReducer,
	editorHeightPropertyReducer,
	editorNavigatorHoverIdReducer,
	editorPreviewModeReducer,
	editorRemoveTemplateReducer,
	editorSelectAddComponentReducer,
	editorSelectElementReducer,
	editorSwiperAutoplayReducer,
	editorSwiperIndexShowReducer,
	editorVideoPlayReducer,
} from "@/components/app/store/features/editorSlice";
import { IActiveElement } from "@/components/shared/types/interface-editor";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import {
	ISchemaPageData,
	ISchemaTotalData,
} from "@/components/shared/types/interface-schema";

export default function useDispatchAction(): any {
	const dispatch = useAppDispatch();

	return {
		// Dialog actions
		dialogCreatePageAction: (value: boolean) =>
			dispatch(dialogCreatePageReducer(value)),
		dialogRemovePageAction: (value: boolean) =>
			dispatch(dialogRemovePageReducer(value)),
		dialogActivatePageAction: (value: boolean) =>
			dispatch(dialogActivatePageReducer(value)),
		dialogPlatformTypeAction: (value: boolean) =>
			dispatch(dialogPlatformTypeReducer(value)),
		dialogCreateDirectoryAction: (value: boolean) =>
			dispatch(dialogCreateDirectoryReducer(value)),
		dialogUploadFileAction: (value: boolean) =>
			dispatch(dialogUploadFileReducer(value)),
		dialogFileManagerAction: (value: boolean) =>
			dispatch(dialogFileManagerReducer(value)),
		dialogAddTemplateAction: (value: boolean) =>
			dispatch(dialogAddTemplateReducer(value)),
		dialogSaveSchemaAction: (value: boolean) =>
			dispatch(dialogSaveSchemaReducer(value)),
		dialogRenameTitleAction: (value: boolean) =>
			dispatch(dialogRenameTitleReducer(value)),
		dialogEditorSettingAction: (value: boolean) =>
			dispatch(dialogEditorSettingReducer(value)),
		dialogAddComponentAction: (value: boolean) =>
			dispatch(dialogAddComponentReducer(value)),
		dialogSettingActionAddComponentAction: (value: boolean) =>
			dispatch(dialogSettingActionAddComponentReducer(value)),
		dialogStoriesContainerAction: (value: boolean) =>
			dispatch(dialogStoriesContainerReducer(value)),
		dialogSchemaViewAction: (value: boolean) =>
			dispatch(dialogSchemaViewReducer(value)),
		dialogCopyTemplateAction: (value: boolean) =>
			dispatch(dialogCopyTemplateReducer(value)),

		// Schema List
		schemaListDataAction: (data: ISchemaListData) =>
			dispatch(schemaListDataReducer(data)),
		schemaListApiLoadingAction: (value: boolean) =>
			dispatch(schemaListApiLoadingReducer(value)),
		schemaListApiParamsPageAction: (value: number | string) =>
			dispatch(schemaListApiParamsPageReducer(value)),
		schemaListApiParamsIdAction: (value: number) =>
			dispatch(schemaListApiParamsIdReducer(value)),
		schemaListApiTypeAction: (value: TypeMethodSchema) =>
			dispatch(schemaListApiTypeReducer(value)),

		// Site actions
		languageDataAction: (data: ILangListDataItem[]) =>
			dispatch(languageDataReducer(data)),
		shopsDataAction: (data: IShopsListDataItem[]) =>
			dispatch(shopsDataReducer(data)),

		// Editor actions
		editorSelectElementAction: (value: unknown) =>
			dispatch(editorSelectElementReducer(value)),
		editorVideoPlayAction: (value: boolean) =>
			dispatch(editorVideoPlayReducer(value)),
		editorSwiperAutoplayAction: (value: boolean) =>
			dispatch(editorSwiperAutoplayReducer(value)),
		editorSelectAddComponentAction: (value: unknown) =>
			dispatch(editorSelectAddComponentReducer(value)),
		editorDisabledEditAction: (value: boolean) =>
			dispatch(editorDisabledEditReducer(value)),
		editorDraggingTemplateAction: (value: boolean) =>
			dispatch(editorDraggingTemplateReducer(value)),
		editorActiveElementAction: (value: IActiveElement) =>
			dispatch(editorActiveElementReducer(value)),
		editorPreviewModeAction: (value: boolean) =>
			dispatch(editorPreviewModeReducer(value)),
		editorRemoveTemplateAction: (value: boolean) =>
			dispatch(editorRemoveTemplateReducer(value)),
		editorNavigatorHoverIdAction: (value: string | null) =>
			dispatch(editorNavigatorHoverIdReducer(value)),
		editorAddComponentTypeAction: (value: IContainerType) =>
			dispatch(editorAddComponentTypeReducer(value)),
		editorSwiperIndexShowReducerAction: (value: boolean) =>
			dispatch(editorSwiperIndexShowReducer(value)),
		editorAdditionalActiveElementAction: (value: WidgetTypes) =>
			dispatch(editorAdditionalActiveElementReducer(value)),
		editorHeightPropertyAction: (value: WidgetTypes) =>
			dispatch(editorHeightPropertyReducer(value)),

		// Space actions
		spaceModePlatformTypeAction: (value: PlatformType | null) =>
			dispatch(spaceModePlatformTypeReducer(value)),
		spaceTemplateDataAction: (schema: ISchemaContainer[]) =>
			dispatch(spaceTemplateDataReducer(schema)),
		spaceModeThemeAction: (theme: ThemeSpaceMode) =>
			dispatch(spaceModeThemeReducer(theme)),
		spaceModeLanguageAction: (lang: string) =>
			dispatch(spaceModeLanguageReducer(lang)),
		spaceModePreviewShopAction: (value: string) =>
			dispatch(spaceModePreviewShopReducer(value)),
		spaceModeDeviceTypeAction: (value: DeviceType) =>
			dispatch(spaceModeDeviceTypeReducer(value)),
		spaceModeDeviceFrameAction: (value: string) =>
			dispatch(spaceModeDeviceFrameReducer(value)),
		spaceModeTemplateTypeAction: (value: TemplateType) =>
			dispatch(spaceModeTemplateTypeReducer(value)),
		spaceTemplatePageIdAction: (value: string | null) =>
			dispatch(spaceTemplatePageIdReducer(value)),
		spaceTemplateApiLoadingAction: (value: boolean) =>
			dispatch(spaceTemplateApiLoadingReducer(value)),
		spaceTemplateActionDataAction: (value: ISchemaPageData) =>
			dispatch(spaceTemplateActionDataReducer(value)),
		spaceTemplateSchemaDevicesDataAction: (
			key: keyof ISchemaTotalData,
			data: ISchemaContainer[]
		) =>
			dispatch(
				spaceTemplateSchemaDevicesDataReducer({
					deviceType: key,
					data,
				})
			),
		spaceBottomBarTypeAction: (value: BottomBarTypes) =>
			dispatch(spaceBottomBarTypeReducer(value)),

		// FM actions
		getFolderDataAction: (data: []) => dispatch(getFolderDataReducer(data)),
		updateFolderLoaderAction: (value: boolean) =>
			dispatch(updateFolderLoaderReducer(value)),
		updateFolderCurrentItemAction: (value: boolean) =>
			dispatch(updateFolderCurrentItemReducer(value)),
		pathCurrentFolderAction: (value: string) =>
			dispatch(pathCurrentFolderReducer(value)),
		getBorderDataAction: (data: []) => dispatch(getBorderDataReducer(data)),
		updateBorderLoaderAction: (value: boolean) =>
			dispatch(updateBorderLoaderReducer(value)),
	};
}
