# MobilePOS

MobilePOS is a mobile-first point-of-sale application built for small shops and retail businesses. It is designed to help shop owners and staff handle sales, stock lookups, customer flows, and role-aware operations directly from a mobile device.

The project combines a React Native frontend with a backend service layer intended for authentication, business logic, and reporting.

## Overview

MobilePOS is built for retail environments where operational speed matters. It helps users:

- process sales quickly
- track inventory and stock levels
- manage staff roles and permissions
- review basic business metrics
- support mobile checkout and product scanning flows

## Tech Stack

### Frontend
- React Native
- Expo
- TypeScript
- Zustand
- React Navigation
- NativeWind / tailwind-style UX patterns

### Backend
- Django
- Django REST Framework
- JWT-based authentication

## Core Features

- Mobile point-of-sale workflow
- Role-based access for owners, managers, and attendants
- Inventory checks during sales
- Product scanning support planned for barcode/QR workflows
- Dashboard and reporting foundations
- Modular frontend/backend architecture for future expansion

## Roles

| Role | Access |
|---|---|
| Owner | Full access to management, reporting, and settings |
| Manager | Inventory and operational oversight |
| Shop Attendant | Sales and checkout-focused access |

## Project Structure

```bash
MobilePOS/
├── frontend/          # React Native app
│   ├── app/           # Expo Router screens
│   ├── components/    # Reusable UI
│   ├── store/         # Zustand stores
│   ├── services/      # API client code
│   ├── types/         # Shared types
│   ├── package.json   # Frontend dependencies and scripts
│   └── ...
├── backend/           # Django API backend
│   ├── manage.py
│   ├── requirements.txt
│   └── ...
├── requirements.txt   # Project-level dependency list
├── README.md          # Project documentation
└── .gitignore
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/MuchiraIrungu/MobilePOS.git
cd MobilePOS
```

### 2. Backend setup

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 3. Frontend setup

```bash
cd frontend
npm install
npx expo start
```

Then open the app in:

- Expo Go
- Android emulator
- iOS simulator

## Environment Variables

Create environment settings for your backend connection and app credentials as needed. A typical backend config may include:

```env
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=postgresql://user:password@localhost:5432/mobilepos
```

For the frontend, use environment variables if the app is consuming an API base URL:

```env
EXPO_PUBLIC_API_URL=http://localhost:8000
```

## Authentication

The application is intended to use JWT-based authentication. The expected flow is:

1. User logs in
2. Backend returns access and refresh tokens
3. Frontend stores tokens securely
4. Protected requests use the bearer token
5. Refresh flow is used when the access token expires

## Development Roadmap

### Current status
- Project scaffolding complete
- Frontend and backend structure set up
- Auth foundations in place
- Core POS UI and mobile app flow under active development

### Planned features
- QR code and barcode scanning
- Dashboard analytics
- Sales and inventory reports
- Stronger role-based permissions
- Better error handling and offline readiness

## Best Practices for This Repo

- Keep UI logic in the frontend and business logic in the backend
- Centralize API calls in a dedicated service layer
- Reuse Zustand stores for shared app state
- Keep role checks explicit and consistent
- Add validation and tests as modules are completed

## Contributing

This project is in active development. Contributions are welcome as the system evolves. If you are working on the repo:

- keep feature work scoped
- follow the project structure closely
- add documentation for new modules and endpoints
- keep commits focused and readable

## License

Copyright (c) 2026 MuchiraIrungu

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
