const asyncHandler = (requestHandler) => async (req, res, next) => {
    try {
        await requestHandler(req, res, next);
    } catch (error) {
        console.log(`Error: ${error.message}`);

        res
            .status(error.statusCode || 500)
            .json({
                success: false,
                message: error.message,
                stack: error.stack
            })
    }
}

module.exports = asyncHandler