# Fullstack Twio - Live Streaming Platform

Welcome to the Fullstack Twio repository! This project replicates Twitch's core functionalities using modern web technologies, enabling users to stream live content, interact in real-time, and engage with a vibrant streaming community.

## 🚀 Technologies Used
- **Next.js 14** - Server-side rendering and React-based frontend
- **React** - Dynamic and responsive UI
- **Prisma** - Prisma PostgreSQL
- **Livekit** - Low-latency streaming solutions
- **Tailwind CSS** - Utility-first styling framework
- **WebSockets** - Real-time communication for chat and live status updates

---

## 🌟 Key Features

### 🎥 Live Streaming
- **RTMP / WHIP Protocol Support** - Seamlessly stream using OBS or similar software.
- **Auto-generated Ingress Configurations** - Efficient traffic management for optimized streaming.
- **OBS & Other Streaming Software Integration** - Easy setup with broadcasting tools.

### 🔐 Authentication & User Management
- **Secure Authentication** - OAuth & JWT support.
- **Follower System** - Users can follow their favorite streamers.
- **Blocking & Moderation** - Streamers can block or kick disruptive viewers.

### 📡 Real-time Interactions
- **Live Viewer Count** - Display the number of active viewers.
- **Live Status Indicators** - Easily identify active streams.
- **WebSockets-based Chat** - Real-time messaging during streams.
- **Unique Chat Colors** - Assign different colors for better chat readability.
- **Followers-Only & Slow Chat Mode** - Controlled chat environments for better engagement.

### 🎛️ Creator Tools
- **Streamer Dashboard** - Manage streams, analytics, and audience interaction.
- **Thumbnail Uploads** - Customize stream visuals for better branding.
- **Chat Enable/Disable** - Toggle chat availability during streams.

### 📺 UI & UX Enhancements
- **Collapsible Layout & Theater Mode** - Immersive viewing experience.
- **Sidebar with Following & Recommendations** - Personalized content discovery.
- **Home Page with Live-First Sorting** - Prioritize live content visibility.
- **Search Results with Optimized Layout** - Efficient content searching.

### 🔄 Data Synchronization & Performance
- **Webhooks for User & Live Status Syncing** - Real-time database updates.
- **Server-Side Rendering (SSR)** - Improved SEO & performance.
- **Grouped Routes & Layouts** - Streamlined navigation.
- **High Performance & Scalability** - Blazing fast application load times.

---

## 🛠️ Getting Started

### **Prerequisites**
- Node.js **v18.17** or later

### **Cloning the Repository**
```sh
git clone https://github.com/GAURANG-21/Twio.git
cd twio
```

### **Installation**
```sh
npm install
```

### **Environment Setup**
Create a `.env` file in the root directory and add the following variables:
```sh
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
CLERK_SIGNING_SECRET=

DATABASE_URL=
PULSE_API_KEY=

LIVEKIT_API_URL=
LIVEKIT_API_KEY=
LIVEKIT_SECRET_KEY=
NEXT_PUBLIC_LIVEKIT_WS_URL=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
UPLOADTHING_TOKEN=
```

### **Database Setup (Prisma & PostgreSQL recommended)**
```sh
npx prisma generate
npx prisma db push
```

### **Starting the App**
```sh
npm run dev
```

---

## 📌 Available Commands

| Command           | Description                          |
|------------------|----------------------------------|
| `npm run dev`    | Starts a development instance of the app |

## 🚀 Deployment
Deploy the application to production using cloud platforms, containerization, or CI/CD pipelines for scalability and reliability.

---

## 🎨 Beautiful, Blazing Fast & Feature-Rich!
This project aims to deliver an intuitive and feature-packed Twitch alternative, focusing on **performance**, **user experience**, and **scalability**. Happy coding! 🚀

