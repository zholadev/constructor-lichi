import {
	IComponentCardSchema,
	IComponentCardVideoSchema,
} from "@/components/features/app/ui/components/types/v1/interface-components";
import { IElementTotal } from "@/components/features/app/ui/elements/types/interface-elements";
import { ITemplateBaseSchema } from "@/components/shared/types/interface-templates";

export type ToastType = "success" | "info" | "warning" | "error";
export type TypeMethodSchema = "remove" | "copy" | "initial";
export type ThemeSpaceMode = "light" | "dark";
export type TemplateType = "page" | "creative";
export type PlatformType = "browser" | "app";
export type DeviceType = "desktop" | "laptop" | "tablet" | "mobile";
export type ActiveElementType =
	| "component"
	| "element"
	| "container"
	| "swiper"
	| "none";

export type ImageType = "card" | "album";

export type IContainerType =
	| "container"
	| "swiper"
	| "saint_laurent_container"
	| "category_list_container"
	| "initial";

export type ISaintLaurentComponentType = "single" | "duo";
export type AdditionalTypes = "stories" | "none";

export type TotalComponentTypes =
	| IComponentCardSchema
	| IComponentCardVideoSchema
	| IElementTotal
	| ITemplateBaseSchema;
