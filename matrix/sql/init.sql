/* 0515 manager */
insert into manager(id,phone,name,password) values (1,"17702201368","唢呐","9eec660362be09d717e3a86a87781e403052bb88");
insert into manager(id,phone,name,password) values (2,"13810484018","南山","9eec660362be09d717e3a86a87781e403052bb88");



/*  0521 内置页面分类  */
insert into category(id,pid,name)value(1,0,"基础信息");
insert into category(id,pid,name)value(2,1,"公司相关");

insert into category(id,pid,name)value(3,0,"业务范围");
insert into category(id,pid,name)value(4,3,"产品展示");
insert into category(id,pid,name)value(5,3,"精品案例");


insert into category(id,pid,name)value(6,0,"咨询动态");
insert into category(id,pid,name)value(7,6,"政策法规");
insert into category(id,pid,name)value(8,6,"行业动态");
insert into category(id,pid,name)value(9,6,"公司新闻");





/* 内置页面 */
insert into medium(id,firstCateId,firstCateName,secondCateId,secondCateName,name,content) value(1,1,"基础数据",2,"公司相关","关于我们","todo");
insert into medium(id,firstCateId,firstCateName,secondCateId,secondCateName,name,content) value(2,1,"基础数据",2,"公司相关","公司简介","todo");
insert into medium(id,firstCateId,firstCateName,secondCateId,secondCateName,name,content) value(3,1,"基础数据",2,"公司相关","发展历程","todo");
insert into medium(id,firstCateId,firstCateName,secondCateId,secondCateName,name,content) value(4,1,"基础数据",2,"公司相关","团队风采","todo");


insert into medium(id,firstCateId,firstCateName,secondCateId,secondCateName,name,content) value(5,1,"基础数据",2,"公司相关","荣誉资质","todo");
insert into medium(id,firstCateId,firstCateName,secondCateId,secondCateName,name,content) value(6,1,"基础数据",2,"公司相关","企业资质","todo");
insert into medium(id,firstCateId,firstCateName,secondCateId,secondCateName,name,content) value(7,1,"基础数据",2,"公司相关","合作客户","todo");


insert into medium(id,firstCateId,firstCateName,secondCateId,secondCateName,name,content) value(8,1,"基础数据",2,"公司相关","业务范围","todo");
insert into medium(id,firstCateId,firstCateName,secondCateId,secondCateName,name,content) value(9,1,"基础数据",2,"公司相关","业务介绍","todo");

insert into medium(id,firstCateId,firstCateName,secondCateId,secondCateName,name,content) value(10,1,"基础数据",2,"公司相关","联系我们","todo");
insert into medium(id,firstCateId,firstCateName,secondCateId,secondCateName,name,content) value(11,1,"基础数据",2,"公司相关","联系方式","todo");
insert into medium(id,firstCateId,firstCateName,secondCateId,secondCateName,name,content) value(12,1,"基础数据",2,"公司相关","招聘信息","todo");







/* 05 28 */
insert into site(id,name,logo,telphone,wxapp,address,email,icp)value(1,"承德建元科技有限公司","../public/image/logo.png","0314-7068555 0314-5912777","../public/image/wxapp.png","河北省承德市隆化县黑水工业园;河北省承德市双滦区双塔山镇茶棚路馨安商贸小区D2#座103号","jianyuankeji@cdjianyuan.com","冀ICP备16029147号");

/* 0528 */

insert into message(id,userId,userName,phone,email,content)value(1,0,'fdng',"17702201368","zuo@qq.com","测试");
insert into message(id,userId,userName,phone,email,content)value(2,0,'fdng',"17702201368","zuo@qq.com","测试2");

insert into link(id,name,url)value(1,"测试","http://baidu.com");
insert into link(id,name,url)value(2,"测试2","http://baidu.com");
insert into link(id,name,url)value(3,"测试3","http://baidu.com");
insert into link(id,name,url)value(4,"测试4","http://baidu.com");


/* 0531 */
insert into medium(id,name)value(1,"测试");

