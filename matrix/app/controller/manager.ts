import { Controller } from "egg";
import * as jwt from "jsonwebtoken";
export default class ManagerController extends Controller {
  /**
   * 管理员登录
   */
  public async login() {
    const { ctx } = this;
    console.log("ctx", ctx.request.body);
    try {
      // 校验请求参数
      ctx.validate(
        {
          phone: {
            type: "string",
            format: /\d+/,
            required: true
          },
          password: {
            type: "string",
            required: true
          }
        },
        ctx.request.body
      );

      const password = this.service.managerService.cryptoPassword(
        ctx.request.body.password
      );
      const result = await this.service.managerService.find(
        ctx.request.body.phone,
        password
      );

      if (result != null) {
        if (result.status != 0) {
          const token = jwt.sign(
            { name: result.name, id: result.id },
            this.app.config.secret
          );
          ctx.body = {
            code: 200,
            msg: "ok",
            data: {
              token
            }
          };
        } else {
          ctx.body = {
            code: 403,
            msg: "Fail,你已被禁用"
          };
        }
      } else {
        ctx.body = {
          code: 403,
          msg: "手机号或者密码错误，拒绝执行"
        };
      }
    } catch (err) {
      ctx.body = {
        code: 400,
        msg: "请求参数出错",
        data: ctx.request.body
      };
    }
  }

  public async logout() {
    const { ctx } = this;
    ctx.body = {
      code: 512,
      msg: "todo"
    };
  }

  /**
   * 添加 manager
   */
  public async add() {
    const { ctx } = this;
    ctx.body = {
      code: 512,
      msg: "todo"
    };
  }

  /**
   * 获取manager info,例如权限
   */
  public async info() {
    const { ctx } = this;
    const token =
      ctx.state.token || ctx.headers["token"] || ctx.request.query["token"];
    try {
      const result = jwt.verify(token, this.app.config.secret);
      const id: number = result.id;
      const user = await this.service.managerService.findById(id);
      ctx.body = {
        code: 200,
        msg: "Ok",
        data: user
      };
    } catch (error) {
      ctx.body = {
        code: 401,
        msg: "需要用户验证"
      };
    }
  }
  /**
   * 编辑 manager
   */
  public async edit() {
    const { ctx } = this;
    const { manager } = ctx.request.body;
    console.log("manager", manager);
    const result = await this.service.managerService.edit(manager);
    ctx.body = {
      code: 200,
      msg: "ok",
      data: result
    };
  }
  /**
   * 删除 manager
   */
  public async delete() {
    const { ctx } = this;
    const { ids } = ctx.request.body;
    const aa = ids.split(",");
    const requestIds = aa.map(e => Number.parseInt(e));
    let condition = {};
    condition["id"] = requestIds;
    // console.log("condition", condition);
    const result = await this.service.managerService.modifyStatus(condition, 0);
    ctx.body = {
      code: 200,
      msg: "ok",
      data: result
    };
  }
  /**
   * 修改密码
   */
  public async modifyPassword() {
    const { ctx } = this;
    const { oldPassword } = ctx.request.body;
    const { password } = ctx.request.body;
    const token =
      ctx.state.token || ctx.headers["token"] || ctx.request.query["token"];
    try {
      const result = jwt.verify(token, this.app.config.secret);
      const id: number = result.id;
      const user = await this.service.managerService.findById(id);
      const compareResult = this.service.managerService.comparePassword(
        oldPassword,
        user.password
      );
      if (!compareResult) {
        ctx.body = {
          code: 200,
          msg: "原始密码不正确"
        };
      } else {
        const modifyResult = await this.service.managerService.modifyPassword(
          password,
          user.id
        );

        ctx.body = {
          code: 200,
          msg: "修改成功",
          data: modifyResult
        };
      }
    } catch (error) {
      ctx.body = {
        code: 401,
        msg: "需要用户验证"
      };
    }
  }
  /**
   * 根据用户角色获得菜单 TODO
   */
  public async menu() {
    const { ctx } = this;
    // const token = ctx.state.token || ctx.headers["token"] || ctx.request.query["token"];
    ctx.body = {
      code: 200,
      msg: "ok",
      data: ""
    };
  }

  /**
   * 根据条件进行查询，条件需要有规范 todo
   */
  public async list() {
    const { ctx } = this;
    let condition = {};
    let params = ctx.request.query || ctx.request.body;

    const page: number = Number.parseInt(params.page);
    const pageSize: number = Number.parseInt(params.pageSize);
    const name: string = params.name;
    const phone: string = params.phone;
    const status: number = Number.parseInt(params.status);
    const sex: number = Number.parseInt(params.sex);
    if (name) condition["name"] = name;
    if (phone) condition["phone"] = phone;
    if (!isNaN(sex)) condition["sex"] = sex;
    if (!isNaN(status)) condition["status"] = status;

    const result = await this.service.managerService.list(
      condition,
      page,
      pageSize
    );
    ctx.body = {
      code: 200,
      msg: "ok",
      total: result.total,
      data: result.list
    };
  }
  /**
   *  根据ID 查询role
   * @param id
   */
  public async role() {
    const { ctx } = this;
    ctx.body = {
      code: 200,
      msg: "ok",
      data: ""
    };
  }
  /**
   * roles 列表
   */
  public async roles() {
    const { ctx } = this;
    ctx.body = {
      code: 200,
      msg: "ok",
      data: ""
    };
  }
}
