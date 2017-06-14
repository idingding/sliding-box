module.exports = function(context, req) {
    if (!req.headers['origin']) {
        context.res = {
            status: 400,
            body: '"origin" is required in the header'
        }
    }

    context.done()
}