# Функция `permissionGetContainers`

Эта функция возвращает разрешения (`IPermission`) для контейнера, основанные на его типе, версии и отображаемом блоке (блок или слайдер).

## Аргументы

1. **`type: IContainerType`** — тип контейнера, для которого необходимо получить разрешения. Возможные значения:
    - `container`
    - `saint_laurent_container`
    - `category_list_container`

2. **`displayBlock: DisplayContainerType`** — тип отображаемого блока в контейнере. Возможные значения:
    - `block` — для получения разрешений на блок.
    - `swiper` — для получения разрешений на слайдер.

3. **`versionComponent: string`** — версия контейнера, используемая для поиска соответствующих разрешений.

## Возвращаемое значение

- **`IPermission`** — возвращает разрешение на блок или слайдер, если версия и тип контейнера найдены. Если версия контейнера или разрешения не найдены, возвращаются базовые разрешения (`basePermission`).

## Пример использования

```typescript
import { permissionGetContainers } from "@/components/app/permission/getPermission";

const permission = permissionGetContainers("container", "swiper", "1.0");
console.log(permission); // Вернет разрешения для компонента "container" (swiper) версии "1.0"
