export type TemplateBaseType = "container" | "swiper";

export interface ITemplateBaseSchema {
	id: string;
	type: TemplateBaseType;
	version: string;
	style: Record<string, unknown>;
	components: Array<{ id: string }>;
}
