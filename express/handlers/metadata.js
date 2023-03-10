const getAppTitle = function (req, res, next) {
    res.json(process.env.APP_TITLE);
}

module.exports = {
    getAppTitle
}