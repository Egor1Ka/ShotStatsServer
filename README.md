# Basketball Backend

Node.js (ES modules) API для баскетбольного приложения: авторизация через Google OAuth и хранение истории сессий аналитики бросков.

## Структура

- **Точка входа:** `src/app.js` — Express, CORS, cookie-parser, `connectDB()`, роуты, `listen`.
- **Роуты:** `src/routes/routes.js` подключает подроуты из `src/routes/subroutes/` (auth, sessions). Опционально префикс `API_PREFIX`.
- **Middleware:** `src/middleware/auth.js` — проверка JWT (cookie или `Authorization: Bearer`), запись пользователя в `req.user`.
- **Контроллеры:** `src/controllers/` — парсят `req`, вызывают сервисы, отдают ответ через `httpResponse` / `httpResponseError`.
- **Сервисы:** `src/services/` — бизнес-логика, вызов репозиториев и утилит.
- **Репозитории:** `src/repository/` — только вызовы Mongoose.
- **Модели:** `src/models/` — User, RefreshToken, Session.
- **DTO:** `src/dto/` — toDTO(doc), toEntity(dto).
- **Утилиты:** `src/utils/http/` — httpResponse, httpResponseError, httpStatus, parseAuthToken, HttpError, DomainError.

## Запуск

```bash
cp .env.example .env
# Заполнить .env (DB_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET и т.д.)
npm install
npm run dev
```

## API

### Авторизация

- **GET** `/auth/google` — редирект на Google OAuth (state в httpOnly cookie).
- **GET** `/auth/google/callback` — обработка callback, установка access/refresh в httpOnly cookies, редирект на `FRONTEND_URL`.
- **POST** `/auth/refresh` — по refresh cookie выдать новый access и обновить access cookie; в теле можно вернуть данные пользователя.

Фронт должен ходить с `credentials: true`. Доступ по cookie `accessToken` или заголовку `Authorization: Bearer <token>`.

### Сессии (все под auth)

- **POST** `/sessions` — тело: `{ source, shots_made, shots_total, accuracy, zones }`. Создать сессию для текущего пользователя.
- **GET** `/sessions` — список сессий пользователя (по убыванию timestamp).
- **GET** `/sessions/:id` — одна сессия (404, если не своя).
- **DELETE** `/sessions/:id` — удалить сессию (только своя).

`zones` — объект: ключи — строки зон (например `left_corner_three`), значения — `{ attempts, makes, accuracy_pct }`.

## Переменные окружения

См. `.env.example`. Обязательны: `DB_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `JWT_SECRET`.
