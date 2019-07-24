import { EggPlugin } from "egg";

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  /* mysql 访问插件 */
  mysql: {
    enable: true,
    package: "egg-mysql"
  },
  /*  参数规则校验 */
  validate: {
    enable: true,
    package: "egg-validate"
  },
  /* 跨域解决问题 */
  cors: {
    enable: true,
    package: "egg-cors"
  },
  nunjucks: {
    enable: true,
    package: "egg-view-nunjucks"
  }
};

export default plugin;
