import { Service } from "egg";
import Category from "../model/Category";
import Page from "../model/Page";

/**
 * category Service
 */
export default class CategoryService extends Service {
  /**
   *  编辑 category
   *
   * */
  public async edit(category: Category): Promise<number> {
    return await this.app.mysql.update("category", category);
  }

  public async findById(id: number): Promise<Category> {
    return await this.app.mysql.select("category", { id });
  }

  /**
   * }
   */
  public async list(page?: number, pageSize?: number): Promise<Page<Category>> {
    // let categories = [];
    const total = await this.app.mysql.count("category");
    const list: Category[] = await this.app.mysql.select("category", {
      columns: ["*"],
      orders: [["sortNum", "desc"], ["id", "desc"]]
    });
    return {
      page,
      pageSize,
      total,
      list
    };
  }

  /* 
   [
     {category:
     children:[category]
     } ...
   ]
  */

  public async findAll() {
    const result = await this.app.mysql.select("category");

    const data = this.menu(0, result);
    //   console.log(data)
    return data;
  }

  /**
   * 根据 parentId 和 array 获得 children array
   */

  public children(parentId: number, list) {
    let children = new Array();
    list.forEach(e => {
      if (e.pid === parentId) {
        children.push(e);
      }
    });
    return children;
  }

  /**
   * 菜单列表
   */
  public menu(id, list) {
    const parent = this.children(id, list);
    const menu = new Array();
    parent.forEach(e => {
      let children = new Array();
      list.forEach(el => {
        if (el.pid === e.id) {
          children.push(el);
        }
      });
      menu.push({ parent: e, children });
    });

    return menu;
  }
}
