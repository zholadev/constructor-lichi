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
const DocSchemaElements: React.FC = () => {
	return (
		<DocWrapperContent schema_json={schemaDocParams.doc_elements_params}>
			<h2>Элементы: Кнопка, Текст и Таймер</h2>
			<p>
				Эти элементы стилизуются и добавляются с использованием модуля{" "}
				<code>settings</code> и контента из модуля <code>content</code>.
				Элементы включают в себя взаимодействие с пользователями,
				мультиязычные заголовки и таймер с обратным отсчетом.
			</p>
			<h3>Элемент: Кнопка</h3>
			<p>
				Элемент <strong>Кнопка</strong> используется для создания
				интерактивных ссылок, которые могут вести на внешние или
				внутренние страницы с помощью параметра <code>link</code> из
				модуля <code>content</code>.
			</p>

			<h3>Элемент: Текст</h3>
			<p>
				Элемент <strong>Текст</strong> управляет заголовками, которые
				могут быть отображены на нескольких языках, используя параметр{" "}
				<code>title</code> из модуля <code>content</code>.
			</p>

			<h3>Элемент: Таймер</h3>
			<p>
				Элемент <strong>Таймер</strong> используется для создания
				обратного отсчета до указанной даты и времени с помощью
				параметра <code>timer</code> из модуля <code>settings</code>.
			</p>
		</DocWrapperContent>
	);
};

export default DocSchemaElements;
