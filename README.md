# 📐 PlayWright — Page Object Model (POM)

> A clean implementation of the **Page Object Model (POM)** design pattern using Playwright — built for scalable, readable, and maintainable test automation.

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

---

## 📌 Project Overview

This project is a **reference implementation** of the Page Object Model (POM) design pattern with Playwright. It demonstrates industry best practices for structuring automation test projects in a way that is easy to scale, read, and maintain across large QA teams.

---

## 🧠 What is Page Object Model?

The **Page Object Model (POM)** is a design pattern in test automation that:

- Creates an **object repository** for web UI elements
- Separates **test logic** from **page interaction logic**
- Makes tests **easier to maintain** — one change in UI = one change in code
- Improves **code reusability** across test files
- Makes tests more **readable** and **self-documenting**

---

## 🏗️ Project Structure

```
PlayWright-POM/
│
├── pages/                      # Page Object classes
│   ├── BasePage.js             # Base class with shared methods
│   ├── LoginPage.js            # Login page interactions
│   ├── DashboardPage.js        # Dashboard page interactions
│   └── FormPage.js             # Form page interactions
│
├── tests/                      # Test specifications
│   ├── login.spec.js
│   ├── dashboard.spec.js
│   └── form.spec.js
│
├── utils/
│   ├── helpers.js              # Reusable utility functions
│   └── constants.js            # URLs and test data constants
│
├── playwright.config.js
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

- **Framework:** Playwright
- **Language:** JavaScript
- **Pattern:** Page Object Model (POM)
- **Base Class:** Shared BasePage for common actions
- **Reporting:** Playwright HTML Reporter

---

## ⚙️ Prerequisites

- Node.js (v16 or above)
- npm (v7 or above)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/usmanabbas-qa/PlayWright-POM.git
cd PlayWright-POM
```

### 2. Install dependencies
```bash
npm install
npx playwright install
```

### 3. Run all tests
```bash
npx playwright test
```

### 4. Run with UI mode
```bash
npx playwright test --ui
```

### 5. View report
```bash
npx playwright show-report
```

---

## 📊 POM Implementation Example

```javascript
// pages/LoginPage.js — Page Object Class
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput    = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton   = page.locator('button[type="submit"]');
    this.errorMessage  = page.locator('.error-msg');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

// tests/login.spec.js — Clean Test using POM
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Valid user can login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('user@test.com', 'pass123');
  await expect(page).toHaveURL('/dashboard');
});
```

---

## 💡 Key POM Benefits Demonstrated

- ✅ Zero duplication of locators across tests
- ✅ Single point of change for UI updates
- ✅ Human-readable test names and steps
- ✅ Reusable page methods across multiple test files
- ✅ Easy onboarding for new team members

---

## 🤝 Connect With Me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-usmanabbas--qa-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/usmanabbas-qa)
[![Gmail](https://img.shields.io/badge/Gmail-usmanabbas7400@gmail.com-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:usmanabbas7400@gmail.com)

---

⭐ **If you found this project helpful, please give it a star!**
