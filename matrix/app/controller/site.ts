import { Controller } from "egg";

/* 网站前端
 */
export default class SiteController extends Controller {
  /* 首页 */
  public async index() {
    const { ctx } = this;
    const site = await this.service.siteService.findSite(1);
    const links = await this.service.siteService.findAllLink();

    const seoTitle = site.name + " " + site.seoTitle;
    const seoKeywords = site.seoKeywords;
    const seoDesc = site.seoDesc;
    const condition7 = {
      secondCateId: 7
    };
    const condition8 = {
      secondCateId: 8
    };
    const mediumData1 = await this.service.mediumService.list(condition7, 1, 5);

    const policies = mediumData1.list.map(e => ({
      id:e.id,
      name: e.name,
      pic: e.pic,
      modifyTime: e.modifyTime.split(" ")[0]
    }));

    let mediumData2 = await this.service.mediumService.list(condition8, 1, 5);

    const news = mediumData2.list.map(e => ({
      id:e.id,
      name: e.name,
      pic: e.pic,
      modifyTime: e.modifyTime.split(" ")[0]
    }));

    console.log(policies, news);

    const aboutUs = await this.service.mediumService.findById(1);

    const channel = "index";
    await ctx.render("index.nj", {
      channel,
      seoTitle,
      seoKeywords,
      seoDesc,
      site,
      policies,
      news: news,
      aboutUs,
      links
    });
  }

  /* 关于我们 channel */

  public async company() {
    const { ctx } = this;
    const { id } = ctx.request.query;
    const site = await this.service.siteService.findSite(1);
    const links = await this.service.siteService.findAllLink();
    const channel = "company";

    const medium = await this.service.mediumService.findById(
      Number.parseInt(id)
    );
    const seoTitle = medium.seoTitle;
    const seoKeywords = medium.seoKeywords;
    const seoDesc = medium.seoDesc;
    await ctx.render("company.nj", {
      channel,
      seoTitle,
      seoKeywords,
      seoDesc,
      site,
      links,
      id,
      medium
    });
  }

  /* 荣誉资质 channel */

  public async honor() {
    const { ctx } = this;
    const { id } = ctx.request.query;
    const site = await this.service.siteService.findSite(1);
    const links = await this.service.siteService.findAllLink();
    const channel = "honor";

    const medium = await this.service.mediumService.findById(
      Number.parseInt(id)
    );
    const seoTitle = medium.seoTitle;
    const seoKeywords = medium.seoKeywords;
    const seoDesc = medium.seoDesc;
    await ctx.render("honor.nj", {
      channel,
      seoTitle,
      seoKeywords,
      seoDesc,
      site,
      links,
      id,
      medium
    });
  }

  /* 业务范围  channel */
  public async business() {
    const { ctx } = this;
    const site = await this.service.siteService.findSite(1);
    const links = await this.service.siteService.findAllLink();
    const channel = "business";

    let { id, level, currentPage, limit } = ctx.request.query;
    let page = currentPage != "" ? Number.parseInt(currentPage) : 1;
    let pageSize = limit != "" ? Number.parseInt(limit) : 10;
    let condition = {};
    if (level === "1") condition["firstCateId"] = Number.parseInt(id);
    if (level === "2") condition["secondCateId"] = Number.parseInt(id);
    const category = await this.service.categoryService.findById(
      Number.parseInt(id)
    );
    const seoTitle = category.seoTitle;
    const seoKeywords = category.seoKeywords;
    const seoDesc = category.seoDesc;
    const data = await this.service.mediumService.list(
      condition,
      page,
      pageSize
    );
    await ctx.render("business.nj", {
      channel,
      seoTitle,
      seoKeywords,
      seoDesc,
      site,
      links,
      id,
      level,
      currentPage,
      mediums: data.list,
      total: data.total,
      totalPages: data.total / pageSize + 1
    });
  }

  /* 咨询动态  channel */
  public async news() {
    const { ctx } = this;
    const site = await this.service.siteService.findSite(1);
    const links = await this.service.siteService.findAllLink();
    const channel = "news";

    let { id, level, currentPage, limit } = ctx.request.query;
    let page = currentPage != "" ? Number.parseInt(currentPage) : 1;
    let pageSize = limit != "" ? Number.parseInt(limit) : 10;
    let condition = {};
    if (level === "1") condition["firstCateId"] = Number.parseInt(id);
    if (level === "2") condition["secondCateId"] = Number.parseInt(id);
    const category = await this.service.categoryService.findById(
      Number.parseInt(id)
    );
    const seoTitle = category.seoTitle;
    const seoKeywords = category.seoKeywords;
    const seoDesc = category.seoDesc;
    const data = await this.service.mediumService.list(
      condition,
      page,
      pageSize
    );
    await ctx.render("news.nj", {
      channel,
      seoTitle,
      seoKeywords,
      seoDesc,
      site,
      links,
      id,
      level,
      currentPage,
      mediums: data.list,
      total: data.total,
      totalPages: data.total / pageSize + 1
    });
  }

  /* 联系我们  channel */
  public async contact() {
    const { ctx } = this;
    const site = await this.service.siteService.findSite(1);
    const links = await this.service.siteService.findAllLink();
    const channel = "contact";

    const { id } = ctx.request.query;
    const medium = await this.service.mediumService.findById(
      Number.parseInt(id)
    );
    const seoTitle = medium.seoTitle;
    const seoKeywords = medium.seoKeywords;
    const seoDesc = medium.seoDesc;
    await ctx.render("contact.nj", {
      channel,
      seoTitle,
      seoKeywords,
      seoDesc,
      site,
      links,
      id,
      medium
    });
  }

  public async businessDetail() {
    const { ctx } = this;
    const { id, mid } = ctx.request.query;
    const site = await this.service.siteService.findSite(1);
    const links = await this.service.siteService.findAllLink();
    const channel = "business";

    const medium = await this.service.mediumService.findById(
      Number.parseInt(mid)
    );
    const prevMedium = await this.service.mediumService.findById(
      Number.parseInt(mid) - 1
    );
    const nextMedium = await this.service.mediumService.findById(
      Number.parseInt(mid) + 1
    );

    // const data = await this.service.mediumService.list({}, 1, 6);

    await ctx.render("businessDetail.nj", {
      channel,
      site,
      links,
      id,
      medium,
      prevMedium,
      nextMedium
      //  mediums: data.list
    });
  }

  public async newsDetail() {
    const { ctx } = this;
    const { id, mid } = ctx.request.query;
    const site = await this.service.siteService.findSite(1);
    const links = await this.service.siteService.findAllLink();
    const channel = "news";
    const medium = await this.service.mediumService.findById(
      Number.parseInt(mid)
    );
    const prevMedium = await this.service.mediumService.findById(
      Number.parseInt(mid) - 1
    );
    const nextMedium = await this.service.mediumService.findById(
      Number.parseInt(mid) + 1
    );

    //  const mediums = await this.service.mediumService.list({}, 1, 6);

    await ctx.render("newsDetail.nj", {
      channel,
      site,
      links,
      id,
      medium,
      prevMedium,
      nextMedium
      //   mediums
    });
  }

  // 网站地图
  public async siteMap() {
    const { ctx } = this;

    await ctx.render("siteMap.nj", {});
  }
}
