# AppFlowy Polaris - Teacher Dashboard

A modern, comprehensive teacher dashboard built with Next.js, featuring Google OAuth authentication, interactive reports, and a beautiful UI designed for educational professionals.

![AppFlowy Polaris Dashboard](https://img.shields.io/badge/Next.js-14.2.7-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🚀 Features

### 🔐 Authentication System
- **Google OAuth Integration**: Seamless sign-in with Google accounts
- **Account Management**: Automatic account creation and linking
- **Session Management**: Secure session handling with NextAuth.js
- **Demo Mode**: Quick access with hardcoded credentials for testing

### 📊 Teacher Dashboard
- **Home Base View**: Comprehensive overview with metrics, schedule, and activities
- **Reports Dashboard**: Advanced reporting with templates and analytics
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark Mode Support**: Full dark/light theme compatibility

### 📈 Reports & Analytics
- **Report Templates**: 6 pre-built templates for common educational reports
- **Interactive Reports**: Generate, preview, and share reports
- **Filtering System**: Filter reports by type and time range
- **Export Options**: Download reports in various formats

### 🎨 Modern UI/UX
- **AppFlowy Theme**: Consistent design system with custom styling
- **Interactive Components**: Hover effects, animations, and smooth transitions
- **Accessibility**: WCAG compliant with keyboard navigation
- **Performance**: Optimized for fast loading and smooth interactions

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2.7 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + SCSS
- **Authentication**: NextAuth.js
- **Database**: Prisma + SQLite
- **UI Components**: Radix UI + Custom Components
- **State Management**: React Hooks
- **Deployment**: Vercel Ready

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/MaherHarp/appflowy-practice.git
   cd appflowy-practice
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your configuration:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Demo Access

### Quick Demo (No Setup Required)
- **Dashboard**: `http://localhost:3000/dashboard`
- **Login**: `http://localhost:3000/login`

### Demo Credentials
- **Email**: `teacher@demo.com`
- **Password**: `password123`

## 📱 Pages & Features

### 🏠 Home Base Dashboard
- **Student Metrics**: Total students, assignments, grades overview
- **Daily Schedule**: Class schedule with topics and times
- **Recent Activity**: Student and teacher activity feed
- **AI Teaching Assistant**: Interactive prompts and suggestions
- **Quick Actions**: Common teacher tasks and shortcuts
- **Class Overview**: Visual class cards with student counts
- **Student Progress**: Performance graphs and analytics
- **Upcoming Deadlines**: Assignment due dates and reminders

### 📊 Reports Dashboard
- **Summary Statistics**: Total reports, scheduled, monthly, shared
- **Report Templates**: 6 pre-built templates with generate/preview
- **Recent Reports**: Filterable list with download/share actions
- **Advanced Filtering**: Filter by type and time range
- **Export Options**: Multiple format support

### 🔧 Navigation
- **Sidebar Navigation**: Persistent navigation with active states
- **User Profile**: Teacher profile with role and avatar
- **Responsive Design**: Mobile-friendly navigation

## 🎨 Customization

### Theme Customization
The project uses CSS variables for easy theming:

```scss
:root {
  --color-primary: #8427E0;
  --color-primary-dark: #6B21A8;
  --color-bg: #ffffff;
  --color-bg-secondary: #f8fafc;
  --color-text-primary: #1e293b;
  --color-text-secondary: #64748b;
  --color-border: #e2e8f0;
}
```

### Adding New Pages
1. Create a new page in `app/`
2. Add navigation item in `app/dashboard/page.tsx`
3. Create corresponding view component
4. Add styles to `styles/dashboard.scss`

## 🔐 Authentication Setup

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env`

### Database Schema
The project includes a complete Prisma schema with:
- User accounts and profiles
- OAuth session management
- Report data structure
- Activity tracking

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The project is compatible with:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📚 Documentation

- [Google OAuth Setup](GOOGLE_OAUTH_README.md)
- [Teacher Dashboard Guide](TEACHER_DASHBOARD_README.md)
- [Login Page Implementation](LOGIN_PAGE_README.md)
- [Demo Instructions](DEMO_INSTRUCTIONS.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **AppFlowy Team**: For the original design inspiration and theme
- **Next.js Team**: For the amazing React framework
- **Vercel**: For the deployment platform
- **Open Source Community**: For the incredible tools and libraries

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/MaherHarp/appflowy-practice/issues)
- **Discussions**: [GitHub Discussions](https://github.com/MaherHarp/appflowy-practice/discussions)
- **Email**: [Your Email]

---

**Built with ❤️ for educators everywhere**

[![GitHub stars](https://img.shields.io/github/stars/MaherHarp/appflowy-practice?style=social)](https://github.com/MaherHarp/appflowy-practice)
[![GitHub forks](https://img.shields.io/github/forks/MaherHarp/appflowy-practice?style=social)](https://github.com/MaherHarp/appflowy-practice)
[![GitHub issues](https://img.shields.io/github/issues/MaherHarp/appflowy-practice)](https://github.com/MaherHarp/appflowy-practice/issues)
