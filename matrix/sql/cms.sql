CREATE database cms;
use cms;



-- ----------------------------
--  Table structure for `user` 用户，手机账号
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(10) unsigned  '用户唯一的ID，user table中的ID',
  `name` varchar(64)  NOT NULL COMMENT '名称',
  `phone` varchar(11) NOT NULL COMMENT '手机',
  `password` varchar(32) NOT NULL COMMENT '密码',
  `isVerified` tinyint  NOT NULL default '0'  COMMENT '手机号是否校验 默认为0 未校验 1 校验成功',
  `birthday`  date  DEFAULT NULL COMMENT '出身日期',
  `sex` tinyint  NOT NULL default '0'  COMMENT '性别 0 女 1 男',
  `intro` varchar(140)  DEFAULT NULL COMMENT '介绍',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态 -1 删除 0 冻结 1 正常 ',
 `modifyTime` timestamp  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `createTime` timestamp default CURRENT_TIMESTAMP COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户';


-- ----------------------------
--  Table structure for `medium` 媒体
-- ----------------------------

DROP TABLE IF EXISTS `medium`;
CREATE TABLE `medium` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstCateId` INT   COMMENT '分类Id',
  `firstCateName` VARCHAR(64)   COMMENT '分类名称1',
  `secondCateId` INT  COMMENT '分类Id',
  `secondCateName` VARCHAR(64)  COMMENT '分类名称2',
  `name` varchar(64) NOT NULL COMMENT '名称',
  `intro` varchar(140) default''  COMMENT '简介',
  `pic` varchar(140)  default'' COMMENT 'pic',
  `content` text  COMMENT '',
  `sortNum` int(11)  DEFAULT 0 COMMENT '排序',
  `readNum` int(11)  DEFAULT 0 COMMENT '排序',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态  0 草稿 1 正常 ',
  `note` varchar(140) default'' COMMENT '',
  `seoTitle`  varchar(128) default''  COMMENT 'seo title',
  `seoDesc` varchar(200) default''   COMMENT 'seo title',
  `seoKeywords` varchar(128) default''   COMMENT 'seo description',
  `creatorId`  int(11)   COMMENT '创建人Id',
  `creatorName`  varchar(64) default''  COMMENT '创建人名称',
  `modifyTime` timestamp  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `createTime` timestamp default CURRENT_TIMESTAMP COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文章';


-- ----------------------------
--  Table structure for `category` category
-- ----------------------------

DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pid` INT not null default 0  COMMENT '顶级',
  `name` varchar(64)  NOT NULL COMMENT '名称',
  `sortNum` int(11) NOT NULL DEFAULT 0 COMMENT '排序',
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '状态 0 冻结 1 正常 ',
  `note` varchar(140)  COMMENT '备注',
  `seoTitle` varchar(128)   COMMENT 'seo title',
  `seoDesc` varchar(200)   COMMENT 'seo title',
  `seoKeywords` varchar(128)   COMMENT 'seo description',
  `creatorId`  int  DEFAULT 1 COMMENT '创建人iD',
  `creatorName`  varchar(32)   DEFAULT "唢呐" COMMENT '创建人名称',
  `modifyTime` timestamp  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `createTime` timestamp default CURRENT_TIMESTAMP COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='疾病';


-- ----------------------------
--  Table structure for `site ` 网站
-- ----------------------------

DROP TABLE IF EXISTS `site`;
CREATE TABLE `site` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(140)  NOT NULL COMMENT '名称',
  `logo` varchar(140)   COMMENT 'logo',
  `address` varchar(140)  DEFAULT NULL COMMENT '地址',
  `position` varchar(140)  DEFAULT NULL COMMENT '位置',
  `telphone` varchar(64)  DEFAULT NULL COMMENT '固定电话 客服电话',
  `cellphone` varchar(64)  DEFAULT NULL COMMENT '手机电话',
  `email` varchar(140)  DEFAULT NULL COMMENT '邮箱',
  `minapp` varchar(140)  DEFAULT NULL COMMENT '微信小程序 图片',
  `wxapp` varchar(140)  DEFAULT NULL COMMENT '微信公众号 图片',
  `icp` varchar(140)  DEFAULT NULL COMMENT '微信公众号 图片',
  `copyright` varchar(140)  DEFAULT NULL COMMENT '版权信息',
  `seoTitle` varchar(128)   COMMENT 'seo title',
  `seoDesc` varchar(140)  COMMENT 'seo title',
  `seoKeywords` varchar(128)   COMMENT 'seo description',
  `modifyTime` timestamp  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `createTime` timestamp default CURRENT_TIMESTAMP COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='网站';




-- ----------------------------
--  Table structure for `message` message
-- ----------------------------

DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` INT    COMMENT '用户ID ',
  `userName` VARCHAR(32) NOT NULL  COMMENT '姓名',
  `email` varchar(128)  NOT NULL COMMENT '名称',
  `phone` varchar(32)  NOT NULL COMMENT '手机号',
  `content` text  COMMENT '内容',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态 -1 删除 0 未处理 1 已处理 ',
  `note` varchar(140)  DEFAULT NULL COMMENT '处理结果',
  `handlerId`  int  COMMENT '处理人iD',
  `handlerName`  varchar(32)    COMMENT '处理结果',
  `modifyTime` timestamp  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `createTime` timestamp default CURRENT_TIMESTAMP COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='消息';


-- ----------------------------
--  Table structure for `link` 友情链接
-- ----------------------------

DROP TABLE IF EXISTS `link`;
CREATE TABLE `link` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64)   COMMENT '名称',
  `url` varchar(140)   COMMENT 'url',
  `pic` varchar(140)  COMMENT 'pic',
  `note` varchar(140)   COMMENT '备注',
  `sortNum` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
 `modifyTime` timestamp  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `createTime` timestamp default CURRENT_TIMESTAMP COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='友情链接';




-- ----------------------------
--  Table structure for `manager` 管理员信息
-- ----------------------------
DROP TABLE IF EXISTS `manager`;
CREATE TABLE `manager` (
  `id` INT UNSIGNED AUTO_INCREMENT ,
  `phone` varchar(20) not null COMMENT '用户的手机号',
  `name` VARCHAR(64) NOT NULL DEFAULT '唢呐' COMMENT '用户昵称',
  `avatar` VARCHAR(128) NOT NULL DEFAULT "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif" COMMENT '用户昵称',
  `password` varchar(64) not null COMMENT '用户手机号登录是的密码' ,
  `email` VARCHAR(128)  COMMENT '邮箱',
  `status` TINYINT not NULL  DEFAULT  1 COMMENT  '用户状态 0 冻结 1 正常 ',
  `sex` TINYINT not NULL  DEFAULT  1 COMMENT  '用户性别 0 女性 1 男性 ',
  `note` varchar(140)  COMMENT ' 备注',
 `modifyTime` timestamp  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `createTime` timestamp default CURRENT_TIMESTAMP COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理员信息';



