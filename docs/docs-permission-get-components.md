# Функция `permissionGetComponents`

Эта функция возвращает разрешения (`IPermission`) для компонента, основанные на его типе и версии.

## Аргументы

1. **`type: ComponentBaseTypes | ComponentSpecialTypes`** — тип компонента, для которого необходимо получить разрешения. Возможные значения:
    - `card`
    - `card_outside`
    - `album`
    - `album_outside`
    - `saint_laurent`

2. **`versionComponent: string`** — версия компонента. Эта строка используется для поиска конкретных разрешений, связанных с указанной версией компонента.

## Возвращаемое значение

- **`IPermission`** — возвращает разрешение, если версия и тип компонента найдены. Если версия компонента не найдена, возвращаются базовые разрешения (`basePermission`).

## Пример использования

```typescript
import { permissionGetComponents } from "@/components/app/permission/getPermission";

const permission = permissionGetComponents("card", "1.0");
