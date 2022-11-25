export class UnauthorizedError extends Error{
  constructor (){
    super('Unauthorizedame')
    this.name = 'UnauthorizedError'
  }
}
