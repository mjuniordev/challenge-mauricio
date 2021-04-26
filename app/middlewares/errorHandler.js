module.exports = (error, req, res, next) => {

    const { statusCode, message, data, validation } = error
  
    res.status(statusCode).json({
      message,
      data,
      validation
    })
  
  }