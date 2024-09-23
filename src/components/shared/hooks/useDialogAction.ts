import { RootState } from "@/components/app/store/store";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";

interface DialogsState {
	dialogCreatePage: {
		open: boolean;
		toggle: () => void;
	};
	dialogRemovePage: {
		open: boolean;
		toggle: () => void;
	};
	dialogActivatePage: {
		open: boolean;
		toggle: () => void;
	};
	dialogPlatformType: {
		open: boolean;
		toggle: () => void;
	};
	dialogCreateDirectory: {
		open: boolean;
		toggle: () => void;
	};
	dialogUploadFile: {
		open: boolean;
		toggle: () => void;
	};
	dialogFileManager: {
		open: boolean;
		toggle: () => void;
	};
	dialogAddTemplate: {
		open: boolean;
		toggle: () => void;
	};
	dialogSaveSchema: {
		open: boolean;
		toggle: () => void;
	};
	dialogRenameTitle: {
		open: boolean;
		toggle: () => void;
	};
	dialogEditorSetting: {
		open: boolean;
		toggle: () => void;
	};
	dialogAddComponent: {
		open: boolean;
		toggle: () => void;
	};
	dialogSettingActionAddComponentAction: {
		open: boolean;
		toggle: () => void;
	};
}

/**
 * @author Zholaman Zhumanov
 * @created 28.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
export default function useDialogAction(): DialogsState {
	const {
		dialogCreatePageAction,
		dialogRemovePageAction,
		dialogActivatePageAction,
		dialogPlatformTypeAction,
		dialogCreateDirectoryAction,
		dialogUploadFileAction,
		dialogFileManagerAction,
		dialogAddTemplateAction,
		dialogSaveSchemaAction,
		dialogRenameTitleAction,
		dialogEditorSettingAction,
		dialogAddComponentAction,
		dialogSettingActionAddComponentAction
	} = useDispatchAction();

	const {
		dialogCreatePage,
		dialogRemovePage,
		dialogActivatePage,
		dialogPlatformType,
		dialogCreateDirectory,
		dialogUploadFile,
		dialogFileManager,
		dialogAddTemplate,
		dialogSaveSchema,
		dialogRenameTitle,
		dialogEditorSetting,
		dialogAddComponent,
		dialogSettingActionAddComponent
	} = useAppSelector((state: RootState) => state.dialog);

	const toggleDialogCreatePageHandle = () =>
		dialogCreatePageAction(!dialogCreatePage);
	const toggleDialogRemovePageHandle = () =>
		dialogRemovePageAction(!dialogRemovePage);
	const toggleDialogActivatePageHandle = () =>
		dialogActivatePageAction(!dialogActivatePage);
	const toggleDialogPlatformTypeHandle = () =>
		dialogPlatformTypeAction(!dialogPlatformType);
	const toggleDialogCreateDirectoryHandle = () =>
		dialogCreateDirectoryAction(!dialogCreateDirectory);
	const toggleDialogUploadFileHandle = () =>
		dialogUploadFileAction(!dialogUploadFile);
	const toggleDialogFileManagerHandle = () =>
		dialogFileManagerAction(!dialogFileManager);
	const toggleDialogAddTemplateHandle = () =>
		dialogAddTemplateAction(!dialogAddTemplate);
	const toggleDialogSaveSchemaHandle = () =>
		dialogSaveSchemaAction(!dialogSaveSchema);
	const dialogRenameTitleHandle = () =>
		dialogRenameTitleAction(!dialogRenameTitle);
	const dialogEditorSettingHandle = () =>
		dialogEditorSettingAction(!dialogEditorSetting);
	const dialogAddComponentHandle = () =>
		dialogAddComponentAction(!dialogAddComponent);
	const dialogSettingActionAddComponentActionHandle = () =>
		dialogSettingActionAddComponentAction(!dialogSettingActionAddComponent);

	return {
		dialogCreatePage: {
			open: dialogCreatePage,
			toggle: toggleDialogCreatePageHandle,
		},
		dialogRemovePage: {
			open: dialogRemovePage,
			toggle: toggleDialogRemovePageHandle,
		},
		dialogActivatePage: {
			open: dialogActivatePage,
			toggle: toggleDialogActivatePageHandle,
		},
		dialogPlatformType: {
			open: dialogPlatformType,
			toggle: toggleDialogPlatformTypeHandle,
		},
		dialogCreateDirectory: {
			open: dialogCreateDirectory,
			toggle: toggleDialogCreateDirectoryHandle,
		},
		dialogUploadFile: {
			open: dialogUploadFile,
			toggle: toggleDialogUploadFileHandle,
		},
		dialogFileManager: {
			open: dialogFileManager,
			toggle: toggleDialogFileManagerHandle,
		},
		dialogAddTemplate: {
			open: dialogAddTemplate,
			toggle: toggleDialogAddTemplateHandle,
		},
		dialogSaveSchema: {
			open: dialogSaveSchema,
			toggle: toggleDialogSaveSchemaHandle,
		},
		dialogRenameTitle: {
			open: dialogRenameTitle,
			toggle: dialogRenameTitleHandle,
		},
		dialogEditorSetting: {
			open: dialogEditorSetting,
			toggle: dialogEditorSettingHandle,
		},
		dialogAddComponent: {
			open: dialogAddComponent,
			toggle: dialogAddComponentHandle,
		},
		dialogSettingActionAddComponentAction: {
			open: dialogSettingActionAddComponent,
			toggle: dialogSettingActionAddComponentActionHandle,
		}
	};
}
