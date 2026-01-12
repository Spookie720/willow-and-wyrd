# Willow & Wyrd 🌿🌙
_a Wispmire project_

> A cozy witch-themed mental health and medical care app where you can track your moods, journal entries, and medications — framed as Grimoire pages and Healing Brews.

## ✨ Overview

**Willow & Wyrd** is a full-stack project built as part of my portfolio:

- **Frontend:** React (SPA) with a witchy, cozy aesthetic
- **Backend:** FastAPI (Python) with a SQLite database via SQLModel
- **Theme:** Soft dark, candlelit cottage meets strange magic — set in my original Wispmire universe

This MVP currently focuses on two core features:

- **📖 Grimoire Pages (Journal):**
  Log mood + free-text entries, view past pages in a timeline.

- **🧪 Healing Brews (Medications):**
  Track medications as "potions" with name, dosage, schedule, notes, and an active/paused state.

Planned future features:

- 🌕 Wyrd Flow — daily spoon / energy tracking
- 🕯 Coven Contacts — doctors, therapists, and appointments
- 🔐 Auth & user accounts
- 📱 Mobile client (React Native)

---

## 🧰 Tech Stack

**Frontend**
- React (Create React App)
- Fetch API for HTTP
- Custom CSS (no UI framework)

**Backend**
- Python 3
- FastAPI
- SQLModel + SQLite
- Uvicorn
- CORS middleware for local dev

---

## 🚀 Getting Started

### Backend (FastAPI + SQLite)

From the `backend/` directory:

```bash
python3 -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
