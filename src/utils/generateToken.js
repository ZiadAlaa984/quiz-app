import jwt from 'jsonwebtoken';

const generateToken = (user, secret) => {
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '30d' });
    return token;
};

export default generateToken;