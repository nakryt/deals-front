# CRM System - Frontend

> Next.js 16 Frontend додаток для системи управління клієнтами та угодами

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8)](https://tailwindcss.com/)

---

## 📋 Зміст

- [Огляд](#-огляд)
- [Технології](#-технології)
- [Встановлення](#-встановлення)
- [Конфігурація](#-конфігурація)
- [Запуск](#-запуск)
- [Структура](#-структура)
- [Features](#-features)
- [Components](#-components)
- [Стилізація](#-стилізація)
- [State Management](#-state-management)

---

## 🎯 Огляд

Сучасний, responsive frontend для CRM системи, побудований на Next.js 16 з використанням App Router та React 19.

### Ключові можливості

- ✅ **Next.js 16 App Router** - Server Components та оптимізації
- ✅ **React 19** - Найновіша версія React
- ✅ **TanStack Query** - Управління серверним станом
- ✅ **shadcn/ui** - Високоякісні UI компоненти
- ✅ **Tailwind CSS v4** - Сучасний utility-first CSS
- ✅ **TypeScript** - Повна типізація
- ✅ **Dark Mode** - Підтримка темної теми
- ✅ **Responsive Design** - Адаптивний дизайн
- ✅ **Form Validation** - React Hook Form + Zod

---

## 🛠 Технології

### Core
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **State**: TanStack Query (React Query) v5

### UI Components
- **Component Library**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Notifications**: Sonner (Toast)
- **Theme**: next-themes

### Forms & Validation
- **Forms**: React Hook Form v7
- **Validation**: Zod v4
- **Resolvers**: @hookform/resolvers

### Data Fetching
- **HTTP Client**: Axios
- **Caching**: TanStack Query
- **Real-time Sync**: Query invalidation

### Development Tools
- **Linting**: ESLint v9
- **Package Manager**: npm
- **Build**: Next.js with Turbopack

---

## 📦 Встановлення

### Вимоги

- Node.js 18+ (рекомендовано 22+)
- npm або yarn
- Backend API запущений на http://localhost:8000

### Кроки встановлення

```bash
# 1. Перейти в директорію frontend
cd frontend

# 2. Встановити залежності
npm install

# 3. Створити environment файл
cp .env.example .env.local

# 4. Запустити development сервер
npm run dev
```

---

## ⚙️ Конфігурація

### Environment Variables

Створіть `.env.local` на основі `.env.example`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_API_TIMEOUT=10000

# Application
NEXT_PUBLIC_APP_NAME=CRM System
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

**Важливо:**
- В Next.js змінні для браузера мають префікс `NEXT_PUBLIC_`
- Зміни в `.env.local` потребують перезапуску сервера
- Не комітити `.env.local` в Git

---

## 🚀 Запуск

### Development

```bash
# Запустити dev сервер
npm run dev
```

**Додаток доступний на:** http://localhost:3001

### Production

```bash
# Build для production
npm run build

# Запустити production сервер
npm start
```

### Інші команди

```bash
# Linting
npm run lint

# Type checking
tsc --noEmit

# Очистити .next
rm -rf .next
```

---

## 📁 Структура проекту

```
frontend/
├── app/                           # Next.js App Router
│   ├── clients/
│   │   ├── [id]/
│   │   │   └── page.tsx          # Деталі клієнта (dynamic route)
│   │   └── page.tsx               # Список клієнтів
│   ├── deals/
│   │   └── page.tsx               # Список угод
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   └── globals.css                # Global styles
│
├── components/                    # React Components
│   ├── clients/
│   │   ├── clients-table.tsx     # Таблиця клієнтів
│   │   ├── client-form.tsx       # Форма клієнта
│   │   ├── create-client-dialog.tsx
│   │   ├── edit-client-dialog.tsx
│   │   └── delete-client-dialog.tsx
│   │
│   ├── deals/
│   │   ├── deals-table.tsx       # Таблиця угод
│   │   ├── deals-filters.tsx     # Фільтри угод
│   │   ├── deal-form.tsx
│   │   ├── create-deal-dialog.tsx
│   │   ├── edit-deal-dialog.tsx
│   │   └── delete-deal-dialog.tsx
│   │
│   ├── common/
│   │   └── pagination-controls.tsx
│   │
│   ├── layout/
│   │   ├── main-layout.tsx       # Основний layout
│   │   ├── header.tsx            # Header з навігацією
│   │   └── theme-toggle.tsx      # Перемикач теми
│   │
│   └── ui/                        # shadcn/ui components
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── table.tsx
│       └── ... (інші UI компоненти)
│
├── hooks/                         # Custom React Hooks
│   ├── useClients.ts             # React Query hooks для клієнтів
│   └── useDeals.ts               # React Query hooks для угод
│
├── lib/                          # Utilities
│   ├── api.ts                    # Axios client + API functions
│   ├── utils.ts                  # Helper functions (cn, etc.)
│   └── validations.ts            # Zod schemas
│
├── providers/                    # React Providers
│   ├── query-provider.tsx        # TanStack Query provider
│   ├── theme-provider.tsx        # next-themes provider
│   └── index.tsx                 # Combined providers
│
├── types/                        # TypeScript Types
│   └── index.ts                  # Shared types (Client, Deal, etc.)
│
├── .env.example
├── .env.local                    # Local environment (gitignored)
├── components.json               # shadcn/ui config
├── next.config.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## ⚡ Features

### Управління клієнтами

**Сторінка**: `/clients`

- ✅ Список клієнтів з пагінацією
- ✅ Створення нового клієнта
- ✅ Редагування існуючого клієнта
- ✅ Видалення клієнта (з підтвердженням)
- ✅ Перехід до деталей клієнта
- ✅ Items per page (10, 20, 50, 100)

**Сторінка деталей**: `/clients/[id]`

- ✅ Інформаційна картка клієнта
- ✅ Breadcrumb навігація
- ✅ Список усіх угод клієнта
- ✅ Кнопка "Додати угоду" (з pre-filled clientId)
- ✅ Редагувати / Видалити клієнта
- ✅ 404 обробка

### Управління угодами

**Сторінка**: `/deals`

- ✅ Список угод з пагінацією
- ✅ Фільтрація за статусом (NEW, IN_PROGRESS, WON, LOST)
- ✅ Фільтрація за клієнтом
- ✅ Комбіновані фільтри
- ✅ Кнопка "Скинути фільтри"
- ✅ URL синхронізація (`?status=NEW&clientId=xxx`)
- ✅ Створення / Редагування / Видалення угоди
- ✅ Відображення інформації про клієнта

### UI/UX

- ✅ **Dark Mode**: Світла / Темна / Системна тема
- ✅ **Responsive**: Mobile, Tablet, Desktop
- ✅ **Loading States**: Skeleton loaders
- ✅ **Toast Notifications**: Успіх / Помилки
- ✅ **Form Validation**: Real-time валідація з помилками
- ✅ **Dropdown Actions**: Три крапки меню для дій
- ✅ **Status Badges**: Кольорові badges для статусів

---

## 🧩 Components

### Client Components

#### ClientsTable
Відображає список клієнтів в таблиці.

**Props:**
```typescript
{
  clients: Client[];
  isLoading?: boolean;
}
```

#### ClientForm
Форма для створення/редагування клієнта з валідацією.

**Props:**
```typescript
{
  mode: 'create' | 'edit';
  initialData?: Client;
  onSubmit: (data: CreateClientInput) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}
```

#### CreateClientDialog
Dialog для створення клієнта.

#### EditClientDialog
Dialog для редагування клієнта.

**Props:**
```typescript
{
  client: Client;
}
```

#### DeleteClientDialog
Dialog підтвердження видалення з попередженням про угоди.

**Props:**
```typescript
{
  client: Client;
  onDeleteSuccess?: () => void;
}
```

### Deal Components

#### DealsTable
Таблиця угод з інформацією про клієнта.

**Props:**
```typescript
{
  deals: Deal[];
  isLoading?: boolean;
}
```

#### DealsFilters
Компонент фільтрів (статус + клієнт).

**Features:**
- Select статусу
- Select клієнта
- Кнопка "Скинути"
- URL синхронізація

#### DealForm
Форма угоди з валідацією.

**Props:**
```typescript
{
  mode: 'create' | 'edit';
  initialData?: CreateDealInput;
  onSubmit: (data: CreateDealInput) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}
```

### Common Components

#### PaginationControls
Універсальний компонент пагінації.

**Props:**
```typescript
{
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  onItemsPerPageChange?: (items: number) => void;
  showItemsPerPage?: boolean;
}
```

### Layout Components

#### Header
Навігація з логотипом, посиланнями та theme toggle.

#### ThemeToggle
Dropdown для вибору теми (Light / Dark / System).

---

## 🎨 Стилізація

### Tailwind CSS v4

Використовується Tailwind CSS v4 з:
- **Utility-first** підхід
- **Dark mode**: Class-based
- **Responsive**: Mobile-first breakpoints
- **Custom colors**: Defined in `tailwind.config.ts`

### shadcn/ui

Використовується shadcn/ui для UI компонентів:
- **Radix UI** primitives (headless components)
- **Tailwind v4** для стилів
- **Accessible** (ARIA, keyboard navigation)
- **Customizable**: Код компонентів в проекті

### CSS Variables

Кольори визначені через CSS змінні в `globals.css`:

```css
:root {
  --background: ...;
  --foreground: ...;
  --primary: ...;
  /* ... */
}

.dark {
  --background: ...;
  /* Dark theme colors */
}
```

### Використання

```tsx
// Tailwind utilities
<div className="flex items-center gap-4 p-4">

// Responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Dark mode
<div className="bg-white dark:bg-gray-900">

// Custom utility (lib/utils.ts)
import { cn } from '@/lib/utils';
<div className={cn("base-class", condition && "conditional-class")}>
```

---

## 📊 State Management

### TanStack Query (React Query)

Вся робота з серверним станом через React Query:

**Переваги:**
- ✅ Автоматичне кешування
- ✅ Автоматичне оновлення (refetch)
- ✅ Optimistic updates
- ✅ Query invalidation
- ✅ Loading / Error states
- ✅ Retry logic

### Hooks Structure

**Pattern**: API Layer → React Query Hooks → Components

#### useClients Hook

```typescript
// Get list (paginated)
const { data, isLoading, error } = useClients({ page, limit });

// Get single client
const { data: client } = useClient(id);

// Create client
const createClient = useCreateClient();
await createClient.mutateAsync(data);

// Update client
const updateClient = useUpdateClient();
await updateClient.mutateAsync({ id, data });

// Delete client
const deleteClient = useDeleteClient();
await deleteClient.mutateAsync(id);
```

#### useDeals Hook

```typescript
// Get list (with filters)
const { data } = useDeals({ page, limit, status, clientId });

// Get single deal
const { data: deal } = useDeal(id);

// Mutations
const createDeal = useCreateDeal();
const updateDeal = useUpdateDeal();
const deleteDeal = useDeleteDeal();
```

### Cache Invalidation

Після мутацій кеш автоматично інвалідується:

```typescript
// Example: After creating client
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ['clients'] });
  toast.success('Клієнта успішно створено');
}
```

### URL State

Фільтри та пагінація зберігаються в URL:

```typescript
const searchParams = useSearchParams();
const page = Number(searchParams.get('page')) || 1;
const status = searchParams.get('status');

// Update URL
const params = new URLSearchParams();
params.set('page', '2');
params.set('status', 'NEW');
router.push(`?${params.toString()}`);
```

---

## 📝 Forms & Validation

### React Hook Form + Zod

```typescript
// Schema definition (Zod)
const clientSchema = z.object({
  name: z.string().min(2, 'Мінімум 2 символи'),
  email: z.string().email('Невірний формат email'),
  phone: z.string().optional(),
});

// Form usage
const form = useForm({
  resolver: zodResolver(clientSchema),
  defaultValues: { name: '', email: '', phone: '' },
});

const onSubmit = async (data) => {
  await createClient.mutateAsync(data);
};
```

### Validation Rules

**Client:**
- Name: Required, min 2 chars
- Email: Required, valid email format
- Phone: Optional

**Deal:**
- Title: Required, min 3 chars
- Amount: Required, positive number
- Status: Required, one of enum values
- ClientId: Required, valid UUID

---

## 🌐 API Integration

### Axios Client

Налаштований Axios client в `lib/api.ts`:

```typescript
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Error interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors
    throw error.response?.data || error;
  }
);
```

### API Functions

```typescript
// clientsApi
export const clientsApi = {
  getAll: (params) => apiClient.get('/clients', { params }),
  getById: (id) => apiClient.get(`/clients/${id}`),
  create: (data) => apiClient.post('/clients', data),
  update: (id, data) => apiClient.patch(`/clients/${id}`, data),
  delete: (id) => apiClient.delete(`/clients/${id}`),
};

// dealsApi
export const dealsApi = {
  getAll: (params) => apiClient.get('/deals', { params }),
  // ... similar structure
};
```

---

## 🧪 Testing Guide

Manual testing checklist: [FRONTEND_TESTING_GUIDE.md](FRONTEND_TESTING_GUIDE.md)

**Основні сценарії:**
- [ ] Navigation між сторінками
- [ ] Створення / Редагування / Видалення клієнта
- [ ] Створення / Редагування / Видалення угоди
- [ ] Фільтрація угод
- [ ] Пагінація
- [ ] Form validation
- [ ] Loading states
- [ ] Responsive design
- [ ] Dark mode

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Environment Variables** в Vercel:
- `NEXT_PUBLIC_API_URL` → Production API URL
- `NEXT_PUBLIC_APP_URL` → Production app URL

### Docker

```bash
# Build image
docker build -t crm-frontend .

# Run container
docker run -p 3001:3001 -e NEXT_PUBLIC_API_URL=http://api:8000/api crm-frontend
```

### Manual Deployment

```bash
# Build
npm run build

# Start
npm start

# Or with PM2
pm2 start npm --name "crm-frontend" -- start
```

---

## 🐛 Troubleshooting

### Cannot connect to API

```bash
# Check .env.local
cat .env.local

# Verify backend is running
curl http://localhost:8000/api/clients

# Check CORS settings in backend
```

### Hydration errors

```bash
# Use suppressHydrationWarning in <html> tag (already done)
# Check for localStorage/theme issues
```

### Build errors

```bash
# Clear .next folder
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

---

## 📚 Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Query Docs](https://tanstack.com/query/latest)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Tutorials
- Next.js App Router
- React Server Components
- TanStack Query v5

---

**Created with ❤️ using Next.js**

[← Back to Main README](../README.md)
