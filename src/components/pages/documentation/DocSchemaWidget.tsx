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
const DocSchemaWidget: React.FC = () => {
	return (
		<DocWrapperContent schema_json={schemaDocParams.doc_widget_params}>
			<h2>Документация для Виджетов</h2>

			<p>
				Виджеты используются для компонентов в интерфейсе. В поле{" "}
				<code>data</code> хранятся компоненты, которые могут включать
				текстовые блоки, кнопки, изображения и другие элементы. Виджеты
				позволяют создавать гибкую структуру контента для
				пользовательского интерфейса.
			</p>

			<h3>Поля Виджета:</h3>

			<ul>
				<li>
					<strong>
						<code>type</code>
					</strong>
					: <code>string</code>
					<br />
					Тип виджета. На данный момент поддерживается тип{" "}
					<strong>stories</strong>, который используется для создания
					последовательных слайдов с контентом.
				</li>

				<li>
					<strong>
						<code>data</code>
					</strong>
					: <code>array</code>
					<br />
					Массив компонентов, которые содержатся в виджете. Каждый
					компонент может иметь тип, стили и элементы. Примеры
					компонентов: <code>card</code>, <code>card_outside</code>.
				</li>
			</ul>
		</DocWrapperContent>
	);
};

export default DocSchemaWidget;
