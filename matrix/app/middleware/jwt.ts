import { Context, Application, EggAppConfig } from "egg";
import * as jwt from "jsonwebtoken";

export default function jwtMiddleWare(
  options: EggAppConfig["jwt"],
  app: Application
): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const token = ctx.headers["token"] || ctx.request.query["token"];
    console.info(options, token);
    if (token) {
      try {
        jwt.verify(token, app.config.secret);
        await next();
      } catch (error) {
        ctx.body = {
          code: 403,
          msg: "token未通过验证" + error
        };
      }
    } else {
      ctx.body = {
        code: 400,
        msg: "token不存在"
      };
    }
  };
}
