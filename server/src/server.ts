import { ApolloServer } from "apollo-server-express";
import express from "express";
import db from "./utils/db";
import https from "https";

(async () => {
  try {
    const server = new ApolloServer({
      context: async ({ req, res }) => {
        if (req) {
          return {
            req,
            res,
          };
        }
      },
    });

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    await server.start();

    server.applyMiddleware({ app });

    db.on("connected", () => {
      https
        .createServer({}, app)
        .listen({ port: process.env.PORT || 443 }, () =>
          console.log(`🚀 Server ready`)
        );
    });
  } catch (e: any) {
    console.log("server error: " + e.message);
  }
})();
