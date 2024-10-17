import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import {
	ISchemaElementInterfaces,
	ISchemaElements,
} from "@/components/features/app/modules/elements/types/v1/interface-elements";

export type ThemeType = "light" | "dark" | "system";
export type ToastType = "success" | "info" | "warning" | "error";
export type TypeMethodSchema = "remove" | "copy" | "initial";
export type ThemeSpaceMode = "light" | "dark";
export type TemplateType = "page" | "creative";
export type BottomBarTypes = "transparent" | "default";
export type PlatformType = "browser" | "app";
export type DeviceType = "desktop" | "laptop" | "tablet" | "mobile" | "unknown";
export type ActiveElementType =
	| "component"
	| "element"
	| "container"
	| "swiper"
	| "none";

export type ImageType = "card" | "album";

export type DisplayContainerType = "block" | "swiper";
export type IContainerType =
	| "container"
	| "saint_laurent_container"
	| "category_list_container"
	| "initial";

export type ISaintLaurentComponentType = "single" | "duo";
export type WidgetTypes = "stories" | "none";

export type SchemaData =
	| ISchemaComponent
	| ISchemaContainer
	| ISchemaElements
	| ISchemaElementInterfaces;
