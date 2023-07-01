const { content } = require('../utils');
const jwtAuth = require('../middleware/jwtAuth');


module.exports.pageWise = async (req, res, next) => {
    const page = Number(req.query.page);

    if (page >= content.length) {
        return res.status(404).json({
            message: 'Invalid request, data not found',
        })
    }

    const title = content[page]["name"];

    if (title === 'Quiz') {
        const response = await jwtAuth.validate(req, res, next);

        if (response)
            return;
    }

    return res.status(200).json({
        message: 'Found data',
        success: true,
        data: {
            ...content[page]
        }
    });
}