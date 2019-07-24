import { Service } from "egg";

/* 筛选条件 */
interface Condition {
  status?: number;
  id?: number;
}

export default class MessageService extends Service {
  /* 未处理消息个数 */
  public async news() {
    return await this.app.mysql.count("message", {
      where: {
        status: 0
      }
    });
  }
  /**
   * 更新message status  可以根据 condition 中的ids 批量操作
   * @param condition object
   */
  public async delete(condition: Condition): Promise<object> {
    return await this.app.mysql.delete("message", { id: condition.id });
  }

  /* 添加处理结果 */

  public async addNote(condition: Condition, note: string) {
    return await this.app.mysql.update(
      "message",
      {
        note: note,
        status: 1
      },
      { where: condition }
    );
  }

  /**
   * 根据条件查询
   * page :当前页
   * limit ：每页大小
   */
  public async list(condition: Condition, page: number, pageSize: number) {
    const total = await this.app.mysql.count("message", condition);
    const offset = page <= 1 ? 0 : page * pageSize;

    const list = await this.app.mysql.select("message", {
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
