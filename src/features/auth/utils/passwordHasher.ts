import 'server-only'
import bcrypt from 'bcryptjs'

const ROUNDS = 12

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password.normalize(), ROUNDS)
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  //tutor used crypto.timeSafeEqual
  return bcrypt.compare(password.normalize(), hash)
}
