# Google OAuth Integration for AppFlowy

## Overview
This implementation adds Google OAuth 2.0 authentication to the AppFlowy login system, allowing users to sign in or sign up using their Google accounts. The system includes automatic account creation, account linking, and seamless integration with the existing user management structure.

## Features Implemented

### ✅ **Google OAuth 2.0 Authentication**
- Complete Google OAuth flow implementation
- Secure token handling and session management
- Automatic user account creation for new Google users
- Account linking for existing users with the same email

### ✅ **Account Management**
- **New Account Creation**: Automatically creates user accounts when new Google users sign in
- **Account Linking**: Links Google accounts to existing user profiles to prevent duplicates
- **User Profile Management**: Extended user profiles with Google profile information
- **Session Management**: Secure JWT-based session handling

### ✅ **Database Integration**
- **Prisma ORM**: Type-safe database operations
- **SQLite Database**: Local development database (can be easily changed to PostgreSQL/MySQL)
- **User Tables**: Complete user, account, session, and profile management
- **Automatic Migrations**: Database schema management

### ✅ **Security Features**
- **Environment Variables**: Secure configuration management
- **Token Encryption**: Secure storage of OAuth tokens
- **Session Security**: JWT-based secure sessions
- **CSRF Protection**: Built-in NextAuth.js security features

## File Structure

```
├── app/
│   ├── api/auth/[...nextauth]/
│   │   └── route.ts              # NextAuth API configuration
│   ├── login/
│   │   └── page.tsx              # Updated login page with Google OAuth
│   └── dashboard/
│       └── page.tsx              # User dashboard after authentication
├── components/
│   ├── providers/
│   │   └── session-provider.tsx  # NextAuth session provider
│   └── ui/                       # Existing UI components
├── hooks/
│   └── use-auth.ts              # Custom authentication hook
├── lib/
│   └── auth.ts                  # Authentication utility functions
├── prisma/
│   └── schema.prisma            # Database schema
├── types/
│   └── next-auth.d.ts           # TypeScript declarations
└── env.example                  # Environment variables template
```

## Database Schema

### Core Tables
- **User**: Main user information (id, name, email, image)
- **Account**: OAuth provider accounts (Google, etc.)
- **Session**: User sessions for authentication
- **UserProfile**: Extended user profile information
- **VerificationToken**: Email verification tokens

### Key Features
- **One-to-Many Relationship**: Users can have multiple OAuth accounts
- **Profile Extension**: Separate profile table for additional user data
- **Session Management**: Secure session storage and management

## Setup Instructions

### 1. Environment Configuration
Create a `.env` file based on `env.example`:

```bash
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id-here"
GOOGLE_CLIENT_SECRET="your-google-client-secret-here"

# App Configuration
NEXT_PUBLIC_SITE_BASE_URL="http://localhost:3000"
ENVIRONMENT="development"
```

### 2. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Copy Client ID and Client Secret to your `.env` file

### 3. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Create database and apply schema
npx prisma db push

# (Optional) View database in Prisma Studio
npx prisma studio
```

### 4. Start Development Server
```bash
npm run dev
```

## Authentication Flow

### 1. **New User Sign-In**
1. User clicks "Continue with Google"
2. Redirected to Google OAuth consent screen
3. User authorizes the application
4. Google returns authorization code
5. NextAuth exchanges code for access token
6. User profile is fetched from Google
7. New user account is created in database
8. User is redirected to dashboard

### 2. **Existing User Sign-In**
1. User clicks "Continue with Google"
2. Google OAuth flow completes
3. System checks for existing user by email
4. If found, Google account is linked to existing user
5. User is redirected to dashboard

### 3. **Account Linking Logic**
- **Email Match**: If Google email matches existing user email
- **Automatic Linking**: Google account is automatically linked
- **No Duplicates**: Prevents creation of duplicate accounts
- **Profile Update**: Updates user profile with Google information

## API Endpoints

### Authentication Routes
- `GET/POST /api/auth/signin` - Sign in page
- `GET/POST /api/auth/signout` - Sign out
- `GET /api/auth/session` - Get current session
- `GET /api/auth/csrf` - CSRF token
- `GET/POST /api/auth/callback/google` - Google OAuth callback

### Custom Routes
- `GET /login` - Login page
- `GET /dashboard` - User dashboard (protected)

## Usage Examples

### Using the Authentication Hook
```typescript
import { useAuth } from '@/hooks/use-auth';

