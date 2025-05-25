# 🔐 BetterAuth - Full-Stack Auth System with Social & Custom Login

A complete authentication system built with **Next.js (App Router)**, **TypeScript**, and **BetterAuth**, supporting both social logins and custom email/password flows. It uses **Neon** for the database, **Prisma** as ORM, and **Nodemailer** for email features.

## ✨ Features

- ✅ Social login with:
  - Google
  - GitHub
  - Kakao (via REST API)
  - Naver (via REST API)
- 📧 Custom email/password registration and login
- 🔁 Password reset via email
- 💌 Email delivery with Nodemailer
- 🧩 Built with modular, clean, and extensible components using **ShadCN UI**

## 🧱 Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Auth System**: BetterAuth
- **Database**: Neon (PostgreSQL)
- **ORM**: Prisma
- **Mailing**: Nodemailer
- **UI**: Tailwind CSS + ShadCN
- **OAuth Providers**: Google, GitHub, Kakao, Naver

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ttkgns/better-auth-kakao-naver.git
cd better-auth-kakao-naver
```

### 2. Install dependencies
```bash
npm install

```

### 3. Create a .env file in the root directory with the following structure:
```bash
# BetterAuth
BETTER_AUTH_SECRET=your_betterauth_secret
BETTER_AUTH_URL=http://localhost:3000

# PostgreSQL database (Neon)
DATABASE_URL='postgresql://your_neon_connection_string'

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Kakao (REST API)
KAKAO_CLIENT_ID=your_kakao_client_id
KAKAO_CLIENT_SECRET=your_kakao_client_secret

# Naver (REST API)
NAVER_CLIENT_ID=your_naver_client_id
NAVER_CLIENT_SECRET=your_naver_client_secret

# Email configuration
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

### 4. Set up the database
```bash
npx prisma generate
npx prisma db push

```

### 5. Run the development server
```bash
npm run dev

```



## License

The MIT License (MIT)




