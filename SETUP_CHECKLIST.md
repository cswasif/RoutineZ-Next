# Next.js + Tailwind Setup Checklist

## Required Configuration Files

### 1. Next.js Configuration
- [ ] `next.config.js` (NOT `.ts` or `.mjs`)
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
```

### 2. Tailwind Configuration
- [ ] `tailwind.config.js` (NOT `.ts` or `.mjs`)
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
```

### 3. PostCSS Configuration
- [ ] `postcss.config.js` (NOT `.ts` or `.mjs`)
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### 4. Global CSS
- [ ] `src/app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 0%;
  --card: 0 0% 100%;
  --card-foreground: 0 0% 0%;
  --border: 0 0% 90%;
  --input: 0 0% 90%;
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 100%;
  --secondary: 0 0% 96%;
  --secondary-foreground: 0 0% 9%;
  --accent: 0 0% 96%;
  --accent-foreground: 0 0% 9%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  --ring: 0 0% 90%;
}

.dark {
  --background: 0 0% 0%;
  --foreground: 0 0% 100%;
  --card: 0 0% 0%;
  --card-foreground: 0 0% 100%;
  --border: 0 0% 20%;
  --input: 0 0% 20%;
  --primary: 0 0% 98%;
  --primary-foreground: 0 0% 9%;
  --secondary: 0 0% 15%;
  --secondary-foreground: 0 0% 98%;
  --accent: 0 0% 15%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  --ring: 0 0% 20%;
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

## Required Dependencies

### 1. Core Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "next": "^14.1.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.1"
  }
}
```

### 2. Development Dependencies
```json
{
  "devDependencies": {
    "typescript": "^5.3.3",
    "@types/node": "^20.11.16",
    "@types/react": "^18.2.52",
    "@types/react-dom": "^18.2.18",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "@tailwindcss/forms": "^0.5.7"
  }
}
```

## Common Issues & Solutions

### 1. Plain HTML/No Styles
If you see unstyled HTML, check:
- [ ] All configuration files exist and have correct extensions (`.js` not `.ts`)
- [ ] `globals.css` is imported in `layout.tsx`
- [ ] Tailwind directives exist in `globals.css`
- [ ] Content paths in `tailwind.config.js` match your project structure
- [ ] Run `npm install` with `--legacy-peer-deps` flag if needed

### 2. Font Issues
When using Google Fonts:
- [ ] Use only fonts available in `next/font/google`
- [ ] Import and configure fonts in `layout.tsx`
- [ ] Apply font classes correctly
- [ ] Common fonts: `Inter`, `Roboto`, `Open_Sans`, `Montserrat`

### 3. Development Server
If the dev server fails:
- [ ] Stop any running instances
- [ ] Clear `.next` cache directory
- [ ] Reinstall dependencies
- [ ] Check for TypeScript errors
- [ ] Verify Next.js version compatibility

## Verification Steps

1. Start Development Server:
```bash
npm run dev
```

2. Check Terminal Output:
- [ ] No configuration errors
- [ ] No TypeScript errors
- [ ] No module resolution errors

3. Check Browser:
- [ ] Styles are applied
- [ ] Fonts are loaded
- [ ] No console errors
- [ ] Layout is responsive