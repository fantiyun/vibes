const ResponseStatus = {
  SUCCESS: 'success',
  ERROR: 'error',
}

const ResponseCode = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
}

// 公有响应格式函数
const sendResponse = (res, status, code, data, message) => {
  res.status(code).json({
    status: status,
    code: code,
    data: data || null,
    message: message || '',
  })
}

// 成功响应
exports.success = (res, data, message) => {
  sendResponse(res, ResponseStatus.SUCCESS, ResponseCode.OK, data, message)
}

// 错误响应
exports.error = (res, code, message) => {
  let status = ResponseStatus.ERROR
  let httpCode = ResponseCode.INTERNAL_SERVER_ERROR

  switch (code) {
    case ResponseCode.BAD_REQUEST:
      status = ResponseStatus.ERROR
      httpCode = ResponseCode.BAD_REQUEST
      break
    case ResponseCode.UNAUTHORIZED:
      status = ResponseStatus.ERROR
      httpCode = ResponseCode.UNAUTHORIZED
      break
    case ResponseCode.FORBIDDEN:
      status = ResponseStatus.ERROR
      httpCode = ResponseCode.FORBIDDEN
      break
    case ResponseCode.NOT_FOUND:
      status = ResponseStatus.ERROR
      httpCode = ResponseCode.NOT_FOUND
      break
    default:
      status = ResponseStatus.ERROR
      httpCode = ResponseCode.INTERNAL_SERVER_ERROR
      break
  }

  sendResponse(res, status, httpCode, null, message)
}
