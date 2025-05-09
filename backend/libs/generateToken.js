import jwt from 'jsonwebtoken';

export const generateTokenAndCookie = (userId, res) => {
   const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '1h'})

   res.cookie('jwt', token, {
      maxAge: 3600000,
      httpOnly: true,
      sameSite: "strict",
      secure: false
   });
}