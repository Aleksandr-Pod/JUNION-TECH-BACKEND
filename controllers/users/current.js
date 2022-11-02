const current = async (req, res) => {
    const { name, email, role } = req.user;
    res.status(200).json({ user: { name, email, role } })
}

module.exports = current;