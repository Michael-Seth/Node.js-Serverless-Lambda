import { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const clientBadRequestError = async (err: any, _: Request, res: Response, __: NextFunction) => {
    if (err) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            success: false,
            message: err.message,
            status: err.status || StatusCodes.INTERNAL_SERVER_ERROR
        })
    } else {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            success: false,
            message: "⚠️ Oops! It looks like something went wrong on your end. Please double-check your client-side code and try again! 💻🔍",
            status: StatusCodes.UNPROCESSABLE_ENTITY
        })
    }
}

export const clientPathNotFoundError: RequestHandler = async (req, res) => {
    return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "🔍 This path only exist by faith",
        status: StatusCodes.NOT_FOUND
    })
}