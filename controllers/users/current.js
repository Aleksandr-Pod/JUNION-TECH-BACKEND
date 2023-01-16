const current = async (req, res) => {
    const { name, email, role } = req.user;
    res.json({ user: { name, email, role } })
}

module.exports = current;