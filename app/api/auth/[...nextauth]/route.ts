import { WhopSDK } from '@whop-sdk/core'
import NextAuth from 'next-auth'
import { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: 'whop',
      name: 'Whop',
      type: 'oauth',
      authorization: 'https://whop.com/oauth',
      token: 'https://api.whop.com/api/v5/oauth/token',
      userinfo: 'https://api.whop.com/api/v5/me',
      clientId: process.env.NEXT_PUBLIC_WHOP_CLIENT_ID,
      clientSecret: process.env.WHOP_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      profile(profile: {
        id: string
        username: string
        email: string
        profile_pic_url: string
      }) {
        return {
          id: profile.id,
          name: profile.username,
          email: profile.email,
          image: profile.profile_pic_url,
        }
      },
    },
  ],
  callbacks: {
    async session({ session, user, token }) {
      session.user.id = token.id as string
      session.accessToken = token.accessToken as string
      return session
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
      }
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }