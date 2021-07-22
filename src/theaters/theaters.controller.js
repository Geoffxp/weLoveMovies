const service = require("./theaters.service");

const list = async (req, res, next) => {
    service
        .list()
        .then((data) => res.json({ data }))
        .catch(next)
}

module.exports = {
    list,
}