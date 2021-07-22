const knex = require("../db/connection");

const read = (reviewId) => {
    return knex("reviews")
        .select("*")
        .where({ "review_id": reviewId })
        .first()
}

const readCritic = (reviewId) => {
    return knex("reviews as r")
        .where({ "review_id": reviewId })
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("c.preferred_name", "c.surname", "c.organization_name")
        .first()
}

const update = (updatedReview) => {
    return knex("reviews")
    .update(updatedReview, "*")
    .where({ review_id: updatedReview.review_id })
}

const destroy = (review_id) => {
    return knex("reviews")
        .where({ review_id })
        .del();
}

module.exports = {
    read,
    readCritic,
    update,
    delete: destroy,
}