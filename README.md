# Auto Deploy to Google Cloud (V1)

A backend service that accepts a public GitHub repository URL and automatically builds and deploys the application to Google Cloud Run using Cloud Build and Artifact Registry.

This project abstracts CI/CD and cloud infrastructure complexity behind a single API endpoint.

---

## 🚀 Features (Version 1)

- Deploy any Dockerized GitHub repository with one API call
- Automated build and containerization using Cloud Build
- Image storage in Artifact Registry
- Serverless deployment to Cloud Run
- No Google Cloud setup required from the user

---

## 🧠 How It Works

1. User submits a public GitHub repository URL
2. The service clones the repository
3. Builds a Docker image
4. Pushes the image to Artifact Registry
5. Deploys the container to Cloud Run
6. Returns a live public URL

---

## 🧱 Tech Stack

- Node.js (Express)
- Docker
- Google Cloud Build
- Artifact Registry
- Cloud Run

---

## ⚙️ API Usage

### Deploy a repository
```http
POST /deploy
Content-Type: application/json

{
  "repoUrl": "https://github.com/username/repository"
}
