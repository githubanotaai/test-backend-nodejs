const errHandler = (fnct) =>
    (req, res, next) => {
        Promise.resolve(fnct(req, res, next))
            .catch(next);
    };

module.exports = errHandler;