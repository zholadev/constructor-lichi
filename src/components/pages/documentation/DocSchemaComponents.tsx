import React from "react";
import DocWrapperContent from "@/components/pages/documentation/DocWrapperContent";
import { schemaDocParams } from "@/components/shared/utils/doc-schema";

/**
 * @author Zholaman Zhumanov
 * @created 13.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const DocSchemaComponents: React.FC = () => {
	return (
		<DocWrapperContent schema_json={schemaDocParams.doc_components_params}>
			<h2>Документация для Компонентов</h2>

			<p>
				Компоненты хранятся в контейнерах и используются для отображения
				различных элементов интерфейса. Они могут иметь различные типы,
				которые определяют их внешний вид и взаимодействие. Ниже
				приведено краткое описание каждого типа компонента.
			</p>

			<h3>Типы компонентов:</h3>

			<ul>
				<li>
					<strong>
						<code>card</code>
					</strong>
					:<br />
					Компонент используется для отображения стандартной карточки
					с контентом (изображение, текст, ссылки). Применяется для
					показа элементов списка, таких как товары, услуги и прочее.
					Элементы находится внутри карточки
				</li>

				<li>
					<strong>
						<code>card_outside</code>
					</strong>
					:<br />
					Карточка с элементами, которые отображаются снаружи
					основного блока карточки. Используется для акцентирования
					дополнительных элементов вне стандартной карточки.
				</li>

				<li>
					<strong>
						<code>album</code>
					</strong>
					:<br />
					Полноэкранный компонент, который отображает крупный контент,
					как альбом. Идеально подходит для галерей изображений,
					слайд-шоу или другого полноэкранного контента.
				</li>

				<li>
					<strong>
						<code>saint_laurent</code>
					</strong>
					:<br />
					Компонент со специфической стилизацией в стиле бренда{" "}
					<strong>Saint Laurent</strong>. Используется для создания
					страниц с фирменным дизайном.
				</li>

				<li>
					<strong>
						<code>category_list</code>
					</strong>
					:<br />
					Компонент для отображения списка категорий. Может
					использовать два типа карточек:
					<ul>
						<li>
							<strong>
								<code>card</code>
							</strong>
							: стандартные карточки для каждой категории.
						</li>
						<li>
							<strong>
								<code>card_outside</code>
							</strong>
							: карточки с элементами, размещенными снаружи
							основного блока.
						</li>
					</ul>
				</li>
			</ul>
		</DocWrapperContent>
	);
};

export default DocSchemaComponents;
