import {
	LinkRelType,
	LinkTargetType,
} from "@/components/shared/types/types-design";

export interface ILinkDesign {
	id: string;
	active?: boolean;
	href: {
		src: string;
		internal_src: string;
	};
	settings?: {
		rel: LinkRelType;
		target: LinkTargetType;
	};
}
