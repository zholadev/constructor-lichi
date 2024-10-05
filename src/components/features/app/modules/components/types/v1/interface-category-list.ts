interface Blurhash {
	colors: string[];
	luminance: number;
}

interface Thumbs {
	"768_1024": string;
	"384_512": string;
}

interface Photo {
	big: string;
	thumbs: Thumbs;
	blurhash: string;
	basicColor: Blurhash;
}

interface Currency {
	id: number;
	prefix: string;
	prefix_symbol: string;
	postfix: string;
	postfix_symbol: string;
}

interface Measurement {
	name: string;
	value: number;
}

interface Measurements {
	XS?: Measurement[];
	S?: Measurement[];
	M?: Measurement[];
	L?: Measurement[];
}

interface Model {
	size: string;
	growth: number;
	chest: number;
	waist: number;
	hips: number;
}

interface Size {
	id: number;
	name: string;
	amount: number;
	amount_real: number;
	show: boolean;
	barcode: string;
	subscribe: boolean;
}

interface Sizes {
	[key: string]: Size;
}

interface ColorSample {
	pcs_article: string;
	pcs_index: number;
	pcs_x: number;
	pcs_y: number;
	pcs_path: string;
	pi_photo: string;
}

interface CurrentColor {
	id: number;
	name: string;
	amount: number;
	amount_real: number;
	value: string;
	show: boolean;
	price: string;
	color_sample: ColorSample;
	photo: Photo;
}

interface OtherColor {
	id: number;
	name: string;
	amount: number;
	amount_real: number;
	value: string;
	show: boolean;
	price: string;
	color_sample: ColorSample;
	photo: Photo;
}

interface Colors {
	current: CurrentColor;
	other: OtherColor[];
}

interface Material {
	name: string;
	percent: number;
}

interface Details {
	[key: string]: Material;
}

interface ProductDetails {
	materials: Details;
}

interface Descriptions {
	mark_down: string;
	html: string;
	text: string;
}

export interface ProductV1 {
	id: number;
	template: string;
	brand_id: string;
	brand_name: string;
	brand_icon: string | null;
	category_id: string;
	category_ids: string[];
	parent_category_ids: { id: string; url: string; name: string }[][];
	category_name: string;
	type: string;
	article: string;
	popular: number;
	size_details: any[];
	price: number;
	block: boolean;
	original_price: number;
	coming_soon: boolean;
	date_create: string;
	saleaction: boolean;
	currency: Currency;
	photos: Photo[];
	videos: any[];
	video_cover: any[];
	favorite: boolean;
	count: number;
	subscribe: boolean;
	season: string | null;
	name_old: string;
	name: string;
	descriptions: Descriptions;
	material_descriptions: Descriptions;
	measurements: Measurements;
	measurements_unit: string;
	model: Model;
	stores: any[];
	sizes: Sizes;
	is_ffm: boolean;
	colors: Colors;
	format_price: string[];
	details_name: { materials: string };
	details: ProductDetails;
	care: string[];
	soldout: boolean;
	available: boolean;
}
