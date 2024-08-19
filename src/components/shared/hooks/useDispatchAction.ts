import { useAppDispatch } from "@/components/app/store/hooks/hooks";
import {
	dialogActivatePageReducer,
	dialogCreatePageReducer,
	dialogPlatformTypeReducer,
	dialogRemovePageReducer,
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
	DeviceType,
	PlatformType,
	TemplateType,
	ThemeSpaceMode,
	TypeMethodSchema,
} from "@/components/shared/types/types";
import {
	languageDataReducer,
	shopsDataReducer,
} from "@/components/app/store/features/appSlice";
import {
	spaceModeDeviceFrameReducer,
	spaceModeDeviceTypeReducer,
	spaceModeLanguageReducer,
	spaceModePlatformTypeReducer,
	spaceModePreviewShopReducer,
	spaceModeTemplateTypeReducer,
	spaceModeThemeReducer,
	spaceTemplateDataReducer,
} from "@/components/app/store/features/spaceSlice";

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

		// Space actions
		spaceModePlatformTypeAction: (value: PlatformType | null) =>
			dispatch(spaceModePlatformTypeReducer(value)),
		spaceTemplateDataAction: (schema: unknown) =>
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
	};
}
