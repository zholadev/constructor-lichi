import React from "react";
import { ProductV1 } from "../../../../types/v1/interface-category-list";
import styles from "./category-card-v1.module.sass";

interface Props {
	product: ProductV1;
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
	const { product } = props;

	return (
		<div className={styles.category_card}>
			<div className={styles.img_block}>
				<img
					src={product.photos?.[0].thumbs?.["768_1024"]}
					alt={product.name}
				/>
			</div>

			<div className={styles.info_block}>
				<h3 className={styles.name}>{product.name}</h3>
				<div className={styles.price}>{product?.format_price?.[2]}</div>
			</div>
		</div>
	);
};

export default CategoryCard;
