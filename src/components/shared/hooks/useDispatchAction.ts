import { useAppDispatch } from "@/components/app/store/hooks/hooks";
import {
	dialogCreatePageReducer,
	dialogRemovePageReducer,
} from "@/components/app/store/features/dialogSlice";
import { ISchemaListData } from "@/components/shared/types/interface";
import {
	schemaListApiLoadingReducer,
	schemaListApiParamsIdReducer,
	schemaListApiParamsPageReducer,
	schemaListApiTypeReducer,
	schemaListDataReducer,
} from "@/components/app/store/features/schemaListSlice";
import { TypeMethodSchema } from "@/components/shared/types/types";

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
		schemaListApiParamsIdAction: (value: number) =>
			dispatch(schemaListApiParamsIdReducer(value)),
		schemaListApiTypeAction: (value: TypeMethodSchema) =>
			dispatch(schemaListApiTypeReducer(value)),
	};
}
