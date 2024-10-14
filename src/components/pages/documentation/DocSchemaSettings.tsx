import React from "react";
import DocWrapperContent from "@/components/pages/documentation/DocWrapperContent";
import { schemaDocParams } from "@/components/shared/utils/doc-schema";

/**
 * @author Zholaman Zhumanov
 * @created 14.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const DocSchemaSettings: React.FC = () => {
	return (
		<>
			<DocWrapperContent
				schema_json={schemaDocParams.doc_settings_params}
			>
				<h2>
					Модуль <code>settings</code>
				</h2>

				<p>
					Модуль <code>settings</code> предоставляет различные
					настройки для управления интерфейсом и компонентами, такими
					как отображение страницы, слайдеры (Swiper), расположение
					элементов, таймеры, и категории товаров. Эти настройки
					помогают адаптировать внешний вид и функциональность
					элементов.
				</p>

				<h3>Основные параметры:</h3>
				<ul>
					<li>
						<strong>view</strong>: настройки вида страницы
						(например, темная тема, пока контента картинка или
						видео).
					</li>
					<li>
						<strong>show</strong>: Этот параметр используется для
						того, чтобы контролировать, какой контент будет доступен
						или виден на странице, основываясь на специфических
						правилах отображения.
					</li>
					<li>
						<strong>swiper</strong>: параметры слайдера, включая
						автопрокрутку, направление слайдов, тип пагинации.
					</li>
					<li>
						<strong>element</strong>: настройки для выравнивания и
						позиционирования элементов (кнопок, текста и т.д.).
					</li>
					<li>
						<strong>timer</strong>: параметры таймера, включая
						целевую дату и стиль.
					</li>
					<li>
						<strong>categoryList</strong>: настройки для отображения
						списка категорий товаров.
					</li>
				</ul>
			</DocWrapperContent>

			<DocWrapperContent
				schema_json={schemaDocParams.doc_setting_element_params}
			>
				<h3>
					Параметр <code>element</code>
				</h3>

				<p>
					Параметр <code>element</code> используется для управления
					стилями расположения элементов внутри компонента. Эти стили
					применяются для выравнивания, распределения пространства
					между элементами, а также для задания направления их
					расположения.
				</p>

				<h4>Поля:</h4>
				<ul>
					<li>
						<strong>
							<code>justifyContent</code>
						</strong>
						: <code>string</code>
						<br />
						Управляет распределением элементов вдоль основной оси
						(например, по вертикали или горизонтали). Значение{" "}
						<code>space-between</code> равномерно распределяет
						элементы, оставляя пространство между ними.
					</li>

					<li>
						<strong>
							<code>alignItems</code>
						</strong>
						: <code>string</code>
						<br />
						Управляет выравниванием элементов по поперечной оси.
						Значение <code>center</code> выравнивает все элементы по
						центру относительно основной оси.
					</li>

					<li>
						<strong>
							<code>gap</code>
						</strong>
						: <code>number</code>
						<br />
						Устанавливает расстояние между элементами внутри
						контейнера. В данном случае значение <code>
							10
						</code>{" "}
						задает расстояние в 10 пикселей между элементами.
					</li>

					<li>
						<strong>
							<code>flexDirection</code>
						</strong>
						: <code>string</code>
						<br />
						Определяет направление расположения элементов. Возможные
						значения:
						<ul>
							<li>
								<code>column</code> — элементы будут расположены
								вертикально, один под другим.
							</li>
							<li>
								<code>row</code> — элементы будут расположены
								горизонтально, один за другим.
							</li>
						</ul>
					</li>
				</ul>
			</DocWrapperContent>

			<DocWrapperContent
				schema_json={schemaDocParams.doc_setting_swiper_params}
			>
				<h3>
					Параметр <code>swiper</code>
				</h3>

				<p>
					Параметр <code>swiper</code> отвечает за настройки слайдера,
					используя Swiper.js. Эти настройки определяют, как слайды
					будут отображаться и функционировать, включая параметры
					автопрокрутки, пагинации и анимации.
				</p>

				<h4>Поля:</h4>
				<ul>
					<li>
						<strong>
							<code>pagination</code>
						</strong>
						: <code>boolean</code>
						<br />
						Включает или выключает отображение пагинации (точек или
						других индикаторов навигации). Значение{" "}
						<code>false</code> означает, что пагинация отключена.
					</li>

					<li>
						<strong>
							<code>autoplay</code>
						</strong>
						: <code>boolean</code>
						<br />
						Включает или выключает автопрокрутку слайдов. Значение{" "}
						<code>false</code> означает, что автопрокрутка
						отключена.
					</li>

					<li>
						<strong>
							<code>loop</code>
						</strong>
						: <code>boolean</code>
						<br />
						Определяет, будут ли слайды зациклены. Значение{" "}
						<code>false</code> отключает цикличное прокручивание.
					</li>

					<li>
						<strong>
							<code>slidePerView</code>
						</strong>
						: <code>number</code>
						<br />
						Устанавливает количество слайдов, которые видны
						одновременно. Значение <code>3.2</code> означает, что
						одновременно будут видны чуть более трёх слайдов.
					</li>

					<li>
						<strong>
							<code>slidePerGroup</code>
						</strong>
						: <code>number</code>
						<br />
						Количество слайдов, которые перемещаются за один раз при
						прокрутке. Значение <code>1</code> означает, что слайды
						будут двигаться по одному.
					</li>

					<li>
						<strong>
							<code>spaceBetween</code>
						</strong>
						: <code>number</code>
						<br />
						Определяет расстояние (в пикселях) между слайдами.
						Значение <code>10</code> означает, что между слайдами
						будет отступ в 10 пикселей.
					</li>

					<li>
						<strong>
							<code>speed_advanced</code>
						</strong>
						: <code>object</code>
						<br />
						Продвинутая настройка скорости:
						<ul>
							<li>
								<strong>
									<code>delay</code>
								</strong>
								: <code>number</code> — Задержка (в
								миллисекундах) между автоматическим
								переключением слайдов. Значение{" "}
								<code>1000</code> означает задержку в 1 секунду.
							</li>
							<li>
								<strong>
									<code>speed</code>
								</strong>
								: <code>number</code> — Скорость переключения
								слайдов. Значение <code>700</code> означает, что
								смена слайдов займет 700 миллисекунд.
							</li>
						</ul>
					</li>

					<li>
						<strong>
							<code>centeredSlides</code>
						</strong>
						: <code>boolean</code>
						<br />
						Определяет, будут ли слайды центрированы. Значение{" "}
						<code>false</code> означает, что слайды не будут
						центрированы.
					</li>

					<li>
						<strong>
							<code>direction</code>
						</strong>
						: <code>string</code>
						<br />
						Указывает направление слайдов. Возможные значения:{" "}
						<code>horizontal</code> или <code>vertical</code>.
						Значение <code>horizontal</code> означает, что слайды
						будут двигаться по горизонтали.
					</li>

					<li>
						<strong>
							<code>pagination_type</code>
						</strong>
						: <code>string</code>
						<br />
						Определяет тип пагинации. Возможные значения:{" "}
						<code>bullet</code> или <code>fraction</code>. Значение{" "}
						<code>bullet</code> отображает маленькие точки для
						навигации между слайдами.
					</li>

					<li>
						<strong>
							<code>autoHeight</code>
						</strong>
						: <code>boolean</code>
						<br />
						Включает или выключает автоматическую настройку высоты
						слайдов в зависимости от их контента. Значение{" "}
						<code>false</code> означает, что высота слайдов не будет
						автоматически изменяться.
					</li>

					<li>
						<strong>
							<code>paginationPosition</code>
						</strong>
						: <code>string</code>
						<br />
						Устанавливает положение пагинации. Возможные значения:{" "}
						<code>top</code>, <code>bottom</code>, <code>left</code>
						, <code>right</code>. Значение <code>bottom</code>{" "}
						означает, что пагинация будет располагаться внизу
						слайдера.
					</li>

					<li>
						<strong>
							<code>paginationTheme</code>
						</strong>
						: <code>string</code>
						<br />
						Определяет тему пагинации (светлая или темная).
						Возможные значения: <code>light</code> или{" "}
						<code>dark</code>. Значение <code>light</code> означает,
						что пагинация будет отображаться в светлом стиле.
					</li>

					<li>
						<strong>
							<code>mousewheel</code>
						</strong>
						: <code>boolean</code>
						<br />
						Включает или выключает возможность прокрутки слайдов с
						помощью колесика мыши. Значение <code>false</code>{" "}
						отключает такую возможность.
					</li>
				</ul>
			</DocWrapperContent>

			<DocWrapperContent
				schema_json={schemaDocParams.doc_setting_timer_params}
			>
				<h3>
					Параметр <code>timer</code>
				</h3>

				<p>
					Параметр <code>timer</code> используется для настройки
					обратного отсчета или таймера до определенной даты и
					времени. Включает в себя параметры стиля для отображения
					счётчика и единиц измерения (секунд, минут, часов и т.д.).
				</p>

				<h4>Поля:</h4>
				<ul>
					<li>
						<strong>
							<code>targetDate</code>
						</strong>
						: <code>string | Date</code>
						<br />
						Устанавливает целевую дату, до которой будет работать
						таймер. В данном примере <code>Dec 19 2024</code>{" "}
						означает, что таймер будет отсчитывать время до 19
						декабря 2024 года.
					</li>

					<li>
						<strong>
							<code>targetTime</code>
						</strong>
						: <code>string</code>
						<br />
						Устанавливает целевое время для таймера. В данном
						примере <code>00:00:00</code> означает, что таймер
						отсчитывает до полуночи.
					</li>

					<li>
						<strong>
							<code>counter</code>
						</strong>
						: <code>object</code>
						<br />
						Настройки для отображения самого счетчика (значений
						времени). Этот объект включает стили для счетчика:
						<ul>
							<li>
								<strong>
									<code>style</code>
								</strong>
								: <code>object</code>
							</li>
						</ul>
					</li>

					<li>
						<strong>
							<code>unit</code>
						</strong>
						: <code>object</code>
						<br />
						Настройки для отображения единиц измерения (например,
						секунд, минут, часов). Этот объект также включает стили
						для единиц измерения:
						<ul>
							<li>
								<strong>
									<code>style</code>
								</strong>
								: <code>object</code>
							</li>
						</ul>
					</li>
				</ul>
			</DocWrapperContent>

			<DocWrapperContent
				schema_json={schemaDocParams.doc_setting_view_params}
			>
				<h3>
					Параметр <code>view</code>
				</h3>

				<p>
					Параметр <code>view</code> используется для управления
					различными визуальными аспектами страницы или компонента,
					включая темы, тип контента, высоту контейнеров и режим
					навигационной панели.
				</p>

				<h4>Поля:</h4>
				<ul>
					<li>
						<strong>
							<code>darkTheme</code>
						</strong>
						: <code>boolean</code>
						<br />
						Включает или отключает темную тему для всех компонентов,
						элементов и контейнеров. Значение <code>true</code>{" "}
						активирует темную тему, что влияет на стили и цвета
						интерфейса.
					</li>

					<li>
						<strong>
							<code>contentType</code>
						</strong>
						: <code>image | video</code>
						<br />
						Определяет тип контента, который будет отображаться в
						компоненте. Возможные значения:
						<ul>
							<li>
								<code>image</code> — отображает изображение в
								компоненте.
							</li>
							<li>
								<code>video</code> — отображает видео в
								компоненте.
							</li>
						</ul>
					</li>

					<li>
						<strong>
							<code>heightFull</code>
						</strong>
						: <code>boolean</code>
						<br />
						Устанавливает высоту контейнера на весь экран. Значение{" "}
						<code>true</code> задает контейнерам высоту{" "}
						<code>100vh</code>, что означает, что они будут занимать
						всю высоту окна браузера.
					</li>

					<li>
						<strong>
							<code>navbarThemeMode</code>
						</strong>
						: <code>boolean</code>
						<br />
						Включает или отключает темный или светлый режим для
						навигационной панели (header). Значение{" "}
						<code>false</code> указывает, что используется темная
						тема для навигации, а <code>true</code> активирует
						светлый режим для панели.
					</li>
				</ul>
			</DocWrapperContent>

			<DocWrapperContent
				schema_json={schemaDocParams.doc_setting_category_list_params}
			>
				<h3>
					Параметр <code>categoryList</code>
				</h3>

				<p>
					Параметр <code>categoryList</code> используется для
					настройки отображения списка категорий товаров на странице.
					Он позволяет задать магазин, категорию, количество
					отображаемых элементов и тип карточки товара.
				</p>

				<h4>Поля:</h4>
				<ul>
					<li>
						<strong>
							<code>shop</code>
						</strong>
						: <code>number</code>
						<br />
						Определяет идентификатор магазина, товары которого будут
						отображаться. В данном примере значение <code>
							1
						</code>{" "}
						указывает на конкретный магазин.
					</li>

					<li>
						<strong>
							<code>category</code>
						</strong>
						: <code>string</code>
						<br />
						Задает категорию товаров, которые будут показаны. В
						данном примере значение <code>new</code> указывает на
						отображение товаров из категории новинки.
					</li>

					<li>
						<strong>
							<code>limit</code>
						</strong>
						: <code>number</code>
						<br />
						Определяет количество товаров, которые будут
						отображаться на странице. В данном примере установлено{" "}
						<code>11</code> товаров.
					</li>

					<li>
						<strong>
							<code>cardType</code>
						</strong>
						: <code>card | card_outside</code>
						<br />
						Определяет тип отображаемой карточки товара. Возможные
						значения:
						<ul>
							<li>
								<code>card</code> — стандартный тип карточки
								товара.
							</li>
							<li>
								<code>card_outside</code> — карточка товара с
								изображением или информацией, размещенной вне
								стандартного блока карточки.
							</li>
						</ul>
					</li>
				</ul>
			</DocWrapperContent>
			<DocWrapperContent
				schema_json={schemaDocParams.doc_setting_show_params}
			>
				<h3>
					Параметр <code>show</code>
				</h3>

				<p>
					Параметр <code>show</code> используется для управления типом
					отображаемого контента на сайте в зависимости от типа сайта.
					Он позволяет выбрать, какие типы сайтов будут отображаться.
				</p>

				<h4>Поля:</h4>
				<ul>
					<li>
						<strong>
							<code>siteType</code>
						</strong>
						: <code>base | wholesale | all</code>
						<br />
						Определяет, какой тип сайта будет отображаться.
						Возможные значения:
						<ul>
							<li>
								<code>base</code> — отображение основного сайта.
							</li>
							<li>
								<code>wholesale</code> — отображение
								партнерского сайта.
							</li>
							<li>
								<code>all</code> — отображение всех типов
								сайтов.
							</li>
						</ul>
					</li>
				</ul>
			</DocWrapperContent>
		</>
	);
};

export default DocSchemaSettings;
