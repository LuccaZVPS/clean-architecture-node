import { Encrypter } from '../../data/protocols/encrypter'
import bcryptjs from 'bcryptjs'
export class BcryptAdapter implements Encrypter{
  async encrypt (value: string): Promise<string>{
    const hashedPassword = await bcryptjs.hash(value, 12)
    return hashedPassword
  };
}
