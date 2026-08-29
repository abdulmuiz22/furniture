# Sassy Furniture — Modern Handcrafted Furniture

A high-performance luxury furniture showcase web application built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS**, **MongoDB Mongoose**, and **Cloudinary**.

---

## Features

- **Luxury Responsive Showcase**: Beautifully crafted homepage with hero banner, feature bar, categories grid, promotional showcases, best sellers, brand story, and 24/7 consultation contact form.
- **Admin Management Portal (`/admin`)**: Secure catalog management, live product creation, real-time image uploads, database reset/seed, and client inquiry tracking.
- **Direct WhatsApp & Phone Concierge**: Instant one-click inquiry routing to WhatsApp (`08130575312`) and showroom concierge.
- **Cloudinary Image Pipeline**: Direct asset hosting with automatic format (`auto:best`) and webp/avif optimizations.
- **Resilient MongoDB Serverless Architecture**: Connection pooling optimized for Vercel Serverless Functions with automatic in-memory fallback for ultra-fast response times.
- **Comprehensive SEO & PWA Support**: Automated `sitemap.xml`, `robots.txt`, Web App Manifest, OpenGraph, and Twitter cards.

---

## Quick Start (Local Development)

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Copy the environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Start the Turbopack development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deploying to Vercel (Step-by-Step)

### Option 1: Vercel Dashboard (Recommended)

1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository.
3. In the **Environment Variables** section, configure the following:

| Variable | Description | Example / Recommended Value |
| :--- | :--- | :--- |
| `MONGODB_URI` | MongoDB Atlas Connection String | `mongodb+srv://user:pass@cluster.mongodb.net/furniture_sassy?retryWrites=true&w=majority` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Cloud Name | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | Cloudinary API Key | `your_api_key` |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret | `your_api_secret` |
| `ADMIN_PASSWORD` | Passcode for `/admin` portal | `your_secure_password` |
| `NEXT_PUBLIC_APP_URL` | Production URL | `https://your-domain.vercel.app` |

4. Click **Deploy**. Vercel will automatically build and deploy your application.

> [!IMPORTANT]
> **MongoDB Atlas Network Access**: In your MongoDB Atlas dashboard under **Network Access**, ensure that IP `0.0.0.0/0` (Allow Access from Anywhere) is enabled so Vercel Serverless Functions can connect from dynamic IP addresses.

### Option 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy preview
vercel

# Deploy to production
vercel --prod
```

---

## Production Optimizations Included

- **Vercel Edge Image Optimization**: Enabled AVIF & WebP image formats with device sizes.
- **Dynamic Imports (`next/dynamic`)**: Interactive modals (`ProductDetailModal`, `SearchModal`) are code-split to keep initial bundle size minimal for peak Core Web Vitals (LCP/INP).
- **HTTP Security Headers**: Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy configured via `next.config.ts`.
- **Payload Safety**: 4.5MB Serverless function upload limits handled gracefully in `app/api/upload`.
- **Zero ESLint Warnings**: Compliant with React 19 and Next.js 16 compiler standards.
