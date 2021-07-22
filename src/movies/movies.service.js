const knex = require("../db/connection");

const addCritic = (list) => {
  const reviews = {};
  for (item of list) {
          reviews[item.review_id] = {
            review_id: item.review_id,
            content: item.content,
            score: item.score,
            movie_id: item.movie_id,
            critic: {
              critic_id: item.critic_id,
              preferred_name: item.preferred_name,
              surname: item.surname,
              organization_name: item.organization_name,
            }
          }
      }
  return Object.values(reviews)
}

const list = (query) => {
  if (query === "true") {
    return knex("movies as m")
      .distinct()
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .select("m.*")
      .where({ "mt.is_showing": true })
  }
  return knex("movies").select("*");
}

const read = (movieId) => {
  return knex("movies as m")
    .select("*")
    .where({ "movie_id": movieId })
    .first()
}

const readTheaters = (movieId) => {
  return knex("movies as m")
    .select("*")
    .where({ "m.movie_id": movieId })
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*")
}

const readReviews = (movieId) => {
  return knex("reviews as r")
    .select("*")
    .where({ "r.movie_id": movieId })
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("*")
    .then(addCritic)

}

module.exports = {
  list,
  read,
  readTheaters,
  readReviews,
};