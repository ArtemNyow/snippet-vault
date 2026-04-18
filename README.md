# Snippet Vault - Backend

NestJS API для зберігання та управління сніпетами.

## Швидкий старт

```bash
npm install
npm run dev
```

Сервер: http://localhost:3001

## Змінні оточення

Створи `.env`:

```env
MONGODB_URI=mongodb+srv://test:test@test.1a0uqho.mongodb.net/?appName=test
PORT=3001
```

## API Endpoints

| Method | Endpoint            | Description                         |
| ------ | ------------------- | ----------------------------------- |
| POST   | `/api/snippets`     | Створити                            |
| GET    | `/api/snippets`     | Список + пагінація + пошук + фільтр |
| GET    | `/api/snippets/:id` | Один                                |
| PATCH  | `/api/snippets/:id` | Оновити                             |
| DELETE | `/api/snippets/:id` | Видалити                            |

### Параметри

- `page` — сторінка (default: 1)
- `limit` — на сторінку (default: 10, max: 50)
- `q` — пошук по title/content
- `tag` — фільтр по тегу

## Деплой на Vercel

1. Запуш на GitHub
2. Імпортуй проєкт у Vercel
3. Додай `MONGODB_URI` в налаштуваннях
4. Готово!

## Помилки

- `400` — невалідні дані
- `404` — не знайдено

---

## ❌ Що не встиг

**Фронтенд на Next.js** — не встиг через брак часу.
