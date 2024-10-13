import React from "react";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import { cn } from "@/components/lib/utils";
import JsonViewContent from "@/components/shared/jsonView/JsonViewContent";
import { schemaDocParams } from "@/components/shared/utils/doc-schema";
import Divider from "@/components/shared/uikit/divider/Divider";
import DocWrapperContent from "./DocWrapperContent";
import DocSchemaElements from "./DocSchemaElements";
import DocSchemaComponents from "./DocSchemaComponents";
import DocSchemaStyle from "./DocSchemaStyle";
import DocSchemaWidget from "./DocSchemaWidget";
import DocSchemaContent from "./DocSchemaContent";

const containerSchema: ISchemaContainer = {
	id: "a404d0df-8b86-4544-ae74-4fd8260758e7",
	guid: "a404d0df-8b86-4544-ae74-4fd82607582e3",
	type: "container",
	version: "1.0",
	display: "block",
	style: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		gap: "54px",
	},
	settings: {
		view: {
			heightFull: true,
			darkTheme: true,
		},
	},
	components: [],
};

/**
 * @author Zholaman Zhumanov
 * @created 07.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const DocSchemaContainer: React.FC = () => {
	return (
		<>
			<div className={cn("w-full grid grid-cols-2 gap-40 mb-4")}>
				<div className={cn("")}>
					<JsonViewContent jsonData={containerSchema} />
				</div>
				<article>
					<p
						className={cn(
							"border p-3 mb-6 bg-secondary rounded-md"
						)}
					>
						Контейнер — это основной элемент, который содержит
						различные UI-компоненты и определяет их общую структуру.

						<div className={cn("mt-3")}>
							<ul className={cn("mt-3 block")}>
								<li className={cn("mb-4")}>
									<span
										className={cn(
											"bg-secondary p-1 font-medium"
										)}
									>
										container
									</span>{" "}
									— базовый контейнер, который используется для
									размещения различных компонентов и настройки их
									стилей. Может включать сетки, фоновые цвета,
									отступы и другие стили.
								</li>
							</ul>
						</div>
					</p>
				</article>
			</div>
			<DocWrapperContent
				schema_json={schemaDocParams.doc_saint_laurent_container_params}
			>
				<h2>
					Документация для Контейнера{" "}
					<code>saint_laurent_container</code>
				</h2>

				<p>
					Контейнер <code>saint_laurent_container</code> — уникальный
					контейнер, который, вероятно, предназначен для кастомных
					решений под бренд или коллекцию Saint Laurent. Может иметь
					уникальные стили и компоненты, характерные для данного
					использования. Этот контейнер может отображать контент в
					двух режимах:
					<ul>
						<li>
							<strong>block</strong> — элементы отображаются
							статично, как обычные блоки на странице.
						</li>
						<li>
							<strong>swiper</strong> — элементы отображаются в
							виде слайдера с возможностью прокрутки (с
							использованием Swiper.js).
						</li>
					</ul>
					Контейнер поддерживает различные компоненты, такие как
					карточки, текстовые блоки и изображения, и используется для
					создания страниц с фирменной стилизацией Saint Laurent.
				</p>

				<h3>Основные особенности:</h3>
				<ul>
					<li>
						Отображение элементов в статичном виде или как слайдер.
					</li>
					<li>
						Поддержка динамических элементов с прокруткой (swiper).
					</li>
					<li>
						Подходит для создания фирменных блоков с элементами
						интерфейса.
					</li>
				</ul>
				<ul>
					<li className={cn("mb-4")}>
						<span className={cn("bg-secondary p-1 font-medium")}>
							saint_laurent_container
						</span>{" "}
					</li>
				</ul>
			</DocWrapperContent>
			<DocWrapperContent
				schema_json={schemaDocParams.doc_category_list_params}
			>
				<h2>
					Документация для Контейнера <code>category_list</code>
				</h2>
				<p>
					Контейнер <code>category_list</code> используется для
					отображения списка категорий товаров или услуг. Контейнер
					поддерживает настройки для отображения контента в виде
					слайдера с использованием Swiper, а также имеет другие
					параметры настройки. Этот контейнер предназначен для
					упрощенного и интерактивного отображения категорий.
				</p>
				<h3>Поля контейнера:</h3>
				<ul>
					<li>
						<strong>
							<code>id</code>
						</strong>
						: <code>string</code>
						<br />
						Уникальный идентификатор контейнера.
					</li>

					<li>
						<strong>
							<code>guid</code>
						</strong>
						: <code>string</code>
						<br />
						Глобальный уникальный идентификатор для взаимодействия с
						контейнером.
					</li>

					<li>
						<strong>
							<code>type</code>
						</strong>
						: <code>string</code>
						<br />
						Тип контейнера. В данном случае это{" "}
						<code>category_list</code>.
					</li>

					<li>
						<strong>
							<code>components</code>
						</strong>
						: <code>array</code>
						<br />
						Список компонентов, которые находятся внутри контейнера.
						Компоненты могут быть разных типов, таких как{" "}
						<code>card</code> или <code>card_outside</code>, и
						используются для отображения категорий.
					</li>
				</ul>
				---
				<h3>Настройки контейнера:</h3>
				<ul>
					<li>
						<strong>
							<code>swiper</code>
						</strong>
						: <code>object</code>
						<br />
						Настройки слайдера Swiper, который позволяет отображать
						категории в виде слайд-шоу. Поддерживаемые параметры:
						<ul>
							<li>
								<code>autoplay</code>: <code>boolean</code> —
								Включение/выключение автоматической прокрутки
								слайдов.
							</li>
							<li>
								<code>loop</code>: <code>boolean</code> —
								Зацикливание слайдов, чтобы они продолжали
								прокручиваться бесконечно.
							</li>
							<li>
								<code>slidesPerView</code>: <code>number</code>{" "}
								— Количество видимых слайдов одновременно
								(например, <code>3</code>).
							</li>
							<li>
								<code>spaceBetween</code>: <code>number</code> —
								Пространство между слайдами в пикселях.
							</li>
							<li>
								<code>pagination</code>: <code>boolean</code> —
								Отображение или скрытие элементов пагинации
								(точек или фракций для навигации).
							</li>
							<li>
								<code>direction</code>:{" "}
								<code>"horizontal" | "vertical"</code> —
								Направление прокрутки слайдов.
							</li>
							<li>
								<code>speed</code>: <code>number</code> —
								Скорость анимации переключения слайдов в
								миллисекундах.
							</li>
						</ul>
					</li>

					<li>
						<strong>
							<code>category_list</code>
						</strong>
						: <code>object</code>
						<br />
						Настройки списка категорий:
						<ul>
							<li>
								<code>cardType</code>:{" "}
								<code>card | card_outside</code> — Определяет
								тип отображаемых карточек. <code>card</code> —
								стандартные карточки, <code>card_outside</code>{" "}
								— карточки с элементами, размещенными снаружи.
							</li>
							<li>
								<code>limit</code>: <code>number</code> —
								Максимальное количество категорий, отображаемых
								одновременно.
							</li>
						</ul>
					</li>
				</ul>
			</DocWrapperContent>
			<Divider spacing="large" />
			<div className={cn("w-full grid grid-cols-2 gap-40 mb-4")}>
				<div className={cn("")}>
					<JsonViewContent jsonData={schemaDocParams.doc_id_params} />
				</div>
				<article className={cn("bg-secondary border p-3 rounded-md")}>
					<p className={cn("Mb-6")}>
						id — Это уникальный идентификатор для конкретного
						элемента или объекта. Обычно используется для
						однозначной идентификации элемента в базе данных или
						структуре.
					</p>
				</article>
			</div>
			<Divider spacing="large" />
			<div className={cn("w-full grid grid-cols-2 gap-40 mb-4")}>
				<div className={cn("")}>
					<JsonViewContent
						jsonData={schemaDocParams.doc_guid_params}
					/>
				</div>
				<article className={cn("bg-secondary border p-3 rounded-md")}>
					<p className={cn("mb-6")}>
						guid - Это глобальный уникальный идентификатор (GUID),
						который часто используется для идентификации объектов в
						системах, где требуется глобальная уникальность. В
						отличие от id, GUID может быть уникальным на всех
						уровнях системы, даже в разных базах данных.
					</p>
				</article>
			</div>
			<Divider spacing="large" />
			<div className={cn("w-full grid grid-cols-2 gap-40 mb-4")}>
				<div className={cn("")}>
					<JsonViewContent
						jsonData={schemaDocParams.doc_version_params}
					/>
				</div>
				<article className={cn("bg-secondary border p-3 rounded-md")}>
					<h3>
						Параметр <code>version</code>
					</h3>

					<p>
						Параметр <code>version</code> используется для указания
						версии интерфейса или компонента, который применяется ко
						всем элементам контейнеров и компонентов в системе. Он
						помогает в управлении версиями приложения или веб-сайта,
						а также в отслеживании изменений в стиле или
						функциональности.
					</p>

					<h4>Поля:</h4>
					<ul>
						<li>
							<strong>
								<code>version</code>
							</strong>
							: <code>string</code>
							<br />
							Определяет текущую версию интерфейса или компонента.
							Например, значение <code>1.0</code> указывает, что
							используется версия 1.0 для всех элементов
							контейнеров и компонентов.
						</li>
					</ul>
				</article>
			</div>
			<DocWrapperContent schema_json={schemaDocParams.doc_display_params}>
				<h3>
					Параметр <code>display</code>
				</h3>

				<p>
					Параметр <code>display</code> используется для управления
					способом отображения элементов на странице. Он поддерживает
					два режима: <code>block</code> и <code>swiper</code>, что
					позволяет контролировать, как элемент будет отображаться и
					взаимодействовать с пользователем.
				</p>

				<h4>Поля:</h4>
				<ul>
					<li>
						<strong>
							<code>block</code>
						</strong>
						: <code>string</code>
						<br />
						Элемент отображается как блочный элемент. Это значение
						по умолчанию и используется для стандартного отображения
						контента.
					</li>

					<li>
						<strong>
							<code>swiper</code>
						</strong>
						: <code>string</code>
						<br />
						Элемент отображается как слайдер, что позволяет
						пользователям перелистывать контент с помощью Swiper.js
						или другого подобного плагина. Подходит для
						динамического контента, такого как карусели изображений
						или слайдеры.
					</li>
				</ul>
			</DocWrapperContent>
			<Divider spacing="large" />
			<div className={cn("w-full grid grid-cols-2 gap-40 mb-4")}>
				<div className={cn("")}>
					<JsonViewContent
						jsonData={schemaDocParams.doc_type_params}
					/>
				</div>
				<article className={cn("bg-secondary border p-3 rounded-md")}>
					<p className={cn("mb-6")}>
						type - Тип объекта, описывающий, к какому классу или
						категории принадлежит данный элемент. В данном случае
						это контейнер с типом "container". Также входят
						компоненты и элементы
					</p>
				</article>
			</div>
			<Divider spacing="large" />
			<div className={cn("w-full grid grid-cols-2 gap-40 mb-4")}>
				<div className={cn("")}>
					<JsonViewContent
						jsonData={schemaDocParams.doc_style_params}
					/>
				</div>
				<article className={cn("bg-secondary border p-3 rounded-md")}>
					<p className={cn("mb-6")}>
						style - объект, который содержит свойства стилей для
						элемента.
					</p>
				</article>
			</div>
			<Divider spacing="large" />
			<div className={cn("w-full grid grid-cols-2 gap-40 mb-4")}>
				<div className={cn("")}>
					<JsonViewContent jsonData={schemaDocParams.doc_page_type} />
				</div>
				<article className={cn("bg-secondary border p-3 rounded-md")}>
					<p className={cn("mb-3")}>
						Свойство <code>template_type</code> определяет, как
						должен отображаться контент на странице в зависимости от
						типа документа. В системе предусмотрено два типа
						отображения: как обычная страница и как слайдер.
					</p>

					<h3 className={cn("mb-3")}>Описание полей:</h3>
					<ul className={cn("mb-3")}>
						<li className={cn("mb-3")}>
							<strong>
								<code>template_type</code>
							</strong>
							:<br />
							<br />
							<strong>Тип:</strong> <code>string</code>
							<br />
							<ul className={cn("mb-3")}>
								<li className={cn("mb-3")}>
									<code>page</code> - Контент будет
									отображаться как полноценная страница.
								</li>
								<li className={cn("mb-3")}>
									<code>saint_laurent</code> - Контент будет
									представлен в виде слайдера (например, с
									использованием Swiper).
								</li>
							</ul>
						</li>
					</ul>
				</article>
			</div>

			<DocSchemaComponents />
			<DocSchemaElements />
			<DocSchemaWidget />

			<Divider spacing="large" />

			<div className={cn("w-full grid grid-cols-2 gap-40 mb-4")}>
				<div className={cn("")}>
					<JsonViewContent
						fullHeight
						jsonData={schemaDocParams.doc_settings_params}
					/>
				</div>
				<article className={cn("bg-secondary border p-3 rounded-md")}>
					<h2>
						Модуль <code>settings</code>
					</h2>

					<p>
						Модуль <code>settings</code> предоставляет различные
						настройки для управления интерфейсом и компонентами,
						такими как отображение страницы, слайдеры (Swiper),
						расположение элементов, таймеры, и категории товаров.
						Эти настройки помогают адаптировать внешний вид и
						функциональность элементов.
					</p>

					<h3>Основные параметры:</h3>
					<ul>
						<li>
							<strong>view</strong>: настройки вида страницы
							(например, темная тема, пока контента картинка или
							видео).
						</li>
						<li>
							<strong>show</strong>: Этот параметр используется
							для того, чтобы контролировать, какой контент будет
							доступен или виден на странице, основываясь на
							специфических правилах отображения.
						</li>
						<li>
							<strong>swiper</strong>: параметры слайдера, включая
							автопрокрутку, направление слайдов, тип пагинации.
						</li>
						<li>
							<strong>element</strong>: настройки для выравнивания
							и позиционирования элементов (кнопок, текста и
							т.д.).
						</li>
						<li>
							<strong>timer</strong>: параметры таймера, включая
							целевую дату и стиль.
						</li>
						<li>
							<strong>categoryList</strong>: настройки для
							отображения списка категорий товаров.
						</li>
					</ul>
				</article>
			</div>

			<Divider spacing="large" />

			<div className={cn("w-full grid grid-cols-2 gap-40 mb-4")}>
				<div className={cn("")}>
					<JsonViewContent
						fullHeight
						jsonData={schemaDocParams.doc_setting_element_params}
					/>
				</div>
				<article className={cn("bg-secondary border p-3 rounded-md")}>
					<h3>
						Параметр <code>element</code>
					</h3>

					<p>
						Параметр <code>element</code> используется для
						управления стилями расположения элементов внутри
						компонента. Эти стили применяются для выравнивания,
						распределения пространства между элементами, а также для
						задания направления их расположения.
					</p>

					<h4>Поля:</h4>
					<ul>
						<li>
							<strong>
								<code>justifyContent</code>
							</strong>
							: <code>string</code>
							<br />
							Управляет распределением элементов вдоль основной
							оси (например, по вертикали или горизонтали).
							Значение <code>"space-between"</code> равномерно
							распределяет элементы, оставляя пространство между
							ними.
						</li>

						<li>
							<strong>
								<code>alignItems</code>
							</strong>
							: <code>string</code>
							<br />
							Управляет выравниванием элементов по поперечной оси.
							Значение <code>"center"</code> выравнивает все
							элементы по центру относительно основной оси.
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
							Определяет направление расположения элементов.
							Возможные значения:
							<ul>
								<li>
									<code>"column"</code> — элементы будут
									расположены вертикально, один под другим.
								</li>
								<li>
									<code>"row"</code> — элементы будут
									расположены горизонтально, один за другим.
								</li>
							</ul>
						</li>
					</ul>
				</article>
			</div>

			<Divider spacing="large" />

			<div className={cn("w-full grid grid-cols-2 gap-40 mb-4")}>
				<div className={cn("")}>
					<JsonViewContent
						fullHeight
						jsonData={schemaDocParams.doc_setting_swiper_params}
					/>
				</div>
				<article className={cn("bg-secondary border p-3 rounded-md")}>
					<h3>
						Параметр <code>swiper</code>
					</h3>

					<p>
						Параметр <code>swiper</code> отвечает за настройки
						слайдера, используя Swiper.js. Эти настройки определяют,
						как слайды будут отображаться и функционировать, включая
						параметры автопрокрутки, пагинации и анимации.
					</p>

					<h4>Поля:</h4>
					<ul>
						<li>
							<strong>
								<code>pagination</code>
							</strong>
							: <code>boolean</code>
							<br />
							Включает или выключает отображение пагинации (точек
							или других индикаторов навигации). Значение{" "}
							<code>false</code> означает, что пагинация
							отключена.
						</li>

						<li>
							<strong>
								<code>autoplay</code>
							</strong>
							: <code>boolean</code>
							<br />
							Включает или выключает автопрокрутку слайдов.
							Значение <code>false</code> означает, что
							автопрокрутка отключена.
						</li>

						<li>
							<strong>
								<code>loop</code>
							</strong>
							: <code>boolean</code>
							<br />
							Определяет, будут ли слайды зациклены. Значение{" "}
							<code>false</code> отключает цикличное
							прокручивание.
						</li>

						<li>
							<strong>
								<code>slidePerView</code>
							</strong>
							: <code>number</code>
							<br />
							Устанавливает количество слайдов, которые видны
							одновременно. Значение <code>3.2</code> означает,
							что одновременно будут видны чуть более трёх
							слайдов.
						</li>

						<li>
							<strong>
								<code>slidePerGroup</code>
							</strong>
							: <code>number</code>
							<br />
							Количество слайдов, которые перемещаются за один раз
							при прокрутке. Значение <code>1</code> означает, что
							слайды будут двигаться по одному.
						</li>

						<li>
							<strong>
								<code>spaceBetween</code>
							</strong>
							: <code>number</code>
							<br />
							Определяет расстояние (в пикселях) между слайдами.
							Значение <code>10</code> означает, что между
							слайдами будет отступ в 10 пикселей.
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
									<code>1000</code> означает задержку в 1
									секунду.
								</li>
								<li>
									<strong>
										<code>speed</code>
									</strong>
									: <code>number</code> — Скорость
									переключения слайдов. Значение{" "}
									<code>700</code> означает, что смена слайдов
									займет 700 миллисекунд.
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
							<code>"horizontal"</code> или{" "}
							<code>"vertical"</code>. Значение{" "}
							<code>"horizontal"</code> означает, что слайды будут
							двигаться по горизонтали.
						</li>

						<li>
							<strong>
								<code>pagination_type</code>
							</strong>
							: <code>string</code>
							<br />
							Определяет тип пагинации. Возможные значения:{" "}
							<code>"bullet"</code> или <code>"fraction"</code>.
							Значение <code>"bullet"</code> отображает маленькие
							точки для навигации между слайдами.
						</li>

						<li>
							<strong>
								<code>autoHeight</code>
							</strong>
							: <code>boolean</code>
							<br />
							Включает или выключает автоматическую настройку
							высоты слайдов в зависимости от их контента.
							Значение <code>false</code> означает, что высота
							слайдов не будет автоматически изменяться.
						</li>

						<li>
							<strong>
								<code>paginationPosition</code>
							</strong>
							: <code>string</code>
							<br />
							Устанавливает положение пагинации. Возможные
							значения: <code>"top"</code>, <code>"bottom"</code>,{" "}
							<code>"left"</code>, <code>"right"</code>. Значение{" "}
							<code>"bottom"</code> означает, что пагинация будет
							располагаться внизу слайдера.
						</li>

						<li>
							<strong>
								<code>paginationTheme</code>
							</strong>
							: <code>string</code>
							<br />
							Определяет тему пагинации (светлая или темная).
							Возможные значения: <code>"light"</code> или{" "}
							<code>"dark"</code>. Значение <code>"light"</code>{" "}
							означает, что пагинация будет отображаться в светлом
							стиле.
						</li>

						<li>
							<strong>
								<code>mousewheel</code>
							</strong>
							: <code>boolean</code>
							<br />
							Включает или выключает возможность прокрутки слайдов
							с помощью колесика мыши. Значение <code>
								false
							</code>{" "}
							отключает такую возможность.
						</li>
					</ul>
				</article>
			</div>

			<Divider spacing="large" />

			<div className={cn("w-full grid grid-cols-2 gap-40 mb-4")}>
				<div className={cn("")}>
					<JsonViewContent
						fullHeight
						jsonData={schemaDocParams.doc_setting_timer_params}
					/>
				</div>
				<article className={cn("bg-secondary border p-3 rounded-md")}>
					<h3>
						Параметр <code>timer</code>
					</h3>

					<p>
						Параметр <code>timer</code> используется для настройки
						обратного отсчета или таймера до определенной даты и
						времени. Включает в себя параметры стиля для отображения
						счётчика и единиц измерения (секунд, минут, часов и
						т.д.).
					</p>

					<h4>Поля:</h4>
					<ul>
						<li>
							<strong>
								<code>targetDate</code>
							</strong>
							: <code>string | Date</code>
							<br />
							Устанавливает целевую дату, до которой будет
							работать таймер. В данном примере{" "}
							<code>Dec 19 2024</code> означает, что таймер будет
							отсчитывать время до 19 декабря 2024 года.
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
							Настройки для отображения единиц измерения
							(например, секунд, минут, часов). Этот объект также
							включает стили для единиц измерения:
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
				</article>
			</div>

			<Divider spacing="large" />

			<div className={cn("w-full grid grid-cols-2 gap-40 mb-4")}>
				<div className={cn("")}>
					<JsonViewContent
						fullHeight
						jsonData={schemaDocParams.doc_setting_view_params}
					/>
				</div>
				<article className={cn("bg-secondary border p-3 rounded-md")}>
					<h3>
						Параметр <code>view</code>
					</h3>

					<p>
						Параметр <code>view</code> используется для управления
						различными визуальными аспектами страницы или
						компонента, включая темы, тип контента, высоту
						контейнеров и режим навигационной панели.
					</p>

					<h4>Поля:</h4>
					<ul>
						<li>
							<strong>
								<code>darkTheme</code>
							</strong>
							: <code>boolean</code>
							<br />
							Включает или отключает темную тему для всех
							компонентов, элементов и контейнеров. Значение{" "}
							<code>true</code> активирует темную тему, что влияет
							на стили и цвета интерфейса.
						</li>

						<li>
							<strong>
								<code>contentType</code>
							</strong>
							: <code>image | video</code>
							<br />
							Определяет тип контента, который будет отображаться
							в компоненте. Возможные значения:
							<ul>
								<li>
									<code>image</code> — отображает изображение
									в компоненте.
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
							Устанавливает высоту контейнера на весь экран.
							Значение <code>true</code> задает контейнерам высоту{" "}
							<code>100vh</code>, что означает, что они будут
							занимать всю высоту окна браузера.
						</li>

						<li>
							<strong>
								<code>navbarThemeMode</code>
							</strong>
							: <code>boolean</code>
							<br />
							Включает или отключает темный или светлый режим для
							навигационной панели (header). Значение{" "}
							<code>false</code> указывает, что используется
							темная тема для навигации, а <code>true</code>{" "}
							активирует светлый режим для панели.
						</li>
					</ul>
				</article>
			</div>

			<Divider spacing="large" />

			<div className={cn("w-full grid grid-cols-2 gap-40 mb-4")}>
				<div className={cn("")}>
					<JsonViewContent
						fullHeight
						jsonData={
							schemaDocParams.doc_setting_category_list_params
						}
					/>
				</div>
				<article className={cn("bg-secondary border p-3 rounded-md")}>
					<h3>
						Параметр <code>categoryList</code>
					</h3>

					<p>
						Параметр <code>categoryList</code> используется для
						настройки отображения списка категорий товаров на
						странице. Он позволяет задать магазин, категорию,
						количество отображаемых элементов и тип карточки товара.
					</p>

					<h4>Поля:</h4>
					<ul>
						<li>
							<strong>
								<code>shop</code>
							</strong>
							: <code>number</code>
							<br />
							Определяет идентификатор магазина, товары которого
							будут отображаться. В данном примере значение{" "}
							<code>1</code> указывает на конкретный магазин.
						</li>

						<li>
							<strong>
								<code>category</code>
							</strong>
							: <code>string</code>
							<br />
							Задает категорию товаров, которые будут показаны. В
							данном примере значение <code>new</code> указывает
							на отображение товаров из категории новинки.
						</li>

						<li>
							<strong>
								<code>limit</code>
							</strong>
							: <code>number</code>
							<br />
							Определяет количество товаров, которые будут
							отображаться на странице. В данном примере
							установлено <code>11</code> товаров.
						</li>

						<li>
							<strong>
								<code>cardType</code>
							</strong>
							: <code>card | card_outside</code>
							<br />
							Определяет тип отображаемой карточки товара.
							Возможные значения:
							<ul>
								<li>
									<code>card</code> — стандартный тип карточки
									товара.
								</li>
								<li>
									<code>card_outside</code> — карточка товара
									с изображением или информацией, размещенной
									вне стандартного блока карточки.
								</li>
							</ul>
						</li>
					</ul>
				</article>
			</div>

			<Divider spacing="large" />

			<div className={cn("w-full grid grid-cols-2 gap-40 mb-4")}>
				<div className={cn("")}>
					<JsonViewContent
						fullHeight
						jsonData={schemaDocParams.doc_setting_show_params}
					/>
				</div>
				<article className={cn("bg-secondary border p-3 rounded-md")}>
					<h3>
						Параметр <code>show</code>
					</h3>

					<p>
						Параметр <code>show</code> используется для управления
						типом отображаемого контента на сайте в зависимости от
						типа сайта. Он позволяет выбрать, какие типы сайтов
						будут отображаться.
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
									<code>base</code> — отображение основного
									сайта.
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
				</article>
			</div>
			<DocSchemaContent />
			<DocSchemaStyle />
		</>
	);
};

export default DocSchemaContainer;
