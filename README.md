# BloodMatch Blood Donation

![BloodMatch Logo](frontend/public/android-chrome-192x192.png)

**BloodMatch** is a Firebase-based Progressive Web App (PWA) designed to connect blood donors with recipients in real-time across Uganda. By leveraging geolocation-based matching, multi-channel notifications, and comprehensive healthcare resources, BloodMatch addresses the critical need for efficient blood donation systems. The app provides an intuitive, offline-capable, and responsive user experience, showcasing advanced full-stack development, geospatial technology, and user-centric design.

## Table of Contents
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Setup Instructions](#setup-instructions)
- [Usage](#usage)
  - [Running Locally](#running-locally)
  - [Accessing the App](#accessing-the-app)
- [Deployment](#deployment)
  - [Firebase Hosting](#firebase-hosting)
  - [Vercel Deployment](#vercel-deployment)
- [Directory Structure](#directory-structure)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Contact](#contact)

## Project Overview

BloodMatch aims to streamline blood donation in Uganda by connecting donors and recipients through a modern web platform. The app enables users to:
- **Donors**: View nearby blood requests on an interactive map, filter by blood type, and get directions via Google Maps.
- **Recipients**: Submit urgent blood requests with geolocation data for real-time matching.
- **Admins**: Manage user roles and monitor platform activity via an analytics dashboard.
- **All Users**: Access curated healthcare resources, including emergency services, hospitals, and pharmacies.

Built as a PWA, BloodMatch offers offline support, installability, and a native app-like experience. It integrates Firebase for authentication, Firestore for data storage, and Cloud Functions for backend logic, with GeoFire for geolocation queries and Twilio/Nodemailer for notifications.

The project is deployed at [https://BloodMatch-a3b6c.web.app/](https://BloodMatch-a3b6c.web.app/) and open-sourced at [https://github.com/jjingofarouk/BloodMatch](https://github.com/jjingofarouk/BloodMatch).

## Key Features

- **Geolocation-Based Matching**: Uses GeoFire to match donors with nearby blood requests based on location and blood type compatibility.
- **Real-Time Notifications**: Sends push, email, and SMS notifications via Firebase, Twilio, and Nodemailer for request updates.
- **Interactive Map**: Displays blood requests on a Leaflet-powered map with filters and Google Maps directions.
- **Progressive Web App**: Offers offline support, installability, and fast performance with a service worker and manifest.
- **Admin Dashboard**: Provides analytics with Chart.js to monitor user activity and request trends.
- **Healthcare Resources**: Includes curated lists of Ugandan ambulance services, hospitals, and pharmacies.
- **Secure Backend**: Uses Firebase Authentication, Firestore, and Cloud Functions for robust and secure data management.
- **Responsive UI**: Features a hamburger menu and red-white theme, optimized for mobile and desktop with React and custom CSS.

## Technologies Used

### Frontend
- **React**: ^18.3.1 (component-based UI)
- **TypeScript**: ^4.9.5 (type-safe development)
- **CSS**: Custom styles for responsive design
- **Leaflet**: ^1.9.4 (interactive maps)
- **Chart.js**: ^4.4.9 (admin analytics)
- **React Router**: ^6.30.0 (client-side routing)
- **PWA Features**: Service worker and manifest for offline support

### Backend
- **Firebase**: ^10.14.1 (authentication, Firestore, Cloud Functions, Storage, Hosting)
- **Node.js**: Backend logic for Cloud Functions
- **GeoFire**: ^6.0.0 (geolocation queries)
- **Twilio**: SMS notifications
- **Nodemailer**: Email notifications

### Development Tools
- **pnpm**: ^7.33.5 (package management)
- **React Scripts**: ^5.0.1 (build and development scripts)
- **ESLint**: Linting for code quality
- **Vercel CLI**: ^41.7.3 (alternative deployment)

## Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js**: v16 or higher ([Download](https://nodejs.org/))
- **pnpm**: v7 or higher (`npm install -g pnpm`)
- **Firebase CLI**: For deployment (`npm install -g firebase-tools`)
- **Vercel CLI**: Optional, for Vercel deployment (`npm install -g vercel`)
- **Git**: For cloning the repository
- **Firebase Account**: For Firebase services (Authentication, Firestore, Storage, Cloud Functions)
- **Twilio Account**: For SMS notifications
- **Email Service**: For Nodemailer (e.g., Gmail SMTP)

### Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/jjingofarouk/BloodMatch.git
   cd BloodMatch/frontend
   ```

2. **Install Dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure Firebase**:
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com).
   - Enable Authentication (Email/Password), Firestore, Storage, and Cloud Functions.
   - Copy your Firebase configuration to `frontend/src/services/firebaseConfig.js`:
     ```javascript
     // frontend/src/services/firebaseConfig.js
     import { initializeApp } from 'firebase/app';
     import { getAuth } from 'firebase/auth';
     import { getFirestore } from 'firebase/firestore';
     import { getStorage } from 'firebase/storage';

     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID",
     };

     const app = initializeApp(firebaseConfig);
     export const auth = getAuth(app);
     export const db = getFirestore(app);
     export const storage = getStorage(app);
     ```
   - Replace placeholders with your Firebase project credentials.

4. **Configure Twilio and Nodemailer**:
   - For Twilio, set up a Twilio account and obtain your Account SID, Auth Token, and phone number.
   - For Nodemailer, configure an email service (e.g., Gmail SMTP) with credentials.
   - Add environment variables to `frontend/.env`:
     ```bash
     # frontend/.env
     REACT_APP_TWILIO_SID=your_twilio_sid
     REACT_APP_TWILIO_TOKEN=your_twilio_token
     REACT_APP_TWILIO_PHONE=your_twilio_phone
     REACT_APP_EMAIL_USER=your_email
     REACT_APP_EMAIL_PASS=your_email_password
     ```

5. **Set Up Environment Variables**:
   - Create a `.env` file in `frontend/` with additional configurations:
     ```bash
     REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
     REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
     ```
   - Obtain a Google Maps API key for the Leaflet map integration.

6. **Update PWA Assets**:
   - Ensure `frontend/public/` contains:
     - `manifest.json` (provided previously)
     - `service-worker.js` (provided previously)
     - Icon files: `android-chrome-192x192.png`, `android-chrome-512x512.png`, `favicon.ico`
   - Generate icons using a tool like [Favicon.io](https://favicon.io/) with a red-white theme.

## Usage

### Running Locally
1. Start the development server:
   ```bash
   cd frontend
   pnpm start
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser.
3. Log in or register to access features based on your role (donor, recipient, admin).

### Accessing the App
- **Donors**: Navigate to `/donor` to view blood requests on the map.
- **Recipients**: Go to `/recipient` to submit blood requests.
- **Admins**: Access `/admin` for user management and analytics.
- **Profile**: Update your profile at `/profile`.
- **Resources**: View emergency services (`/emergency`), hospitals (`/hospitals`), and pharmacies (`/pharmacies`).

## Deployment

### Firebase Hosting
1. Log in to Firebase:
   ```bash
   firebase login
   ```
2. Initialize Firebase Hosting:
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project.
   - Set `frontend/build` as the public directory.
   - Configure as a single-page app (rewrite all URLs to `index.html`).
3. Build the app:
   ```bash
   cd frontend
   pnpm run build
   ```
4. Deploy to Firebase:
   ```bash
   firebase deploy --only hosting
   ```
5. Access the app at the provided Firebase Hosting URL (e.g., `https://BloodMatch-a3b6c.web.app/`).

### Vercel Deployment
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Log in to Vercel:
   ```bash
   vercel login
   ```
3. Deploy from the `frontend` directory:
   ```bash
   cd frontend
   vercel
   ```
4. Follow prompts to configure the project (use `frontend` as the root directory).
5. Deploy to production:
   ```bash
   vercel --prod
   ```

## Directory Structure
```
BloodMatch/
├── frontend/
│   ├── public/
│   │   ├── manifest.json
│   │   ├── service-worker.js
│   │   ├── favicon.ico
│   │   ├── android-chrome-192x192.png
│   │   └── android-chrome-512x512.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   └── UserManagement.js
│   │   │   ├── auth/
│   │   │   │   ├── Login.js
│   │   │   │   └── Register.js
│   │   │   ├── common/
│   │   │   │   ├── EmergencyServices.js
│   │   │   │   ├── Hospitals.js
│   │   │   │   ├── Navbar.js
│   │   │   │   ├── Pharmacies.js
│   │   │   │   └── Profile.js
│   │   │   ├── donor/
│   │   │   │   └── DonorDashboard.js
│   │   │   └── recipient/
│   │   │       ├── RequestBlood.js
│   │   │       └── RequestStatus.js
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── NotificationContext.js
│   │   ├── services/
│   │   │   └── firebaseConfig.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   ├── index.css
│   │   └── serviceWorkerRegistration.js
│   ├── .browserslistrc
│   ├── .eslintrc.json
│   ├── .env
│   ├── babel.config.json
│   ├── package.json
│   └── pnpm-lock.yaml
├── README.md
└── .gitignore
```

## Contributing
We welcome contributions to improve BloodMatch! To contribute:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request with a detailed description of your changes.

Please follow the [Code of Conduct](CODE_OF_CONDUCT.md) and ensure your code adheres to ESLint rules.

## Troubleshooting

- **Build Error: `Redirect` not exported from `react-router-dom`**:
  - Ensure `App.js` uses `Navigate` instead of `Redirect` (fixed in the provided code).
- **Build Error: ESLint `no-undef` for `doc` or `db`**:
  - Verify Firebase imports in affected files (e.g., `UserManagement.js`, `Profile.js`).
  - Check `.eslintrc.json` for Firebase globals.
- **Build Error: Missing `serviceWorkerRegistration.js`**:
  - Ensure `frontend/src/serviceWorkerRegistration.js` exists and is correctly imported in `index.js`.
- **Peer Dependency Warnings**:
  - Confirm `typescript@4.9.5` and `@babel/core@7.27.1` in `package.json`.
- **PWA Not Installing**:
  - Verify `manifest.json`, `service-worker.js`, and icon files in `frontend/public/`.
  - Check browser console for service worker errors.
- **Firebase Errors**:
  - Ensure `firebaseConfig.js` has correct credentials.
  - Verify Firebase services (Authentication, Firestore, Storage) are enabled.

For additional issues, open a GitHub issue or contact the maintainer.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
- **Maintainer**: Jjingo Farouk
- **GitHub**: [jjingofarouk](https://github.com/jjingofarouk)
- **Email**: jjingofarouk@example.com
- **Project Link**: [https://BloodMatch-a3b6c.web.app/](https://BloodMatch-a3b6c.web.app/)

Thank you for exploring BloodMatch! Your feedback and contributions are greatly appreciated.


---

### Integration Instructions
1. **Add README to Repository**:
   - Save the provided `README.md` content to the root of your `BloodMatch` repository (`BloodMatch/README.md`).
   - Update placeholders:
     - Replace `jjingofarouk@example.com` with your actual email.
     - Update the `BloodMatch Logo` image path if you have a different logo file.
     - Ensure `CODE_OF_CONDUCT.md` and `LICENSE` files exist or remove references if not applicable.

2. **Commit and Push**:
   ```bash
   git add README.md
   git commit -m "Add comprehensive README for BloodMatch"
   git push origin main
   ```

3. **Verify on GitHub**:
   - Visit [https://github.com/jjingofarouk/BloodMatch](https://github.com/jjingofarouk/BloodMatch) to ensure the README renders correctly with proper formatting and links.

4. **Update Portfolio**:
   - The BloodMatch project object for `projects.tsx` was provided previously (artifact ID `89efa24b-1bbd-4db7-b37a-32d2b0f36f89`). Ensure it’s integrated into your portfolio.
   - Add screenshots to `portfolio/assets/projects-screenshots/BloodMatch/` for `home.png`, `donor_dashboard.png`, etc., to match the README’s feature descriptions.

---

