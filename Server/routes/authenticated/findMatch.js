module.exports = async function findMatch(req, res) {
    res.json({
        message: 'Found user to connect with!',
        connectTo: '[return user.id]',
        user: req.user
    });
};