function MyComponent() {
  const { session, isAuthenticated, signInWithGoogle, signOut } = useAuth();

  if (isAuthenticated) {
    return (
      <div>
        <p>Welcome, {session?.user?.name}!</p>
        <button onClick={signOut}>Sign Out</button>
      </div>
    );
  }

  return (
    <button onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  );
}
```

### Server-Side Authentication
```typescript
import { getCurrentUser } from '@/lib/auth';

export default async function ServerComponent() {
  const user = await getCurrentUser();
  
  if (!user) {
    return <div>Please sign in</div>;
  }

  return <div>Welcome, {user.name}!</div>;
}
```

## Security Considerations

### ✅ **Implemented Security Measures**
- **Environment Variables**: Sensitive data stored in environment variables
- **HTTPS Only**: OAuth redirects use HTTPS in production
- **Token Encryption**: OAuth tokens are encrypted in database
- **Session Security**: JWT-based secure sessions
- **CSRF Protection**: Built-in NextAuth.js CSRF protection

### 🔒 **Best Practices**
- **Secret Management**: Use strong, unique secrets for NEXTAUTH_SECRET
- **Domain Verification**: Verify authorized domains in Google Console
- **Token Rotation**: Implement token refresh mechanisms
- **Rate Limiting**: Add rate limiting for authentication endpoints
- **Audit Logging**: Log authentication events for security monitoring

## Production Deployment

### 1. **Environment Variables**
Update `.env` for production:
```bash
DATABASE_URL="your-production-database-url"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://yourdomain.com"
GOOGLE_CLIENT_ID="your-production-google-client-id"
GOOGLE_CLIENT_SECRET="your-production-google-client-secret"
```

### 2. **Database Migration**
```bash
# For production database
npx prisma migrate deploy
```

### 3. **Google OAuth Configuration**
- Update authorized redirect URIs in Google Console
- Add production domain to authorized origins
- Verify domain ownership

### 4. **Security Headers**
Ensure proper security headers are configured in your hosting platform.

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI"**
   - Check Google OAuth configuration
   - Verify redirect URIs match exactly

2. **"Database connection failed"**
   - Check DATABASE_URL in .env
   - Ensure database is accessible

3. **"NextAuth secret not set"**
   - Add NEXTAUTH_SECRET to .env
   - Generate a strong secret

4. **"Session not persisting"**
   - Check NEXTAUTH_URL configuration
   - Verify session strategy settings

### Debug Mode
Enable NextAuth debug mode in development:
```typescript
// In [...nextauth]/route.ts
debug: process.env.NODE_ENV === 'development',
```

## Future Enhancements

### Potential Improvements
- **Multi-Provider Support**: Add GitHub, Discord, etc.
- **Email/Password Auth**: Implement traditional authentication
- **Two-Factor Authentication**: Add 2FA support
- **Role-Based Access**: Implement user roles and permissions
- **Profile Management**: Add user profile editing
- **Account Deletion**: Add account deletion functionality
- **Audit Logging**: Comprehensive authentication event logging

## Support

For issues or questions:
1. Check the [NextAuth.js documentation](https://next-auth.js.org/)
2. Review Google OAuth setup in [Google Cloud Console](https://console.cloud.google.com/)
3. Check Prisma documentation for database issues
4. Review environment variable configuration

---

**Note**: This implementation provides a solid foundation for Google OAuth authentication. The system is designed to be easily extensible for additional OAuth providers and enhanced security features. 