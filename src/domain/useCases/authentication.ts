export interface AuthenticationFields{
  email: string
  password: string
}
export interface Authentication{
  auth: ({ email, password }: AuthenticationFields) => Promise<string>
}
