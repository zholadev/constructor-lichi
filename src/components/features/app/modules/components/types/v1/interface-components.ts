import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";

export interface IComponentCardSchema extends ISchemaComponent {}

export interface IComponentCardVideoSchema extends ISchemaComponent {}

export type IComponentTotalDataSchema =
	| IComponentCardSchema
	| IComponentCardVideoSchema;
