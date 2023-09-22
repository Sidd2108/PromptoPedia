import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDb } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {

        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            });
            session.user.id = sessionUser._id.toString();

            return session;
        },
        async signIn({ profile }) {
            try {
                await connectToDb();

                //check if user already exists
                const userExists = User.findOne({
                    email: profile.email
                });

                //if not create new user
                if (!userExists) {
                    const doc = new User({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                    await doc.save();
                }
                return true;

            } catch (error) {
                console.log(error.message);
                return false;
            }
        }
    }

})

export { handler as GET, handler as POST };
// YT video at 1:48