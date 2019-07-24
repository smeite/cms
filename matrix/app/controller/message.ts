import { Controller } from "egg";

export default class MessageController extends Controller {
  /**
   * 根据条件进行查询，条件需要有规范 todo
   */
  public async list() {
    const { ctx } = this;
    let condition = {};
    let params = ctx.request.query || ctx.request.body;

    const page: number = Number.parseInt(params.page);
    const pageSize: number = Number.parseInt(params.pageSize);
    const status: number = Number.parseInt(params.status);

    if (!isNaN(status)) condition["status"] = status;

    const result = await this.service.messageService.list(
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

  /* 最新留言 */
  public async new() {
    const { ctx } = this;
    const num = await this.service.messageService.news;
    ctx.body = {
      code: 200,
      msg: "ok",
      data: {
        news: num
      }
    };
  }

  /* 删除留言 */
  public async delete() {
    const { ctx } = this;
    let condition = {};
    console.log("ctx.request.body", ctx.request.body);
    let { id } = ctx.request.body;
    console.log("id", id);

    condition["id"] = Number.parseInt(id);
    console.log("condition", condition);
    const result = await this.service.messageService.delete(condition);
    ctx.body = {
      code: 200,
      msg: "ok",
      data: result
    };
  }

  /*  处理留言 */
  public async handle() {
    const { ctx } = this;
    let condition = {};
    let { id, note } = ctx.request.body;
    condition["id"] = Number.parseInt(id);
    const result = await this.service.messageService.addNote(condition, note);
    ctx.body = {
      code: 200,
      msg: "ok",
      data: result
    };
  }
}
