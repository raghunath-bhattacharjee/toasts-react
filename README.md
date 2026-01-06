# 🚀 React Toast Library

A **lightweight, dependency-free React toast notification library** with built-in CSS-in-JS style injection, optimized for modern React apps.

---

## 📦 Peer Dependencies

This library **does not bundle React**. You must install the following peer dependencies:

```bash
npm install react react-dom
```

**Required versions:**

```json
"peerDependencies": {
  "react": "^19.2.3",
  "react-dom": "^19.2.3"
}
```

> ✅ This ensures compatibility across multiple React projects without version conflicts.

---

## ⚡ Quick Start

### 1️⃣ Install the library

```bash
npm install toasts-react
```

or

```bash
yarn add toasts-react
```

---

### 2️⃣ Inject the Toast Provider (One Time)

Wrap your root application with `ToastProvider`.

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ToastProvider } from "toasts-react";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ToastProvider>
    <App />
  </ToastProvider>
);
```

> ⚠️ **Important**:
> `ToastProvider` must be added **once**, preferably at the app root.

---

### 3️⃣ Show a Toast Anywhere

```jsx
import React from "react";

import { ToastProvider, useToast } from "toasts-react";

const Button = () => {
  const { success, error, info, warning } = useToast();

  const buttonClick = () => {
    success("Profile updated successfully");
    error("Something went wrong");
    info("New update available");
    warning("Password is weak");
  }

  return <button onClick={() => buttonClick()}>Toast</button>;
}

export default function App() {
  return (
    <ToastProvider>
      <Button />
    </ToastProvider>
  );
}
```

---

## 🎨 How Style Injection Works (CSS-in-JS)

This library uses **runtime CSS injection** instead of external `.css` files.

### 🔹 Why CSS-in-JS?

* No global CSS conflicts
* Zero setup required
* Works in SSR & Micro-frontend apps
* Fully tree-shakable

---

### 🔹 How it works internally

On first render of `ToastProvider`:

1. A `<style>` tag is created
2. Toast styles are injected into `document.head`
3. Styles are injected **only once**
4. No re-injection on re-renders

```js
if (!document.getElementById("__toast_styles__")) {
  const style = document.createElement("style");
  style.id = "__toast_styles__";
  style.innerHTML = TOAST_CSS;
  document.head.appendChild(style);
}
```

> ✅ Safe for multiple React roots
> ✅ Safe for Module Federation
> ✅ Safe for Next.js / Vite / CRA

---

## 🧠 Architecture Overview

```
toasts-react
│
├── ToastProvider
│   ├── ToastContext
│   ├── Style Injector (CSS-in-JS)
│   └── ToastContainer
│
├── toast (imperative API)
│
├── ToastItem
│   ├── Animation engine
│   ├── Auto dismiss logic
│   └── Event handlers
│
└── Core Store (in-memory)
```

---

### 🔹 Design Philosophy

* **Imperative API** (`toast.success()`)
* **Declarative rendering**
* **No Redux / Zustand required**
* **Zero external dependencies**

---

## 🧩 Full API Reference

---

### `toast.success(message, options?)`

```js
toast.success("Saved successfully");
```

---

### `toast.error(message, options?)`

```js
toast.error("Failed to save");
```

---

### `toast.info(message, options?)`

```js
toast.info("New version available");
```

---

### `toast.warning(message, options?)`

```js
toast.warning("Low disk space");
```

---

### `toast.custom(renderFn, options?)`

```jsx
toast.custom(() => (
  <div>
    <strong>Custom Toast</strong>
    <p>Hello world</p>
  </div>
));
```

---

### Options Object

```ts
{
  duration?: number;     // default: 3000
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  dismissible?: boolean; // default: true
  id?: string;           // for manual control
}
```

---

### `toast.dismiss(id?)`

```js
toast.dismiss();      // dismiss all
toast.dismiss("id"); // dismiss specific toast
```

---

## 📍 Toast Positions

Supported positions:

* `top-right` (default)
* `top-left`
* `bottom-right`
* `bottom-left`

```js
toast.success("Hello", {
  position: "bottom-left",
});
```

---

## 🧪 Examples

---

### ✅ Basic Example

```jsx
<button onClick={() => toast.success("Login successful")}>
  Login
</button>
```

---

### ⏱ Auto Dismiss Control

```js
toast.info("Uploading...", {
  duration: 6000,
});
```

---

### ❌ Disable Dismiss

```js
toast.error("Critical error", {
  dismissible: false,
});
```

---

### 🧬 Unique Toast ID

```js
toast.success("Saved", { id: "save-toast" });

// later
toast.dismiss("save-toast");
```

---

## 🏗 Architecture (Deep Dive)

### 🔹 Core Store

* In-memory array
* No external state manager
* Minimal re-renders

```ts
let toasts = [];
```

---

### 🔹 Rendering Strategy

* Single `ToastContainer`
* Uses React Portals
* Isolated DOM layer

---

### 🔹 Performance

* O(1) insert
* Batched removals
* Zero layout thrashing

---

## 🧠 Best Practices

### ✅ Do

* Mount `ToastProvider` once
* Use semantic toast types (`success`, `error`)
* Use IDs for long-running tasks

---

### ❌ Avoid

* Mounting provider multiple times
* Using toasts for critical blocking UX
* Overusing custom JSX toasts

---

## 🔒 SSR Compatibility

✔ Works with:

* Next.js
* Remix
* Astro
* Vite SSR

> Styles are injected **only on client mount**.

---

## 📦 Bundle Size

* **< 4KB gzipped**
* Tree-shakable
* No CSS files
* No icons bundled

---

## 🧭 Roadmap

* ⏳ Swipe-to-dismiss
* ⏳ Promise-based toast
* ⏳ Theme tokens
* ⏳ Accessibility roles

---

## 🧑‍💻 Contribution Guidelines

```bash
git clone <repo>
npm install
npm run build
```
