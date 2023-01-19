
function admin(req, res, next) {
    console.log('req.student.IsAdmin :>> ', req.student.IsAdmin);
    if (!req.student.IsAdmin) return res.status(403).send('Access denied. Forbidden')
    next()
}

export default admin;