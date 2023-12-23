import type { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

interface ExtendedError extends Error {
  status?: number
}

const errorHandler: ErrorRequestHandler = (err: ExtendedError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status ?? 500
  console.error(statusCode, err.stack)

  if (res.headersSent) {
    return
  }

  res.status(statusCode).json({ error: err.message ?? 'Internal server error' })
}

export default errorHandler
