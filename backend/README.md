# Snippet Vault - Backend

NestJS API для зберігання та управління сніпетами.

**Backend URL:** https://snippet-vault-backend-g7pm.vercel.app

## Швидкий старт

```bash
cd backend
npm install
cp .env.example .env
npm run build
npm run start:dev
```

## Змінні оточення (.env)

```env
MONGODB_URI=mongodb+srv://test:test@test.1a0uqho.mongodb.net/?appName=test
PORT=3001
```

## API Endpoints

| Method | Endpoint            | Description                                  |
| ------ | ------------------- | -------------------------------------------- |
| POST   | `/api/snippets`     | Створити новий сніпет                        |
| GET    | `/api/snippets`     | Отримати список (пагінація + пошук + фільтр) |
| GET    | `/api/snippets/:id` | Отримати один сніпет                         |
| PATCH  | `/api/snippets/:id` | Оновити сніпет                               |
| DELETE | `/api/snippets/:id` | Видалити сніпет                              |

### Параметри запиту (GET /snippets)

- `page` — номер сторінки (default: 1)
- `limit` — елементів на сторінку (default: 10, max: 50)
- `q` — пошук по title/content (text search)
- `tag` — фільтр по тегу

### Приклади запитів

```bash
# Створити сніпет
curl -X POST https://твій-проект.vercel.app/api/snippets \
  -H "Content-Type: application/json" \
  -d '{"title": "Git commit", "content": "git commit -m", "tags": ["git"], "type": "command"}'

# Отримати всі
curl https://твій-проект.vercel.app/api/snippets

# Пошук
curl "https://твій-проект.vercel.app/api/snippets?q=git"

# Фільтр по тегу
curl "https://твій-проект.vercel.app/api/snippets?tag=git"
```

## Сутність Snippet

```json
{
  "title": "string (required)",
  "content": "string (required)",
  "tags": ["string"],
  "type": "link" | "note" | "command",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Білд та запуск

```bash
npm run build
npm run start:prod
```

## Помилки

- `400` — невалідні дані (class-validator)
- `404` — сніпет не знайдено

---

## ❌ Що не встиг і як би доробив

**Не встиг:** Фронтенд на Next.js (App Router) з Tailwind CSS.

**Як би зробив:**

1. Створити Next.js проєкт: `npx create-next-app@latest frontend`
2. Додати сторінки:
   - `/` — список сніпетів з пошуком, фільтром по тегах, пагінацією
   - `/snippets/[id]` — деталі сніпета
   - форма створення/редагування в модалі або на окремій сторінці
3. Інтеграція з API через `fetch` або `axios`
4. Стани: loading, empty, error — показувати залежно від відповіді API
5. Валідація форми: required поля, повідомлення про помилки
6. Деплой фронтенду на Vercel окремо від бекенду
