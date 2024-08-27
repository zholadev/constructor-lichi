export type TemplateBaseType = "container" | "swiper";

export interface TemplateBaseSchema {
	id: string;
	type: TemplateBaseType;
	version: string;
	style: Record<string, unknown>;
	components: Array<{ id: string }>;
}
