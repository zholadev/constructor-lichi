import { useAppDispatch } from "@/components/app/store/hooks/hooks";
import {
	dialogActivatePageReducer,
	dialogCreatePageReducer,
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
import { TypeMethodSchema } from "@/components/shared/types/types";
import {
	languageDataReducer,
	shopsDataReducer,
} from "@/components/app/store/features/appSlice";

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
	};
}
