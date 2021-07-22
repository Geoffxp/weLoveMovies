const knex = require("../db/connection");

const groupTheaters = (list) => {
    const theaters = {};
    for (item of list) {
        if (theaters[item.theater_id]) {
            theaters[item.theater_id].movies.push({
                movie_id: item.movie_id,
                title: item.title,
                runtime_in_minutes: item.runtime_in_minutes,
                rating: item.rating,
                description: item.description,
                image_url: item.image_url,
            })
        } else {
            theaters[item.theater_id] = {
                theater_id: item.theater_id,
                name: item.name,
                address_line_1: item.address_line_1,
                address_line_2: item.address_line_2,
                city: item.city,
                state: item.state,
                zip: item.zip,
                movies: [{
                    movie_id: item.movie_id,
                    title: item.title,
                    runtime_in_minutes: item.runtime_in_minutes,
                    rating: item.rating,
                    description: item.description,
                    image_url: item.image_url,
                }]
            }
        }
    }
    return Object.values(theaters)
}

const list = () => {
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .join("movies as m", "m.movie_id", "mt.movie_id")
        .select("t.*", "m.*")
        .then(groupTheaters)

}
module.exports = {
    list,
}