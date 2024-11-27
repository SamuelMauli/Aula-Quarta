const jwt = require("jsonwebtoken");
const dotenv = require("dotenv-safe");

dotenv.config();

async function generateToken(user) {
    const id = user.id;
    const email = user.email;
    const token = jwt.sign({ id, email },
        process.env.SECRET,
        { expiresIn: "1h" }
    )
    return token;
}

async function verifyToken(req, res, next){
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return res.status(401).json({ message: "Token não informado" });
    }

    const token = authHeader.split(' ')[1]; 
    if(!token){
        return res.status(401).json({ message: "Token não informado" });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err){
            return res.status(401).json({ message: "Token inválido" });
        }
        req.user = decoded;
        next();
    });
}

module.exports = { generateToken, verifyToken };
