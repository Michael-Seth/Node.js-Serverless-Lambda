"use strict"
import { APIGatewayProxyEvent, APIGatewayProxyHandler, Context, Handler } from "aws-lambda"
import awsServerlessExpress from "aws-serverless-express"
import app from "../app"
import { getLambdaEventSource } from "./lambda.event.source"

const server = awsServerlessExpress.createServer(app)
const expressApp: APIGatewayProxyHandler = (event: APIGatewayProxyEvent, context: Context) => {
  awsServerlessExpress.proxy(server, event, context)
}

const functionUrl: Handler = (event: APIGatewayProxyEvent, context: Context) => {
  console.log(getLambdaEventSource(event), "EVENT_SOURCE_F_URL")

  awsServerlessExpress.proxy(server, event, context)
}

const router = (source: ReturnType<typeof getLambdaEventSource>, event: any, context: any, callback: any) => {
  console.info("Event-Source:", source)

  switch (source) {
    case "isApiGateway":
      return expressApp(event, context, callback)
    case "isFuntionUrl":
      return functionUrl(event, context, callback)
    default:
      console.error("Unsupported event source", event)
  }
}

const handler: Handler = (event: APIGatewayProxyEvent | any, context: Context, callback: any) => {
  const source = getLambdaEventSource(event)

  try {
    return router(source, event, context, callback)
  } finally {
  }
}

export = {
  handler,
}