# MobilePOS

A mobile point-of-sale (POS) application built for shops and small retail businesses, supporting role-based access for owners, managers, and shop attendants.

## Overview

MobilePOS lets shop owners manage sales, inventory, and staff activity from a mobile app, with a Django-powered backend handling authentication, data, and reporting.

## Tech Stack

**Frontend**
- React Native
- Zustand (state management)

**Backend**
- Django
- Django REST Framework (DRF)
- Simple JWT (authentication)

## Current Status

🚧 Early development

- [x] Project setup (frontend + backend scaffolding)
- [x] JWT authentication (login/token handling)
- [ ] QR code scanner
- [ ] Dashboard metrics
- [ ] Reports
- [ ] Role-based access (Owner / Manager / Shop Attendant)

## Planned Features

- **QR Code Scanner** — scan product QR/barcodes for fast checkout and inventory lookup
- **Dashboard Metrics** — real-time sales, stock, and staff activity overview
- **Reports** — sales and inventory reports, likely filterable by date range and staff member
- **Role-Based Access** — three user roles with different permissions:
  | Role | Description |
  |------|-------------|
  | **Owner** | Full access — reports, dashboard, staff management, settings |
  | **Manager** | Manages inventory, staff activity, and day-to-day reports |
  | **Shop Attendant** | Handles sales/checkout and QR scanning only |

## Project Structure

```
mobilePOS/
├── frontend/          # React Native app
│   ├── src/
│   ├── package.json
│   └── ...
├── backend/           # Django REST Framework API
│   ├── manage.py
│   ├── requirements.txt
│   └── ...
└── README.md
```

> Update this tree to match your actual folder layout as the project grows.

## Getting Started

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend Setup

```bash
cd frontend
npm install
npx react-native run-android   # or run-ios
```

### Environment Variables

Create a `.env` file in `backend/` with at least:

```
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=your-database-url
```

## Authentication

Authentication is handled via **Simple JWT**. On login, the API returns an access and refresh token pair; the access token is sent as a Bearer token on subsequent requests, and the refresh token is used to obtain new access tokens once they expire.

## Roadmap

1. Finish role-based permissions (Owner / Manager / Shop Attendant)
2. Build QR code scanner integration
3. Build dashboard metrics screen
4. Build reports module
5. Polish UI/UX and prepare for beta testing

## Contributing

This is currently a solo/early-stage project. Contribution guidelines will be added once the core features are stable.

## License

Copyright (c) [2026] [MuchiraIrungu]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
