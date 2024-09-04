
// not found middleware is specifically designed to handle requests for non-existent routes.
const notFoundMiddleware = (req, res) => {
    res.status(404).json({ msg: 'Module not found' });
}

export default notFoundMiddleware;