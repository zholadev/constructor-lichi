import React from "react";
import { ISchemaSettingCategoryListElementsParams } from "@/components/shared/types/interface-schema-settings";
import useStylesFormatted from "@/components/shared/hooks/useStylesFormatted";
import { ProductV1 } from "../../../../types/v1/interface-category-list";
import styles from "./category-card-v1.module.sass";

interface Props {
	product: ProductV1;
	elements: ISchemaSettingCategoryListElementsParams;
}

/**
 * @author Zholaman Zhumanov
 * @created 03.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const CategoryCard: React.FC<Props> = (props) => {
	const { product, elements } = props;

	const styleFormatted = useStylesFormatted();

	return (
		<div className={styles.category_card}>
			<div className={styles.img_block}>
				<img
					src={product.photos?.[0].thumbs?.["768_1024"]}
					alt={product.name}
				/>
			</div>

			<div className={styles.info_block}>
				<h3
					className={styles.name}
					style={{
						...styleFormatted(elements.name.style),
					}}
				>
					{product.name}
				</h3>
				<div
					className={styles.price}
					style={{
						...styleFormatted(elements.price.style),
					}}
				>
					{product?.format_price?.[2]}
				</div>
			</div>
		</div>
	);
};

export default CategoryCard;
