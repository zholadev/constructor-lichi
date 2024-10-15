import {
	ISchemaButtonElement,
	ISchemaElementInterfaces,
} from "@/components/features/app/modules/elements/types/v1/interface-elements";

export const isCheckSchemaButtonElement = (
	element: ISchemaElementInterfaces
): element is ISchemaButtonElement => {
	return (element as ISchemaButtonElement).content?.title !== undefined;
};
