const notFound = (req, res, next) => {
    return next({
        status: 404,
        message: `${req.originalUrl} is not a valid route!`
    })
}

module.exports = notFound