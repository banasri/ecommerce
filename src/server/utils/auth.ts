// import { sign, verify, JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

// const secret = 'your_secret_key'; 
// interface UserPayload {
//   userId: number;
//   email: string;
// }

// // Function to create a JWT token
// export const createToken = (email: string): string => {
//   return sign(email, secret);
// };
// export const decodeToken = (token: string): string  | null => {
//   try {
//     const decoded = verify(token, secret) as string;
//     return decoded;
//   } catch (error) {
//     if (error instanceof JsonWebTokenError) {
//       console.error('Invalid token:', error.message);
//     } else if (error instanceof TokenExpiredError) {
//       console.error('Token expired:', error.message);
//     } else if (error instanceof Error) {
//       console.error('General token error:', error.message);
//     } else {
//       console.error('Unknown token error:', error);
//     }
//     return null;
//   }
// };

// // Function to get the authentication token from localStorage
// export const getToken = (): string | null => {
//   return localStorage.getItem('token');
// };
