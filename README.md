# MeetSpace | Meeting Room Booking System

MeetSpace is a modern, full-stack web application designed to streamline the process of booking meeting rooms. Built with a robust Django backend and a responsive React frontend, it offers a seamless experience for users to find and reserve workspace.

![MeetSpace Banner](https://img.shields.io/badge/Status-Development-orange?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-Django%20%7C%20React%20%7C%20PostgreSQL-blue?style=for-the-badge)

## 🚀 Features

- **Room Discovery**: Browse available meeting rooms with details on capacity and amenities.
- **Instant Booking**: Real-time room reservation system.
- **User Dashboard**: Manage your bookings, view history, and cancel upcoming reservations.
- **Secure Authentication**: User registration and login system.
- **Responsive Design**: Premium UI optimized for both desktop and mobile viewing.
- **Dockerized Environment**: Ready for development and deployment using Docker.

## 🛠️ Technology Stack

### Backend
- **Framework**: [Django 5.1](https://www.djangoproject.com/)
- **API**: [Django REST Framework](https://www.django-rest-framework.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **CORS**: `django-cors-headers`

### Frontend
- **Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Styling**: Vanilla CSS (Custom Premium Design)

---

## 📦 Getting Started

### Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop/) & [Docker Compose](https://docs.docker.com/compose/install/)
- (Optional for manual setup) Python 3.10+ and Node.js 18+

### Setup with Docker (Recommended)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mssanwel/meet-space-booking.git
   cd meet-space-booking
   ```

2. **Build and Run the containers**:
   ```bash
   docker-compose up --build
   ```

3. **Access the Application**:
   - **Frontend**: [http://localhost:5173](http://localhost:5173)
   - **Backend API**: [http://localhost:8000/api](http://localhost:8000/api)
   - **Admin Interface**: [http://localhost:8000/admin](http://localhost:8000/admin)

### Manual Setup (Development)

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 📂 Project Structure

```text
.
├── backend/            # Django project files
│   ├── bookings/       # Main application logic
│   ├── core/           # Project settings
│   └── requirements.txt
├── frontend/           # React application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # View components
│   │   └── api.js      # API service layer
│   └── package.json
└── docker-compose.yml  # Orchestration file
```

## 🔐 Environment Selection

The application uses the following default ports:
- **Web App**: 5173
- **API Server**: 8000
- **Database**: 5432

---

## 🤝 Contributing

1. Fork the project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

Developed with ❤️ by [mssanwel](https://github.com/mssanwel)
