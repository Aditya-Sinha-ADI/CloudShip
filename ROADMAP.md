# CloudShip Roadmap 🧭

This document outlines the planned evolution of **CloudShip**, focusing on improving developer experience, scalability, and production readiness.

---

## ✅ Version 3 — Current (Completed)

**Focus:** Core deployment engine & stability

- Zero-config deployment via GitHub repository URL
- Automatic project type detection (frontend / backend)
- Smart deployment strategy selection
- Backend deployments to Google Cloud Run
- Frontend static hosting on Google Cloud Storage
- Dockerfile-free builds using Google Cloud Build
- Manual deployment trigger API
- GitHub webhook support (push-based deployments)
- Secure HMAC SHA-256 webhook verification
- Centralized deployment logs & status tracking
- Isolated Cloud Run services per deployment

---

## 🚧 Version 4 — In Progress

**Focus:** Collaboration & preview workflows

- Pull Request (PR) preview deployments
- Temporary preview URLs per PR
- Automatic teardown after PR merge/close
- GitHub App integration (replacing manual webhooks)
- Branch-based deployments (dev / staging / main)
- Improved deployment status UI
- Build & deployment history per repository

---

## 🔜 Version 5 — Planned

**Focus:** Developer experience & configurability

- Custom domain support for deployments
- Environment variable management per project
- Config overrides via `cloudship.config.json`
- Deployment rollback support
- Region selection for Cloud Run services
- Build caching for faster redeployments
- CLI tool (`cloudship deploy`)

---

## 🌱 Version 6 — Future

**Focus:** Platform maturity & scale

- Multi-cloud support (AWS / Azure)
- Private GitHub repository support
- Organization-level dashboards
- Team access & role-based permissions
- Usage metrics & deployment analytics
- Cost estimation & optimization insights
- Enterprise SSO integration

---

## 🧠 Guiding Principles

- **Zero-config by default**
- **Opinionated, but flexible**
- **Production-ready infrastructure**
- **Developer-first experience**

---

## 📌 Notes

This roadmap is subject to change based on user feedback and real-world usage.
Community suggestions and contributions are welcome.

---

Built by **Aditya Sinha**  
CloudShip — simplifying cloud deployments.
