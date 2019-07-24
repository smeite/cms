import { Service } from "egg";

interface Condition {
  name?: string;
  firstCateId?: number;
  secondCateId?: number;
  status?: Array<number>;
  id?: Array<number>;
}
interface Medium {
  id?: number;
  firstCateId?: number;
  firstCateName?: string;
  secondCateId?: number;
  secondCateName?: string;
  name?: string;
  pic?: string;
  intro?: string;
  content?: string;
  sortNum?: number;
  readNum?: number;
  note?: string;
  status?: number;
  seoTitle?: string;
  seoKeywords?: string;
  seoDesc?: string;
  createId?: number;
  createName?: string;
  modifyTime?: string;
}

/**
 * User Service
 */
export default class MediumService extends Service {
  /**
   * find medium by Id
   * @param did - medium id
   */
  public async findById(id: number) {
    return await this.app.mysql.get("medium", { id });
  }
  /**
   * find medium by Id
   * @param did - medium id
   */
  public async show(id: number) {
    return await this.app.mysql.get("medium", { id });
  }

  public async edit(medium: Medium): Promise<object> {
    if (medium.id) {
      return await this.app.mysql.update("medium", medium);
    } else {
      return await this.app.mysql.insert("medium", medium);
    }
  }

  public async delete(id: number): Promise<object> {
    return await this.app.mysql.delete("medium", { id: id });
  }

  public async list(condition: Condition, page: number, pageSize: number) {
    const total = await this.app.mysql.count("medium", condition);
    const offset = page <= 1 ? 0 : (page - 1) * pageSize;
    const list = await this.app.mysql.select("medium", {
      where: condition,
      columns: ["*"],
      orders: [["id", "desc"]],
      limit: pageSize,
      offset: offset
    });

    return {
      total,
      list
    };
  }
}
