import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import db from "./database/db";
import http from "http";
import { init } from "./graphql/index";

(async () => {
  try {
    const gqlSchema = await init();

    const server = new ApolloServer({
      schema: gqlSchema,
    });

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

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
