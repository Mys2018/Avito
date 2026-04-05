# Avito — Личный кабинет продавца

**Тестовое задание · Frontend Стажёр · Весенняя волна 2026**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Fastify](https://img.shields.io/badge/Fastify-5-000000?logo=fastify&logoColor=white)](https://fastify.dev/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://docs.docker.com/)

---

## О проекте

Веб-приложение — **личный кабинет продавца** с интегрированным AI-ассистентом. Продавец управляет своими объявлениями: просматривает список, открывает карточку товара, редактирует данные и запрашивает помощь у нейросети для улучшения описания и оценки рыночной цены.

### Ключевые возможности

| Функция | Описание |
|---|---|
| **Список объявлений** | Поиск, фильтрация по категориям, сортировка, пагинация, переключение вида (сетка/список) |
| **Карточка товара** | Полная информация, блок «Требует доработок» с перечнем незаполненных полей |
| **Редактирование** | Динамические поля по категории, автосохранение черновика в `localStorage` |
| **AI-ассистент** | Генерация описания и оценка рыночной цены через OpenRouter API |
| **Docker** | Запуск всего стека одной командой через `docker compose up` |

---

## Быстрый старт

### Вариант 1 — Docker (рекомендуется)

Убедитесь, что установлен [Docker Desktop](https://docs.docker.com/get-started/get-docker/).

```bash
docker compose up --build
```

После запуска:
- **Фронтенд** → [http://localhost](http://localhost)
- **API сервер** → [http://localhost:8080](http://localhost:8080)

---

### Вариант 2 — Локальный запуск

**Требования:** Node.js v20+, npm

#### 1. Запуск сервера

```bash
cd server
npm install
npm start
```

Сервер запустится на `http://localhost:8080`.

#### 2. Настройка AI (OpenRouter)

Создайте файл `frontend/.env`:

```env
VITE_OPENROUTER_API_KEY=your_api_key_here
VITE_OPENROUTER_MODEL=stepfun/step-3.5-flash:free
```

Получить бесплатный ключ: [openrouter.ai/keys](https://openrouter.ai/keys)

> **Альтернатива:** Можно использовать локальную модель через [Ollama](https://ollama.com/) — тогда измените базовый URL в `frontend/src/features/ai-assistant`.

#### 3. Запуск фронтенда

```bash
cd frontend
npm install
npm run dev
```

Приложение доступно на `http://localhost:5173`.

---

## Структура проекта

```
avito/
├── frontend/               # React приложение (Vite)
│   ├── src/
│   │   ├── app/            # Роутер, глобальные стили
│   │   ├── pages/          # Страницы (/ads, /ads/:id, /ads/:id/edit)
│   │   ├── widgets/        # Крупные блоки UI (форма, сайдбар)
│   │   ├── features/       # AI-ассистент, фильтры, сортировка
│   │   ├── entities/       # Сущность объявления (модель, API, UI)
│   │   └── shared/         # Общие компоненты и утилиты
│   ├── Dockerfile
│   └── nginx.conf
├── server/                 # Fastify API сервер
│   ├── src/                # Типы, валидация, утилиты
│   ├── data/               # JSON-файл с объявлениями
│   └── Dockerfile
└── docker-compose.yml
```

Архитектура фронтенда следует принципам **Feature-Sliced Design (FSD)**.

---

## Стек технологий

### Фронтенд
- **React 19** + **TypeScript 5.9**
- **Vite 8** — сборка
- **React Router DOM 7** — роутинг
- **TanStack Query (React Query 5)** — серверное состояние и кеширование
- **Zustand 5** — клиентское состояние (фильтры, пагинация)
- **Axios** — HTTP-клиент
- **CSS Modules** — стилизация без UI-библиотек

### Бэкенд
- **Fastify 5** — HTTP-сервер
- **Zod 4** — валидация входных данных
- **tsx** — запуск TypeScript без компиляции

### Инфраструктура
- **Docker** + **Docker Compose** — контейнеризация
- **nginx** — раздача статики фронтенда и проксирование API
- **ESLint** — линтинг

---

## API Endpoints

| Метод | Путь | Описание |
|---|---|---|
| `GET` | `/items` | Список объявлений с фильтрами, поиском, сортировкой и пагинацией |
| `GET` | `/items/:id` | Получить объявление по ID |
| `PUT` | `/items/:id` | Обновить объявление |

**Параметры запроса `GET /items`:**

| Параметр | Тип | Описание |
|---|---|---|
| `q` | `string` | Поиск по названию |
| `limit` | `number` | Кол-во записей (по умолчанию: 10) |
| `skip` | `number` | Смещение для пагинации |
| `categories` | `string` | Категории через запятую: `auto,electronics` |
| `needsRevision` | `boolean` | Только требующие доработок |
| `sortColumn` | `title \| createdAt` | Столбец сортировки |
| `sortDirection` | `asc \| desc` | Направление сортировки |

---

## Принятые решения

### Работа без UI-библиотек
Все компоненты написаны на чистом CSS с использованием CSS Modules. Это даёт полный контроль над стилями и соответствует требованиям задания без лишних зависимостей.

### AI через OpenRouter
Вместо локальной Ollama выбран [OpenRouter](https://openrouter.ai/) — единый gateway к множеству моделей. Используется бесплатная модель `stepfun/step-3.5-flash:free`. Ключ хранится в `.env` и **не попадает в репозиторий**.

### Черновики в localStorage
При редактировании объявления данные формы автоматически сохраняются в `localStorage` с дебаунсом 500 мс. При повторном открытии страницы пользователь видит уведомление о найденном черновике с возможностью сбросить его.

### Отображение «Требует доработок»
Объявление считается неполным, если не заполнено `description` или любые из обязательных параметров категории. Логика вынесена в `validateAd.ts` и переиспользуется как на фронтенде, так и при серверной валидации.

---


Сделано в рамках стажёрского отбора **Avito · Spring 2026**

