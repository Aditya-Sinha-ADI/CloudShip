# CloudShip 🚀

**A zero-config deployment engine for Google Cloud**

CloudShip lets you deploy **any public GitHub repository** to Google Cloud by simply pasting a repository URL.

> **Paste a repo → CloudShip detects it → builds it → deploys it → returns a live URL**

No Dockerfiles. No infra setup. No manual pipelines.

---

## ✨ What Is CloudShip?

CloudShip is a **control-plane service** that automates application deployments to Google Cloud.  
It detects your project type, selects the right deployment strategy, builds it, and ships it—while your app runs independently on managed Google Cloud services.

---

## 🎯 What CloudShip Does Automatically

- Detects project type (**frontend vs backend**)
- Selects the correct deployment strategy
- Builds the project using Google Cloud Build
- Deploys to the appropriate Google Cloud service
- Returns a **public, live URL**

---

## 🧠 How It Works (v3 Architecture)

```
GitHub Repository
        ↓
Project Detection Engine
        ↓
Deployment Strategy Selector
        ↓
Google Cloud Build
        ↓
Cloud Run (Backend) OR Cloud Storage (Frontend)
```

---

## 🚀 Supported Project Types

### Backend Applications

- Node.js
- Express
- NestJS
- Any app listening on `process.env.PORT`

**Deployment Target:** Google Cloud Run

---

### Frontend Applications

- React (Create React App)
- Vite (React / Vue / Svelte)
- Vue
- Svelte
- Astro
- Plain HTML / CSS / JavaScript

**Deployment Target:** Google Cloud Storage (static hosting)

---

## ⚠️ Frontend Hosting Requirements

Static hosting requires **relative asset paths**.

### Create React App (CRA)

```json
{
  "homepage": "."
}
```

### Vite (React / Vue / Svelte / Vanilla)

```js
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
});
```

### Plain HTML / CSS / JS

No configuration required.

---

## 🧪 Local Development

### Prerequisites

- Node.js 18+
- Google Cloud SDK
- Google Cloud Project

### Setup

```bash
git clone https://github.com/<your-username>/cloudship.git
cd cloudship
npm install
```

### Environment Variables

Create a `.env` file:

```
GCP_PROJECT_ID=your-gcp-project-id
GITHUB_WEBHOOK_SECRET=your-webhook-secret
```

### Run Locally

```bash
npm run dev
```

### Test Deployment

```bash
curl -X POST http://localhost:3000/__local_test/deploy \
  -H "Content-Type: application/json" \
  -d '{ "repoUrl": "https://github.com/username/repo.git" }'
```

---

## ☁️ Google Cloud Setup

```bash
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com storage.googleapis.com
```

Create Artifact Registry:

```bash
gcloud artifacts repositories create deployments --repository-format=docker --location=asia-south1
```

---

## 🔗 GitHub Webhooks

Payload URL:

```
https://<your-cloud-run-url>/webhooks/github
```

- Content-Type: application/json
- Event: Push
- Secret: same as `GITHUB_WEBHOOK_SECRET`

---

## 🔐 Security

- HMAC SHA-256 webhook verification
- No secrets in source control
- Least-privilege IAM roles
- Isolated Cloud Run deployments

---

## 🧭 Project Status

- ✅ Version 3 complete
- 🚧 Version 4 in progress (PR previews, GitHub App)

---

## 👨‍💻 Author

**Aditya Sinha**  
Cloud, DevOps & Platform Engineering
