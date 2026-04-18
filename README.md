# Snippet Vault - Backend

NestJS API для зберігання та управління сніпетами.

## Швидкий старт

```bash
npm install
npm run dev
```

**Backend URL:** https://snippet-vault-backend-g7pm.vercel.app

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
