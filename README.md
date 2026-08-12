# 🌌 A Living Computational Space — Personal Portfolio

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Web3Forms](https://img.shields.io/badge/Web3Forms-API-FF4F00?style=for-the-badge&logo=mail.ru&logoColor=white)](https://web3forms.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> A modern, high-performance developer portfolio built around the concept of a **"Living Computational Space"**. Designed with dark mode optics, terminal telemetry badges, interactive orbital components, and direct email dispatching.

---

## ✨ Key Features

* ⚡ **Terminal-Inspired Aesthetics**: Dark base UI (`#050816`) accented with cyan & violet ambient glow effects, monospaced telemetry headers, and interactive status widgets.
* 📐 **Asymmetric Layout Hierarchy**: Left-aligned structured section headings with vibrant gradient accents across Experience, Projects, Education, and Certifications.
* 📨 **Serverless Contact Transmission**: Direct inbox dispatching powered by **Web3Forms** with real-time feedback states (transmitting, success, error).
* 📄 **Embedded PDF Resume Viewer**: Instant access to download or preview the resume directly from the header/hero CTA.
* 📱 **Fully Responsive**: Mobile-first grid layouts optimized across all viewport resolutions.
* 🚀 **Zero Backend Overhead**: Blazing-fast static build utilizing Vite, TypeScript, and React.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Core** | React 18, TypeScript |
| **Build Tool & Bundler** | Vite |
| **Styling Engine** | Tailwind CSS |
| **Icons & Micro-UI** | Lucide React |
| **Form Dispatching** | Web3Forms API |
| **Deployment Target** | Vercel |

---

## 📂 Project Structure

```text
Komala-Portfolio/
├── public/
│   └── resume.pdf            # PDF Resume available for view/download
├── src/
│   ├── assets/               # Visual assets & static media
│   ├── components/           # UI Components
│   │   ├── hero/             # Landing / Hero section
│   │   ├── about/            # Developer bio & background
│   │   ├── skills/           # Technical stack & core capabilities
│   │   ├── experience/       # Career logs & industry telemetry
│   │   ├── projects/         # Featured deployments & portfolio builds
│   │   ├── education/        # Academic timeline & metrics
│   │   ├── certifications/   # Encrypted credential vault
│   │   ├── contact/          # Direct messaging endpoint
│   │   └── footer/           # System status & terminal navigation
│   ├── App.tsx               # Root component structure
│   └── main.tsx              # React DOM entry point
├── .env                      # Environment configuration (ignored by git)
├── index.html
├── package.json
└── tailwind.config.js