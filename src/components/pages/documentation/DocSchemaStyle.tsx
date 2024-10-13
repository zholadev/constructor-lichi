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
const DocSchemaStyle: React.FC = () => {
	return (
		<>
			<DocWrapperContent
				schema_json={schemaDocParams.doc_style_bg_params}
			>
				<h2>
					Документация по свойствам <code>backgroundColor</code> и{" "}
					<code>backgroundColorDark</code>
				</h2>

				<h3>Описание полей:</h3>
				<ul>
					<li>
						<strong>
							<code>backgroundColor</code>
						</strong>
						:<br />
						<strong>Тип:</strong> <code>string</code>
						<br />
						Это свойство, которое задает основной цвет фона для
						элемента. Значение должно быть в формате CSS-цветов,
						например: <code>#FFFFFF</code>,{" "}
						<code>rgb(255, 255, 255)</code>, или имя цвета, например{" "}
						<code>white</code>.
					</li>
					<li>
						<strong>
							<code>backgroundColorDark</code>
						</strong>{" "}
						(необязательное):
						<br />
						<strong>Тип:</strong> <code>string</code>
						<br />
						Это опциональное свойство, которое задает цвет фона для
						элемента в темном режиме. Если оно не задано,
						используется значение <code>backgroundColor</code>.
						Значение также должно быть в формате CSS-цветов.
					</li>
				</ul>
			</DocWrapperContent>

			<DocWrapperContent
				schema_json={schemaDocParams.doc_style_border_params}
			>
				<h2>
					Документация по свойствам <code>border</code>,{" "}
					<code>borderDark</code>, <code>borderBottom</code> и{" "}
					<code>borderBottomDark</code>
				</h2>

				<h3>Описание полей:</h3>
				<ul>
					<li>
						<strong>
							<code>border</code>
						</strong>
						:<br />
						<strong>Тип:</strong> <code>string</code>
						<br />
						Это свойство устанавливает общую границу элемента. Цвет,
						толщина и стиль могут быть указаны в формате CSS,
						например: <code>1px solid black</code> или{" "}
						<code>2px dashed #333</code>.
					</li>

					<li>
						<strong>
							<code>borderDark</code>
						</strong>{" "}
						(необязательное):
						<br />
						<strong>Тип:</strong> <code>string</code>
						<br />
						Опциональное свойство, которое задает границу для
						темного режима. Если это свойство не задано, будет
						использоваться значение из <code>border</code>.
					</li>
				</ul>
			</DocWrapperContent>

			<DocWrapperContent
				schema_json={schemaDocParams.doc_style_border_params}
			>
				<h2>
					Документация по свойствам <code>border</code>,{" "}
					<code>borderDark</code>, <code>borderBottom</code> и{" "}
					<code>borderBottomDark</code>
				</h2>

				<h3>Описание полей:</h3>
				<ul>
					<li>
						<strong>
							<code>border</code>
						</strong>
						:<br />
						<strong>Тип:</strong> <code>string</code>
						<br />
						Это свойство устанавливает общую границу элемента. Цвет,
						толщина и стиль могут быть указаны в формате CSS,
						например: <code>1px solid black</code> или{" "}
						<code>2px dashed #333</code>.
					</li>

					<li>
						<strong>
							<code>borderDark</code>
						</strong>{" "}
						(необязательное):
						<br />
						<strong>Тип:</strong> <code>string</code>
						<br />
						Опциональное свойство, которое задает границу для
						темного режима. Если это свойство не задано, будет
						использоваться значение из <code>border</code>.
					</li>
				</ul>
			</DocWrapperContent>
			<DocWrapperContent
				schema_json={schemaDocParams.doc_style_border_radius_params}
			>
				<h2>
					Документация по свойствам <code>borderRadius</code>
				</h2>

				<h3>Описание полей:</h3>
				<ul>
					<li>
						<strong>
							<code>borderRadius</code>
						</strong>
						:<br />
						<strong>Тип:</strong> <code>number</code>
						<br />
						Это свойство задает радиус скругления углов элемента.
						Значение может быть указано в различных единицах,
						например: <code>5px</code>, <code>10%</code>, или{" "}
						<code>1rem</code>. Позволяет задать, насколько сильно
						будут скруглены углы элемента.
					</li>
				</ul>
			</DocWrapperContent>
			<DocWrapperContent
				schema_json={schemaDocParams.doc_style_grid_params}
			>
				<h2>
					Документация по свойствам <code>grid</code>,{" "}
					<code>grid-template-columns</code> и <code>gap</code>
				</h2>

				<h3>Описание полей:</h3>
				<ul>
					<li>
						<strong>
							<code>grid</code>
						</strong>
						:<br />
						<strong>Тип:</strong> <code>string</code>
						<br />
						Свойство <code>grid</code> активирует сеточную раскладку
						для элемента, задавая контейнер для CSS Grid. Элемент с
						этим свойством будет служить контейнером, внутри
						которого дочерние элементы будут размещаться в сетке.
					</li>

					<li>
						<strong>
							<code>grid-template-columns</code>
						</strong>
						:<br />
						<strong>Тип:</strong> <code>string</code>
						<br />
						Это свойство определяет структуру колонок в сетке. Оно
						позволяет задавать количество и размеры колонок.
						Значения могут быть указаны в различных единицах:{" "}
						<code>px</code>, <code>%</code>, <code>fr</code>{" "}
						(fractional unit), или ключевые слова, такие как{" "}
						<code>auto</code> или <code>min-content</code>.
					</li>

					<li>
						<strong>
							<code>gap</code>
						</strong>
						:<br />
						<strong>Тип:</strong> <code>number</code>
						<br />
						Свойство <code>gap</code> задает расстояние между
						строками и колонками в сетке. Это пространство может
						быть определено в пикселях, процентах или других
						единицах, например: <code>10px</code>, <code>1rem</code>
						, <code>5%</code>.
					</li>
				</ul>
			</DocWrapperContent>
			<DocWrapperContent
				schema_json={schemaDocParams.doc_style_flex_params}
			>
				<h2>
					Документация по свойствам <code>flex</code>,{" "}
					<code>gap</code>, <code>justifyContent</code>,{" "}
					<code>alignItems</code> и <code>flexDirection</code>
				</h2>

				<h3>Описание полей:</h3>
				<ul>
					<li>
						<strong>
							<code>flex</code>
						</strong>
						:<br />
						<strong>Тип:</strong> <code>string</code>
						<br />
						Свойство <code>flex</code> активирует гибкую (flex)
						раскладку для элемента, превращая его в контейнер для
						flex-элементов. Дочерние элементы контейнера будут
						расположены в соответствии с правилами flexbox. Основное
						значение по умолчанию: <code>display: flex</code>.
					</li>

					<li>
						<strong>
							<code>gap</code>
						</strong>
						:<br />
						<strong>Тип:</strong> <code>string</code>
						<br />
						Это свойство задает расстояние между дочерними
						элементами внутри flex-контейнера. Значение может быть
						указано в пикселях, процентах или других единицах
						(например: <code>10px</code>, <code>1rem</code>,{" "}
						<code>5%</code>).
					</li>

					<li>
						<strong>
							<code>justifyContent</code>
						</strong>
						:<br />
						<strong>Тип:</strong> <code>string</code>
						<br />
						Это свойство управляет выравниванием дочерних элементов
						по основной оси контейнера (горизонтальная ось для
						направления по умолчанию). Возможные значения включают:
						<ul>
							<li>
								<code>flex-start</code>: элементы выравниваются
								к началу контейнера.
							</li>
							<li>
								<code>flex-end</code>: элементы выравниваются к
								концу контейнера.
							</li>
							<li>
								<code>center</code>: элементы выравниваются по
								центру контейнера.
							</li>
							<li>
								<code>space-between</code>: элементы
								распределяются с равными промежутками между
								ними.
							</li>
							<li>
								<code>space-around</code>: элементы
								распределяются с равными промежутками вокруг
								каждого элемента.
							</li>
						</ul>
					</li>

					<li>
						<strong>
							<code>alignItems</code>
						</strong>
						:<br />
						<strong>Тип:</strong> <code>string</code>
						<br />
						Это свойство управляет выравниванием дочерних элементов
						по поперечной оси (вертикальная ось для направления по
						умолчанию). Возможные значения включают:
						<ul>
							<li>
								<code>flex-start</code>: элементы выравниваются
								по верхнему краю контейнера.
							</li>
							<li>
								<code>flex-end</code>: элементы выравниваются по
								нижнему краю контейнера.
							</li>
							<li>
								<code>center</code>: элементы выравниваются по
								центру контейнера.
							</li>
							<li>
								<code>baseline</code>: элементы выравниваются по
								базовой линии текста.
							</li>
							<li>
								<code>stretch</code>: элементы растягиваются,
								чтобы заполнить высоту контейнера.
							</li>
						</ul>
					</li>

					<li>
						<strong>
							<code>flexDirection</code>
						</strong>
						:<br />
						<strong>Тип:</strong> <code>string</code>
						<br />
						Это свойство определяет направление размещения элементов
						внутри flex-контейнера. Возможные значения:
						<ul>
							<li>
								<code>row</code>: элементы располагаются по
								горизонтали слева направо (по умолчанию).
							</li>
							<li>
								<code>row-reverse</code>: элементы располагаются
								по горизонтали справа налево.
							</li>
							<li>
								<code>column</code>: элементы располагаются по
								вертикали сверху вниз.
							</li>
							<li>
								<code>column-reverse</code>: элементы
								располагаются по вертикали снизу вверх.
							</li>
						</ul>
					</li>
				</ul>
			</DocWrapperContent>

			<DocWrapperContent
				schema_json={schemaDocParams.doc_style_spacing_params}
			>
				<h2>
					Документация по свойствам <code>padding</code> и{" "}
					<code>margin</code>
				</h2>

				<h3>Описание полей:</h3>
				<ul>
					<li>
						<strong>
							<code>padding</code>
						</strong>
						:<br />
						<strong>Тип:</strong> <code>number</code>
						<br />
						Свойство <code>padding</code> задает внутренние отступы
						элемента, определяя пространство между содержимым
						элемента и его границами. Значение может быть указано в
						единицах пикселей, процентах, ремах и других форматах,
						например: <code>10px</code>, <code>5%</code>,{" "}
						<code>1rem</code>. Можно задать одинаковое значение для
						всех сторон или использовать разные значения для каждой
						стороны.
					</li>

					<li>
						<strong>
							<code>margin</code>
						</strong>
						:<br />
						<strong>Тип:</strong> <code>number</code>
						<br />
						Свойство <code>margin</code> задает внешние отступы
						элемента, определяя расстояние между элементом и
						соседними элементами. Значение также может быть указано
						в единицах пикселей, процентах, ремах и других форматах,
						например: <code>20px</code>, <code>10%</code>,{" "}
						<code>2rem</code>. Можно задать одинаковое значение для
						всех сторон или использовать разные значения для каждой
						стороны.
					</li>
				</ul>
			</DocWrapperContent>

			<DocWrapperContent
				schema_json={schemaDocParams.doc_style_size_params}
			>
				<h2>
					Документация по свойствам <code>width</code> и{" "}
					<code>height</code>
				</h2>

				<h3>Описание полей:</h3>
				<ul>
					<li>
						<strong>
							<code>width</code>
						</strong>
						:<br />
						<strong>Тип:</strong> <code>string</code> или{" "}
						<code>number</code>
						<br />
						Свойство <code>width</code> задает ширину элемента.
						Значение может быть указано в различных единицах
						измерения: число (<code>100</code>), проценты (
						<code>%</code>)
					</li>

					<li>
						<strong>
							<code>height</code>
						</strong>
						:<br />
						<strong>Тип:</strong> <code>string</code> или{" "}
						<code>number</code>
						<br />
						Свойство <code>height</code> задает высоту элемента. Как
						и <code>width</code>, значение может быть указано в
						числах, процентах.
					</li>
				</ul>
			</DocWrapperContent>

			<DocWrapperContent
				schema_json={schemaDocParams.doc_style_ff_params}
			>
				<h2>
					Документация по свойствам <code>fontSize</code>,{" "}
					<code>fontWeight</code>, <code>fontFamily</code>,{" "}
					<code>color</code>, <code>colorDark</code>,{" "}
					<code>fontStyle</code>, <code>textAlign</code>, и{" "}
					<code>textDecoration</code>
				</h2>

				<h3>Описание полей:</h3>
				<ul>
					<li>
						<strong>
							<code>fontSize</code>
						</strong>
						:<br />
						<strong>Тип:</strong>
						<code>number</code>
						<br />
						Свойство <code>fontSize</code> задает размер текста.
						Значение может быть указано в различных единицах: числах
						(<code>14</code>)
					</li>

					<li>
						<strong>
							<code>fontWeight</code>
						</strong>
						:<br />
						<strong>Тип:</strong> <code>string</code> или{" "}
						<code>number</code>
						<br />
						Свойство <code>fontWeight</code> управляет толщиной
						шрифта. Возможные значения включают числа (например,{" "}
						<code>400</code> для нормального текста,{" "}
						<code>700</code> для жирного текста) или ключевые слова
						(например, <code>normal</code>, <code>bold</code>,{" "}
						<code>bolder</code>, <code>lighter</code>).
					</li>

					<li>
						<strong>
							<code>fontFamily</code>
						</strong>
						:<br />
						<strong>Тип:</strong> <code>string</code>
						<br />
						Свойство <code>fontFamily</code> задает семейство
						шрифтов для текста.
						<code>
							,"Futura PT" ,"Bodoni Cyrillic" ,"Helvetica Bold"
							,"AnastasiaScript" ,"No Name" ,"Dubai Light"
							,"Venski Sad One" ,"AndatinoScript"
							,"Cormorant-Light" ,"Cinzel" ,"CormorantGaramond"
							,"Lace";
						</code>
						.
					</li>

					<li>
						<strong>
							<code>color</code>
						</strong>
						:<br />
						<strong>Тип:</strong> <code>string</code>
						<br />
						Свойство <code>color</code> задает цвет текста. Значение
						может быть указано в различных форматах: в
						шестнадцатеричном формате (<code>#000000</code>), RGB (
						<code>rgb(0, 0, 0)</code>).
					</li>

					<li>
						<strong>
							<code>colorDark</code>
						</strong>{" "}
						(необязательное):
						<br />
						<strong>Тип:</strong> <code>string</code>
						<br />
						Опциональное свойство для темной темы. Оно задает цвет
						текста в темном режиме. Если <code>colorDark</code> не
						указано, будет использовано значение из{" "}
						<code>color</code>.
					</li>

					<li>
						<strong>
							<code>fontStyle</code>
						</strong>
						:<br />
						<strong>Тип:</strong> <code>string</code>
						<br />
						Свойство <code>fontStyle</code> задает стиль шрифта.
						Возможные значения: <code>normal</code>,{" "}
						<code>italic</code>, <code>oblique</code>. Обычно
						используется для задания наклонного текста.
					</li>

					<li>
						<strong>
							<code>textAlign</code>
						</strong>
						:<br />
						<strong>Тип:</strong> <code>string</code>
						<br />
						Свойство <code>textAlign</code> управляет выравниванием
						текста внутри элемента. Возможные значения:{" "}
						<code>left</code>, <code>right</code>,{" "}
						<code>center</code>, <code>justify</code>.
					</li>

					<li>
						<strong>
							<code>textDecoration</code>
						</strong>
						:<br />
						<strong>Тип:</strong> <code>string</code>
						<br />
						Свойство <code>textDecoration</code> задает декоративные
						элементы текста, такие как подчеркивание, зачеркивание и
						другие. Возможные значения: <code>none</code>,{" "}
						<code>underline</code>, <code>line-through</code>,{" "}
						<code>overline</code>.
					</li>
				</ul>
			</DocWrapperContent>
		</>
	);
};

export default DocSchemaStyle;
