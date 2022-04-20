import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import db from "./database/db";
import http from "http";
import { init } from "./graphql/index";
import passport from "./auth/passport";
import { checkAuth } from "./auth/functions";

(async () => {
  try {
    const gqlSchema = await init();

    const server = new ApolloServer({
      schema: gqlSchema,
      context: async ({ req, res }) => {
        const user = await checkAuth(req, res);
        return {
          req,
          res,
          user,
        };
      },
    });

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(passport.initialize());

    await server.start();
    server.applyMiddleware({ app });

    db.on("connected", () => {
      http
        .createServer({}, app)
        .listen({ port: process.env.PORT || 80 }, () =>
          console.log(`🚀 Server ready`)
        );
    });
  } catch (e: any) {
    console.log("server error: " + e.message);
  }
})();
