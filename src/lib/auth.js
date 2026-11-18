import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { admin, jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("unitech");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }, 
    },

  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        default: "user",
      },
    },
  },
  plugins: [admin(), jwt()],
});
