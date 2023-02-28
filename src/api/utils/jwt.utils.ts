import { JwtPayload, sign, SignOptions, verify, VerifyCallback, VerifyErrors, VerifyOptions } from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';
import { TokenPayload } from '../../../typing';

/**
 * generate token
 * @return {string}
 */
export function generateToken() : string {
  // information to be encoded in the JWT
  const payload = {
    name: 'quang',
    userId: 123,
    accessTypes: [
      'getTeams',
      'addTeams',
      'updateTeams',
      'deleteTeams'
    ]
  };
  // read private key value
  const privateKey = fs.readFileSync(path.join(__dirname, './../../../private.key'),'utf8');

  const signInOptions: SignOptions = {
    // RS256 uses a public/private key pair. The API provides the private key
    // to generate the JWT. The client gets a public key to validate the
    // signature
    // algorithm: 'RS256',
    expiresIn: '1h'
  };

  // generate JWT
  return sign(payload, 'haha', signInOptions);
};

/**
 * check if token is valid
 * @param  {string} token
 * @return {Promise<TokenPayload>}
 */
export function validateToken(token: string): Promise<TokenPayload> {
  const publicKey = fs.readFileSync(path.join(__dirname, './../../../public.key'));

  const verifyOptions: VerifyOptions = {
    // algorithms: ['RS256'],
  };

  return new Promise((resolve, reject) => {
    verify(token, 'haha', verifyOptions, (error, decoded) => {
      if (error) return reject(error);
      resolve(decoded as TokenPayload);
    })
  });
}