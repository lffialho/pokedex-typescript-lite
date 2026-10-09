export class ApiError extends Error {
  public status: number

  constructor(mensagem: string, status: number) {
    super(mensagem)
    this.name = "ApiError"
    this.status = status
  }
}