const service = require("./movies.service");

const movieExists = async (req, res, next) => {
    const { movieId } = req.params;
    const movie = await service.read(movieId);
    if (movie) {
        res.locals.movie = movie;
        return next()
    }
    next({
        status: 404,
        message: `Movie with id ${movieId} not found!`
    })
}

const readTheaters = (req, res, next) => {
    const { movie } = res.locals
    service 
        .readTheaters(movie.movie_id)
        .then((data) => res.json({ data }))
        .catch(next)

}
const readReviews = (req, res, next) => {
    const { movie } = res.locals
    service 
        .readReviews(movie.movie_id)
        .then((data) => res.json({ data }))
        .catch(next)
}

const list = (req, res, next) => {
    const isShowing = req.query.is_showing;
    service
        .list(isShowing)
        .then((data) => res.json({ data }))
        .catch(next);
}

const read = (req, res, next) => {
    const { movie: data } = res.locals
    res.json({ data })
}

module.exports = {
    list,
    read: [movieExists, read],
    readTheaters: [movieExists, readTheaters],
    readReviews: [movieExists, readReviews],
}