import { Service } from "egg";

interface Site {
  id: number;
  name: string;
  logo: string;
  address?: string;
  position?: string;
  telphone?: string;
  cellphone?: string;
  email?: string;
  wxapp?: string;
  minapp?: string;
  icp?: string;
  copyright?: string;
  seoTitle?: string;
  seoKeywords?: string;
  seoDesc?: string;
}
interface Link {
  id?: number;
  name?: string;
  url?: string;
  pic?: string;
  sortNum?: number;
  note?: string;
}
/**
 * category Service
 */
export default class SiteService extends Service {
  /*  查找 site */
  public async findSite(id: number): Promise<Site> {
    return await this.app.mysql.get("site", { id: id });
  }

  /**
   *  编辑 site
   *
   * */
  public async editSite(site: Site): Promise<number> {
    return await this.app.mysql.update("site", site);
  }

  public async findAllLink(): Promise<Link> {
    return await this.app.mysql.select("link", {
      orders: [["sortNum", "desc"]]
    });
  }

  /* 编辑 link */
  public async editLink(link: Link): Promise<number> {
    if (link.id) {
      return await this.app.mysql.update("link", link);
    } else {
      return await this.app.mysql.insert("link", link);
    }
  }

  /* delete link */
  public async deleteLink(id: number): Promise<number> {
    return await this.app.mysql.delete("link", { id: id });
  }
}
