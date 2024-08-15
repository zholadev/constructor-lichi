import { useAppDispatch } from "@/components/app/store/hooks/hooks";
import {
	dialogCreatePageReducer,
	dialogRemovePageReducer,
} from "@/components/app/store/features/dialogSlice";
import { ISchemaListData } from "@/components/shared/types/interface";
import {
	schemaListApiLoadingReducer,
	schemaListApiParamsPageReducer,
	schemaListDataReducer,
	schemaListRemoveIdReducer,
} from "@/components/app/store/features/schemaListSlice";

export default function useDispatchAction(): any {
	const dispatch = useAppDispatch();

	return {
		// Dialog actions
		dialogCreatePageAction: (value: boolean) =>
			dispatch(dialogCreatePageReducer(value)),
		dialogRemovePageAction: (value: boolean) =>
			dispatch(dialogRemovePageReducer(value)),

		// Schema List
		schemaListDataAction: (data: ISchemaListData) =>
			dispatch(schemaListDataReducer(data)),
		schemaListApiLoadingAction: (value: boolean) =>
			dispatch(schemaListApiLoadingReducer(value)),
		schemaListApiParamsPageAction: (value: number | string) =>
			dispatch(schemaListApiParamsPageReducer(value)),
		schemaListRemoveIdAction: (value: number) =>
			dispatch(schemaListRemoveIdReducer(value)),
	};
}
