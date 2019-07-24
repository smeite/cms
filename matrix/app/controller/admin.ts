import { Controller } from "egg";
import * as fs from "mz/fs";
import * as pump from "mz-modules/pump";
import * as path from "path";

export default class AdminController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = "todo";
  }

  public async site() {
    const { ctx } = this;
    const { id } = ctx.request.query;
    console.log("id", id);
    const result = await this.service.siteService.findSite(Number.parseInt(id));

    ctx.body = {
      code: 200,
      msg: "ok",
      data: result
    };
  }

  /* 更新站点信息 */
  public async editSite() {
    const { ctx } = this;
    const {
      id,
      name,
      logo,
      address,
      position,
      telphone,
      cellphone,
      email,
      wxapp,
      minapp,
      icp,
      copyright,
      seoTitle,
      seoKeywords,
      seoDesc
    } = ctx.request.body;
    const site = {
      id,
      name,
      logo,
      address,
      position,
      telphone,
      cellphone,
      email,
      wxapp,
      minapp,
      icp,
      copyright,
      seoTitle,
      seoKeywords,
      seoDesc
    };
    const result = this.service.siteService.editSite(site);
    ctx.body = {
      code: 200,
      msg: "ok",
      data: result
    };
  }

  public async upload() {
    const { ctx } = this;
    //  console.log("this.config.baseDir", this.config.baseDir);
    const file = ctx.request.files[0];
    let picUrl = "";
    if (!file) return ctx.throw(404);
    //  ctx.logger.warn("files: %j", files);
    const filename =
      new Date().getTime() + path.extname(file.filename).toLowerCase();
    //      console.log("filename", filename);
    const targetPath = path.join(
      //  this.config.baseDir,
      "/opt/cms/image",
      filename
    );
    const source = fs.createReadStream(file.filepath);
    const target = fs.createWriteStream(targetPath);
    try {
      await pump(source, target);
      picUrl = "http://image.jykj-cd.com/" + filename;

      //   ctx.logger.warn("save %s to %s", file.filepath, targetPath);
    } finally {
      // delete those request tmp files
      await ctx.cleanupRequestFiles();
    }

    ctx.body = {
      code: 200,
      msg: "ok",
      data: {
        src: picUrl,
        title: ""
      }
    };
  }

  public async editorUpload() {
    const { ctx } = this;
    //  console.log("this.config.baseDir", this.config.baseDir);
    console.log(ctx.request.files);
    const file = ctx.request.files[0];
    let picUrl = "";
    if (!file) return ctx.throw(404);
    //  ctx.logger.warn("files: %j", files);
    const filename =
      new Date().getTime() + path.extname(file.filename).toLowerCase();
    //      console.log("filename", filename);
    const targetPath = path.join(
      //  this.config.baseDir,
      "/opt/cms/image",
      //  "../image",
      filename
    );
    const source = fs.createReadStream(file.filepath);
    const target = fs.createWriteStream(targetPath);
    try {
      await pump(source, target);
      picUrl = "http://image.jykj-cd.com/" + filename;
      // picUrl = "http://image.diagdoc.com/" + filename;

      //   ctx.logger.warn("save %s to %s", file.filepath, targetPath);
    } finally {
      // delete those request tmp files
      await ctx.cleanupRequestFiles();
    }

    ctx.body = {
      uploaded: true,
      url: picUrl
    };
  }

  public async multiUpload() {
    const { ctx } = this;
    //  console.log("this.config.baseDir", this.config.baseDir);
    const files = ctx.request.files;
    const picUrls = new Array();
    try {
      for (const file of files) {
        const filename =
          new Date().getTime() + path.extname(file.filename).toLowerCase();
        const targetPath = path.join(
          //  this.config.baseDir,
          "/opt/cms/image",
          filename
        );
        const source = fs.createReadStream(file.filepath);
        const target = fs.createWriteStream(targetPath);
        await pump(source, target);
        let picUrl = "http://image.jykj-cd.com/" + filename;
        picUrls.push(picUrl);
        //  ctx.logger.warn("save %s to %s", file.filepath, targetPath);
      }
    } finally {
      // delete those request tmp files
      await ctx.cleanupRequestFiles();
    }

    ctx.body = {
      code: 200,
      errno: 0,
      msg: "ok",
      data: picUrls
    };
  }

  public async listLink() {
    const { ctx } = this;
    const result = await this.service.siteService.findAllLink();
    ctx.body = {
      code: 200,
      msg: "ok",
      data: result
    };
  }

  public async editLink() {
    const { ctx } = this;

    const { id, name, url, pic, note, sortNum } = ctx.request.body;
    const link = {
      id: Number.parseInt(id),
      name,
      url,
      pic,
      note,
      sortNum
    };

    console.log("link", link);
    const result = await this.service.siteService.editLink(link);
    ctx.body = {
      code: 200,
      msg: "ok",
      data: result
    };
  }

  public async deleteLink() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const result = await this.service.siteService.deleteLink(id);
    ctx.body = {
      code: 200,
      msg: "ok",
      data: result
    };
  }
}
