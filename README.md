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


## 🏗 Architecture (Deep Dive)

### 🔹 Core Store

* In-memory array
* No external state manager
* Minimal re-renders


### 🔹 Rendering Strategy

* Single `ToastContainer`
* Uses React Portals
* Isolated DOM layer

---

## 🧠 Best Practices

### ✅ Do

* Mount `ToastProvider` once
* Use semantic toast types (`success`, `error`)
* Use IDs for long-running tasks

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
git clone https://github.com/raghunath-bhattacharjee/toasts-react.git
npm install
npm run build
```
