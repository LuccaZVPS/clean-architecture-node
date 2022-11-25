export class UnauthorizedError extends Error{
  constructor (paramName: string){
    super(`Unauthorized:${paramName}`)
    this.name = 'UnauthorizedError'
  }
}
