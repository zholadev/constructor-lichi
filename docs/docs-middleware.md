# Middleware для базовой авторизации в Next.js

Этот middleware обеспечивает базовую авторизацию для всех маршрутов вашего приложения Next.js, за исключением тех, которые относятся к API, статическим ресурсам или файлу `favicon.ico`.

## Как работает middleware

1. **Аутентификация**: Проверка заголовка `authorization` с использованием метода базовой авторизации.
2. **Декодирование**: Имя пользователя и пароль декодируются из заголовка.
3. **Сравнение**: Учетные данные проверяются на соответствие значениям в переменных окружения `AUTH_USER` и `AUTH_PASS`.
4. **Разрешение доступа**: Если учетные данные верны, доступ разрешается; если нет — возвращается ошибка `401 Unauthorized`.

## Использование

1. **Переменные окружения**: Убедитесь, что у вас настроены следующие переменные окружения в вашем `.env, .env,production` файле:
    - `AUTH_USER` — имя пользователя для базовой авторизации.
    - `AUTH_PASS` — пароль для базовой авторизации.

2. **Пример файла `.env`**:

    ```
    AUTH_USER=myuser
    AUTH_PASS=mypassword
    ```

3. **Конфигурация маршрутов**:
   Middleware применяется ко всем маршрутам, кроме:
    - `/api`
    - `/_next/static`
    - `/favicon.ico`

## Код middleware

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    if (process.env.NODE_ENV === "production") {
        const auth = req.headers.get("authorization");

        if (auth) {
            const [user, pass] = Buffer.from(auth.split(" ")[1], "base64")
                .toString()
                .split(":");
            if (
                user === process.env.AUTH_USER &&
                pass === process.env.AUTH_PASS
            ) {
                return NextResponse.next();
            }
        }

        return new NextResponse("Auth Required", {
            status: 401,
            headers: {
                "WWW-Authenticate": 'Basic realm="Secure Area"',
            },
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/((?!api|_next/static|favicon.ico).*)",
};

