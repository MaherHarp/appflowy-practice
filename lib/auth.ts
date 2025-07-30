import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

export async function getCurrentUser() {
  const session = await getServerSession();
  
  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      profile: true,
      accounts: true,
    },
  });

  return user;
}

export async function createUserProfile(userId: string, userData: any) {
  return await prisma.userProfile.create({
    data: {
      userId,
      displayName: userData.name || userData.displayName,
      avatar: userData.image || userData.avatar,
    },
  });
}

export async function linkGoogleAccount(userId: string, accountData: any) {
  const existingAccount = await prisma.account.findFirst({
    where: {
      userId,
      provider: 'google',
    },
  });

  if (!existingAccount) {
    return await prisma.account.create({
      data: {
        userId,
        type: accountData.type,
        provider: accountData.provider,
        providerAccountId: accountData.providerAccountId,
        refresh_token: accountData.refresh_token,
        access_token: accountData.access_token,
        expires_at: accountData.expires_at,
        token_type: accountData.token_type,
        scope: accountData.scope,
        id_token: accountData.id_token,
        session_state: accountData.session_state,
      },
    });
  }

  return existingAccount;
}

export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
    include: {
      profile: true,
      accounts: true,
    },
  });
}

export async function updateUserProfile(userId: string, data: any) {
  return await prisma.userProfile.upsert({
    where: { userId },
    update: data,
    create: {
      userId,
      ...data,
    },
  });
} 