import * as CryptoJS from "crypto-js";
import { Service } from "egg";

/* 筛选条件 */
interface Condition {
  name?: string;
  phone?: string;
  sex?: number;
  status?: number;
  id?: Array<number>;
}
interface Manager {
  id?: number;
  name: string;
  password: string;
  phone: string;
  status: number;
  sex: number;
  email?: string;
  note?: string;
}

export default class ManagerService extends Service {
  /**
   * 对输入的密码进行加密
   * @param password
   */
  public cryptoPassword(password: string): string {
    return CryptoJS.HmacSHA1(password, this.app.config.secret).toString(
      CryptoJS.enc.Hex
    );
  }
  /**
   * 比对当前密码
   * @param currentPassword
   * @param password
   */
  public comparePassword(currentPassword: string, password: string) {
    const cryptoPassword = CryptoJS.HmacSHA1(
      currentPassword,
      this.app.config.secret
    ).toString(CryptoJS.enc.Hex);
    if (cryptoPassword == password) {
      return true;
    } else {
      return false;
    }
  }
  /**
   *
   * @param phone
   * @param password
   */
  public async find(phone: string, password: string): Promise<any> {
    return await this.app.mysql.get("manager", {
      phone,
      password
    });
  }
  /**
   * 根据手机号查找 manager
   * @param phone
   */
  public async findByPhone(phone: string): Promise<any> {
    return await this.app.mysql.get("manager", {
      phone
    });
  }
  /**
   * 根据ID获得 manager
   * @param id
   */
  public async findById(id: number): Promise<any> {
    return await this.app.mysql.get("manager", {
      id
    });
  }

  /**
   * add manager
   * @param manager
   */
  public async add(manager: Manager): Promise<object> {
    return await this.app.mysql.insert("manager", manager);
  }
  /**
   *  编辑 manager
   * @param manager
   */
  public async edit(manager: Manager): Promise<object> {
    const ma = manager;
    if (ma.id) {
      return await this.app.mysql.update("manager", manager);
    } else {
      delete ma.id;
      return await this.app.mysql.insert("manager", manager);
    }
  }
  /**
   * 更新manager status  可以根据 condition 中的ids 批量操作
   * @param condition object
   */
  public async modifyStatus(
    condition: Condition,
    status: number
  ): Promise<object> {
    return await this.app.mysql.update(
      "manager",
      { status: status },
      { where: condition }
    );
  }

  public async modifyPassword(password, userId) {
    const cryptoPassword = this.cryptoPassword(password);
    return await this.app.mysql.update(
      "manager",
      { password: cryptoPassword },
      { where: { id: userId } }
    );
  }

  /**
   * 根据条件查询
   * page :当前页
   * limit ：每页大小
   */
  public async list(condition: Condition, page: number, pageSize: number) {
    const total = await this.app.mysql.count("manager", condition);
    const offset = page <= 1 ? 0 : page * pageSize;

    const list = await this.app.mysql.select("manager", {
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
