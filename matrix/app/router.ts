import { Application } from "egg";

export default (app: Application) => {
  const { controller, router } = app;

  // 前台
  router.get("/", controller.site.index);

  router.get("/company", controller.site.company);
  router.get("/honor", controller.site.honor);
  router.get("/business", controller.site.business);
  router.get("/news", controller.site.news);
  router.get("/contact", controller.site.contact);

  router.get("/business/detail", controller.site.businessDetail);
  router.get("/news/detail", controller.site.newsDetail);

  router.get("/sitemap.xml", controller.site.siteMap);

  /* 后台管理员API  */
  router.get("/admin/index", controller.admin.index);
  router.post("/admin/upload", controller.admin.upload);
  router.post("/admin/editorUpload", controller.admin.editorUpload);
  router.post("/admin/multiUpload", controller.admin.multiUpload);

  router.get("/admin/site/detail", controller.admin.site);
  router.post("/admin/site/edit", controller.admin.editSite);

  router.get("/admin/link/list", controller.admin.listLink);
  router.post("/admin/link/edit", controller.admin.editLink);
  router.post("/admin/link/delete", controller.admin.deleteLink);

  router.post("/manager/login", controller.manager.login);
  router.post("/admin/manager/logout", controller.manager.login);
  router.get("/admin/manager/info", controller.manager.info);
  router.post("/admin/manager/add", controller.manager.add);
  router.post("/admin/manager/edit", controller.manager.edit);
  router.post("/admin/manager/delete", controller.manager.delete);
  router.get("/admin/manager/menu", controller.manager.menu);
  router.get("/admin/manager/list", controller.manager.list);
  router.post(
    "/admin/manager/modifyPassword",
    controller.manager.modifyPassword
  );

  // admin medium
  router.get("/admin/category/list", controller.medium.listCategory);
  router.get("/admin/category/menu", controller.medium.menu);
  router.post("/admin/category/edit", controller.medium.editCategory);
  router.get("/admin/medium/list", controller.medium.listMedium);
  router.get("/admin/medium/show", controller.medium.showMedium);
  router.post("/admin/medium/edit", controller.medium.editMedium);
  router.post("/admin/medium/delete", controller.medium.deleteMedium);

  // admin message
  router.get("/admin/message/new", controller.message.new);
  router.get("/admin/message/list", controller.message.list);
  router.post("/admin/message/delete", controller.message.delete);
  router.post("/admin/message/handle", controller.message.handle);
};
