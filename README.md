# 🌐 Lang Switcher

**Lang Switcher** is a custom Frappe app that adds a language switcher to the top navbar of your Frappe site. It allows users to quickly switch between enabled languages marked specifically for the switcher.

---

## 🚀 Features

- Adds a dropdown to the Frappe navbar for language switching
- Fetches only languages marked with the `Lang Switcher` checkbox
- Updates the logged-in user's language setting in real-time
- Supports dynamic UI updates via Frappe's client-side API

---

## 🛠️ Installation

Install Lang Switcher using the [bench CLI](https://github.com/frappe/bench):

```bash
cd $PATH_TO_YOUR_BENCH
bench get-app https://github.com/nalden141/Lang_Switcher
bench install-app lang_switcher
```

---
⚙️ Usage

1. Go to the Language doctype.

2. Check the Lang Switcher box to include it in the switcher dropdown.

3. The language will now appear in the top-right dropdown menu.

4. The selected language is saved to the current user's profile and applied immediately.

---

## 📁 Fixtures

Lang Switcher adds the following custom field:

```json
{
  "doctype": "Custom Field",
  "dt": "Language",
  "fieldname": "custom_lang_switcher",
  "fieldtype": "Check",
  "label": "Lang Switcher",
  "insert_after": "enabled"
}
```
Only languages with this checkbox enabled will show in the dropdown.

---

## 🧪 JavaScript Overview

The frontend component is located in:



/lang_switcher/public/lang_switcher.bundle.js

It:

- Adds a dropdown to the navbar  
- Loads eligible languages from the server  
- Lets users switch their active language  
- Triggers a cache clear to apply the change

---

## 📄 License

MIT

