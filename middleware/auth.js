import jwt from "jsonwebtoken";
//import config from "config";

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token Provided')

    try {
        const decode = jwt.verify(token, process.env.jwtPrivatekey);
        req.student = decode
        //console.log('decode :>> ', req.student);
        next()
    } catch (ex) {
        res.status(400).send('Invalid Token')
    }

}

export default auth;