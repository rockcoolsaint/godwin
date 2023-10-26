export class FetchError extends Error {
  public res?: Response

  constructor(res?: Response, message?: string) {
    super(message)
    this.res = res
  }
}
