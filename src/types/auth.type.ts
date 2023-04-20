import { ICurrentUser } from './user.type'
import { SuccessResponse } from './utils.type'

export interface IDecodedToken {
  email: string
  exp: number
  iat: number
  role: string
  _id: string
}

export interface IPayloadAuth {
  email: string
  password: string
}

export interface ILogoutAuth {
  refreshToken: string
}

export type AuthResponse = SuccessResponse<ICurrentUser>
