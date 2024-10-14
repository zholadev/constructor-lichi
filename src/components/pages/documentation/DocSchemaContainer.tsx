import React from "react";
import { cn } from "@/components/lib/utils";
import { schemaDocParams } from "@/components/shared/utils/doc-schema";
import DocWrapperContent from "./DocWrapperContent";

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
			<DocWrapperContent
				schema_json={schemaDocParams.doc_container_params}
			>
				<p className={cn("border p-3 mb-6 bg-secondary rounded-md")}>
					Контейнер — это основной элемент, который содержит различные
					UI-компоненты и определяет их общую структуру.
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
			</DocWrapperContent>

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
								<code>horizontal | vertical</code> — Направление
								прокрутки слайдов.
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

			<DocWrapperContent schema_json={schemaDocParams.doc_id_params}>
				<p className={cn("Mb-6")}>
					id — Это уникальный идентификатор для конкретного элемента
					или объекта. Обычно используется для однозначной
					идентификации элемента в базе данных или структуре.
				</p>
			</DocWrapperContent>

			<DocWrapperContent schema_json={schemaDocParams.doc_guid_params}>
				<p className={cn("mb-6")}>
					guid - Это глобальный уникальный идентификатор (GUID),
					который часто используется для идентификации объектов в
					системах, где требуется глобальная уникальность. В отличие
					от id, GUID может быть уникальным на всех уровнях системы,
					даже в разных базах данных.
				</p>
			</DocWrapperContent>

			<DocWrapperContent schema_json={schemaDocParams.doc_version_params}>
				<h3>
					Параметр <code>version</code>
				</h3>

				<p>
					Параметр <code>version</code> используется для указания
					версии интерфейса или компонента, который применяется ко
					всем элементам контейнеров и компонентов в системе. Он
					помогает в управлении версиями приложения или веб-сайта, а
					также в отслеживании изменений в стиле или функциональности.
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
						используется версия 1.0 для всех элементов контейнеров и
						компонентов.
					</li>
				</ul>
			</DocWrapperContent>

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
			<DocWrapperContent schema_json={schemaDocParams.doc_type_params}>
				<p className={cn("mb-6")}>
					type - Тип объекта, описывающий, к какому классу или
					категории принадлежит данный элемент. В данном случае это
					контейнер с типом container. Также входят компоненты и
					элементы
				</p>
			</DocWrapperContent>
			<DocWrapperContent schema_json={schemaDocParams.doc_style_params}>
				<p className={cn("mb-6")}>
					style - объект, который содержит свойства стилей для
					элемента.
				</p>
			</DocWrapperContent>

			<DocWrapperContent schema_json={schemaDocParams.doc_page_type}>
				<p className={cn("mb-3")}>
					Свойство <code>template_type</code> определяет, как должен
					отображаться контент на странице в зависимости от типа
					документа. В системе предусмотрено два типа отображения: как
					обычная страница и как слайдер.
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
								<code>page</code> - Контент будет отображаться
								как полноценная страница.
							</li>
							<li className={cn("mb-3")}>
								<code>saint_laurent</code> - Контент будет
								представлен в виде слайдера (например, с
								использованием Swiper).
							</li>
						</ul>
					</li>
				</ul>
			</DocWrapperContent>
		</>
	);
};

export default DocSchemaContainer;
