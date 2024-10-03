export const API: Record<string, Record<string, string>> = {
	file: {
		tree: "Tree",
		get: "Get",
		uploadFile: "UploadFile",
		createDir: "CreateDir",
		remove: "Remove",
	},
	schema: {
		langList: "LanguageList",
		getShops: "GetShops",
		list: "List",
		saveSchema: "SaveSchema",
		getById: "GetById",
		deleteSchema: "Delete",
		copy: "Copy",
		create: "Create",
		setActive: "SetActive",
		updateMeta: "UpdateMeta",
	},
	site: {
		categoryList: "/category/get_category_list",
		siteInfo: "/site/info",
		categoryProductList: "/category/get_category_product_list",
	},
};
