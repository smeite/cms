import { EggAppConfig, EggAppInfo, PowerPartial } from "egg";

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1552137908327_7538";
  config.security = {
    xframe: {
      enable: false
    },
    csrf: {
      enable: false
    },
    domainWhiteList: [
      "http://admin.jykj-cd.com",
      "http://jykj-cd.com",
      "http://www.jykj.com"
    ]
  };
  config.cors = {
    origin: "*",
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH"
  };

  // add your egg config in here
  // config.middleware = ["jwt"];

  //AES对称加密 秘钥 和 crypto 加密 password
  config.secret = "b1ueBC2f8rkub368073dC9n4C1sB1475";

  config.view = {
    defaultViewEngine: "nunjucks",
    mapping: {
      ".nj": "nunjucks"
    }
  };

  config.multipart = {
    mode: "file"
  };

  const bizConfig = {
    local: {
      msg: "local"
    },

     jwt: {
      name: "jwt",
      match: /^\/admin\/login/
    } 
  };

  // the return config will combines to EggAppConfig
  return {
    ...(config as {}),
    ...bizConfig
  };
};
