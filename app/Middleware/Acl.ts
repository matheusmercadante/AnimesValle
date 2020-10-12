import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ACL {
  public async handle (
    { response, auth }: HttpContextContract,
    next: () => Promise<void>,
    allowedRoles: string[],  ) {
      const user = await auth.authenticate();

    if (allowedRoles.includes('admin') && !user.$extras.isAdmin) {
      return response.redirect().back();
    } else {
      await next()
    }
  }
}
