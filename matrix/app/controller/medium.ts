import { Controller } from "egg";
import Page from "../model/Page";
import Category from "../model/Category";

export default class MediumController extends Controller {
  /* 分类 */
  public async listCategory() {
    const { ctx } = this;
    const page: Page<Category> = await this.service.categoryService.list();
    //  console.log("page", page);
    ctx.body = {
      code: 200,
      msg: "ok",
      count: page.total,
      data: page.list
    };
  }

  public async editCategory() {
    const { ctx } = this;

    ctx.body = {
      code: 200,
      msg: "todo"
    };
  }

  public async menu() {
    const { ctx } = this;
    const data = await ctx.service.categoryService.findAll();
    ctx.body = {
      code: 200,
      msg: "ok",
      data: data
    };
  }

  /**
   * 编辑
   */
  public async editMedium() {
    const { ctx } = this;
    console.log("ctx.request.body", ctx.request.body);
    const {
      id,
      firstCateId,
      firstCateName,
      secondCateId,
      secondCateName,
      name,
      pic,
      intro,
      content,
      sortNum,
      readNum,
      note,
      status,
      seoTitle,
      seoKeywords,
      seoDesc,
      modifyTime
    } = ctx.request.body;

    const medium = {
      id: Number.parseInt(id),
      firstCateId: Number.parseInt(firstCateId),
      firstCateName,
      secondCateId: Number.parseInt(secondCateId),
      secondCateName,
      name,
      pic,
      intro,
      content,
      sortNum,
      readNum,
      note,
      status,
      seoTitle,
      seoKeywords,
      seoDesc,
      modifyTime
    };
    console.log("medium", medium);
    const result = await this.service.mediumService.edit(medium);
    this.ctx.body = {
      code: 200,
      msg: "ok",
      data: result
    };
  }
  /**
   * 详情
   */
  public async showMedium() {
    const { ctx } = this;

    const { id } = ctx.request.query;
    const result = await this.service.mediumService.findById(
      Number.parseInt(id)
    );

    ctx.body = {
      code: 200,
      msg: "ok",
      data: result
    };
  }

  /**
   * 列表
   */
  public async listMedium() {
    const { ctx } = this;
    let params = ctx.request.query || ctx.request.body;
    const condition = {};

    const page: number = Number.parseInt(params.page);
    const pageSize: number = Number.parseInt(params.pageSize);
    const status: number = Number.parseInt(params.status);

    if (!isNaN(status)) condition["status"] = status;

    const result = await this.service.mediumService.list(
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

  public async deleteMedium() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    console.log(id);
    const result = await this.service.mediumService.delete(id);
    ctx.body = {
      code: 200,
      msg: "ok",
      data: result
    };
  }
}
