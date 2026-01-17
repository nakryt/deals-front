# Providers

Ця директорія містить провайдери для React-додатку.

## Структура

```
providers/
├── index.tsx              # Основний провайдер (комбінує всі провайдери)
├── query-provider.tsx     # TanStack Query провайдер
├── theme-provider.tsx     # Next-themes провайдер
└── README.md             # Ця документація
```

## Провайдери

### QueryProvider

**Файл**: `query-provider.tsx`

Налаштовує TanStack Query (React Query) для управління серверним станом.

**Конфігурація**:
- `staleTime`: 60 секунд (дані вважаються свіжими протягом 1 хвилини)
- `refetchOnWindowFocus`: false (не перезавантажувати при фокусуванні вікна)
- `retry`: 1 спроба для запитів, 0 для мутацій
- `gcTime`: 5 хвилин (час кешування)

### ThemeProvider

**Файл**: `theme-provider.tsx`

Надає підтримку темної/світлої теми через `next-themes`.

**Конфігурація**:
- `attribute`: "class" (використовує CSS класи для перемикання тем)
- `defaultTheme`: "system" (за замовчуванням використовує системну тему)
- `enableSystem`: true (дозволяє системну тему)
- `disableTransitionOnChange`: true (відключає анімацію при зміні теми)

## Використання

Провайдери автоматично застосовуються в `app/layout.tsx`:

```tsx
import { Providers } from "@/providers";

export default function RootLayout({ children }) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

## Додавання нового провайдера

1. Створіть новий файл в цій директорії (наприклад, `auth-provider.tsx`)
2. Додайте його до `index.tsx`:

```tsx
import { AuthProvider } from "./auth-provider";

export function Providers({ children }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
```

## Компоненти, що використовують провайдери

- **ThemeToggle** (`components/layout/theme-toggle.tsx`): Використовує `useTheme()` з `next-themes`
- **Всі хуки в `hooks/`**: Використовують `useQuery` та `useMutation` з TanStack Query
