import jwt from 'jsonwebtoken';

const generateToken = async (user, secret) => {
    const token = await jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
    return token;
}

export default generateToken;