import { Controller } from 'egg';

export default class UserController extends Controller {

  /**
   * user list
   */
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('egg');
  }

  /**
   * 详情 
  */
  public async show(){
    this.ctx.body={
      code:512,
      msg:"todo"
    }
  }
/**
 * 添加
 */
  public async add(){
    this.ctx.body={
      code:512,
      msg:"todo"
    }
  }
/**
 * 编辑
 */
  public async edit(){
    this.ctx.body={
      code:512,
      msg:"todo"
    }
  }

/**
 * 过滤
 */
  public async filter(){
    this.ctx.body={
      code:512,
      msg:"todo"
    }
  }
}
