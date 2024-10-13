import { IComponentCardSchema } from "@/components/features/app/modules/components/types/v1/interface-components";
import { IElementTotal } from "@/components/features/app/modules/elements/types/v1/interface-elements";
import { ITemplateBaseSchema } from "@/components/shared/types/interface-templates";

export type ToastType = "success" | "info" | "warning" | "error";
export type TypeMethodSchema = "remove" | "copy" | "initial";
export type ThemeSpaceMode = "light" | "dark";
export type TemplateType = "page" | "saint_laurent";
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
	| "swiper"
	| "saint_laurent_container"
	| "category_list_container"
	| "initial";

export type ISaintLaurentComponentType = "single" | "duo";
export type WidgetTypes = "stories" | "none";

export type TotalComponentTypes =
	| IComponentCardSchema
	| IElementTotal
	| ITemplateBaseSchema;
