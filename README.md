Campus LostLoop — Kenshi
A modern campus lost-and-found platform designed to help students report, discover, match, and recover lost items faster.

Project Stage: Kenshi — Frontend Prototype

Project Type: College Hackathon Project

🚀 Live Demo
Vercel Demo: https://campus-lostloop-kenshi.vercel.app/

📌 Project Overview

Campus LostLoop is a campus-focused digital lost-and-found platform designed to make it easier for students to report lost belongings, report found items, discover potential matches, and track their recovery activity.
Instead of relying on scattered WhatsApp groups, notice boards, social media posts, or informal communication, Campus LostLoop provides a centralized campus experience for managing lost and found items.
The Kenshi version focuses on building and validating the complete frontend experience with a polished, responsive, and interactive interface.


🎯 Problem Statement

Students frequently lose personal belongings such as:
- ID cards
- Wallets
- Keys
- Earphones
- Bags
- Books
- Electronic devices
- Water bottles
- Other personal items
Finding these belongings can be difficult because information about lost and found items is often scattered across different communication channels.
Campus LostLoop aims to provide a single campus hub where students can easily report items and discover potential matches.


💡 Our Solution

Campus LostLoop provides a simple workflow:
Report → Discover → Match → Claim → Return
Students can report something they lost or found, provide important details such as location and time, and explore potential matches.
The platform also demonstrates a simulated intelligent matching experience that considers information such as:
- Item category
- Description
- Location
- Time
- Color
- Visual similarity
The matching experience in this version is a frontend demonstration using simulated data. A real matching/AI system is planned for the future full-stack version.


✨ Key Features


🏠 Campus Dashboard

The dashboard acts as the central campus hub.
It includes:
- Personalized greeting
- "I LOST IT" action
- "I FOUND IT" action
- Recent campus activity
- Search experience
- Quick navigation
- Activity indicators


📦 Report Lost Item

Students can create a lost-item report containing information such as:
- Item name
- Category
- Description
- Location
- Date
- Time
- Contact information
- Image/upload interface
The interface is designed as a clear reporting workflow rather than a basic form.


🔎 Report Found Item

Students can report an item they have found on campus.
The experience includes:
- Item information
- Description
- Location
- Date and time
- Image upload interface
- Potential match analysis


🤖 Potential Match Analysis

The prototype demonstrates a matching experience where a found item can be analyzed against potential lost-item reports.
The interface presents:
- Match confidence
- Matching signals
- Category similarity
- Location similarity
- Time similarity
- Visual similarity concept
Example:
94% Potential Match
This matching result is simulated for the frontend prototype and does not represent a real AI/ML prediction.


📋 My Activity

Users can view their activity related to:
- Lost reports
- Found reports
- Potential matches
- Item recovery
- Recent activity


🌓 Light & Dark Mode

Campus LostLoop supports both:
- Light mode
- Dark mode
The selected theme is stored locally so the preference can persist between sessions.


📱 Responsive Design

The interface is designed for both mobile and desktop experiences.
The prototype targets responsive layouts including:
- Mobile devices around 375px width
- Desktop screens around 1280px width
The goal is to maintain a clear and usable experience across different screen sizes.


✨ Interactive Experience

Framer Motion is used to create meaningful interactions including:
- Page transitions
- Card entrances
- Hover interactions
- Match-analysis animation
- Animated match percentage
- Notification feedback
- Mobile navigation
- Success states
- UI transitions
The animations are designed to improve the experience rather than simply decorate the interface.


🛠️ Technology Stack

Frontend
- React
- Vite
- JavaScript

Styling
- Tailwind CSS
- Custom CSS
- Responsive design

Animation
- Framer Motion

Icons
- Lucide React

Prototype Data
- Local mock data
- React state
- LocalStorage for theme preference


🎨 Design

Campus LostLoop follows a modern campus SaaS/product aesthetic.
The design direction focuses on:
- Clean layouts
- Strong visual hierarchy
- Minimal interface design
- Professional typography
- Responsive components
- Subtle glass effects
- Dark and light themes
- Smooth animations
- Clear calls to action


Typography

Sora is used for major headings.
Manrope is used for body text and interface elements.


🧭 User Journey

The intended user journey is:
Login / Register
↓
Campus Dashboard
↓
Report Lost / Report Found
↓
Enter Item Details
↓
Potential Match Analysis
↓
View Match
↓
Claim / Contact
↓
Item Returned


🏗️ Project Architecture

The Kenshi version is intentionally kept lightweight as a frontend prototype.
The current implementation focuses on the main application experience and uses local state and mock data instead of a production backend.

Campus-LostLoop-Kenshi
│
├── public
│
├── src
│   ├── App.jsx
│   ├── index.css
│   ├── App.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md

🧪 Prototype Scope

This repository represents the Kenshi frontend stage of Campus LostLoop.
The following features are currently demonstrated through frontend interactions and local/mock data:
- User interface
- Navigation
- Lost-item reporting
- Found-item reporting
- Match-analysis experience
- Activity tracking
- Notifications
- Responsive design
- Light/dark mode
- Animations and interactions
The prototype does not yet provide production backend functionality.


🔮 Future Development

The next stages of Campus LostLoop are planned to introduce full-stack functionality.
Future development includes:

- Firebase authentication
- PostgreSQL database
- Real lost/found reports
- Real image uploads
- Cloudinary image storage
- Real matching algorithms
- AI-assisted item matching
- Claim submission and verification
- Secure communication
- Real-time notifications
- Item status management
- Production deployment
- Campus administration features
The intended item lifecycle is:
LOST → MATCHED → CLAIMED → RETURNED


⚙️ Installation & Setup

Clone the repository:
git clone https://github.com/Lakxz/Campus-LostLoop-Kenshi.git

Open the project:
cd Campus-LostLoop-Kenshi

Install dependencies:
npm install

Start the development server:
npm run dev

Open the local URL provided by Vite in your browser.


🌐 Deployment

The frontend is designed to be deployed using Vercel.
Live Application:
https://campus-lostloop-kenshi.vercel.app/