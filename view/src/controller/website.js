/**

 @Name：layuiAdmin 设置
 @Author：贤心
 @Site：http://www.layui.com/admin/
 @License: LPPL
    
 */

layui.define(['form', 'upload'], function (exports) {
  var $ = layui.$,
    layer = layui.layer,
    setter = layui.setter,
    admin = layui.admin,
    form = layui.form,
    upload = layui.upload;


  admin.req({
    url: setter.request.host + '/admin/site/detail',
    method: "get",
    data: {
      id: 1
    },
    done: function (res) {
      form.render();
      form.val("LAY-website", res.data)

    }
  });




  //上传头像
  var avatarSrc = $('#LAY_avatarSrc');
  var wxappSrc = $('#LAY_wxappSrc');
  var minappSrc = $('#LAY_minappSrc');



  upload.render({
    url: setter.request.host + '/admin/upload',
    headers: {
      "token": layui.data(setter.tableName)[setter.request.tokenName]
    },
    elem: '#LAY_avatarUpload',
    done: function (res) {

      console.log(res)

      if (res.code == 200) {
        avatarSrc.val(res.data.src);
      } else {
        layer.msg(res.msg, {
          icon: 5
        });
      }
    }
  });
  upload.render({
    url: setter.request.host + '/admin/upload',
    headers: {
      "token": layui.data(setter.tableName)[setter.request.tokenName]
    },
    elem: '#LAY_wxappUpload',
    done: function (res) {

      console.log(res)

      if (res.code == 200) {
        avatarSrc.val(res.data.src);
      } else {
        layer.msg(res.msg, {
          icon: 5
        });
      }
    }
  });
  upload.render({
    url: setter.request.host + '/admin/upload',
    headers: {
      "token": layui.data(setter.tableName)[setter.request.tokenName]
    },
    elem: '#LAY_minappUpload',
    done: function (res) {

      console.log(res)

      if (res.code == 200) {
        avatarSrc.val(res.data.src);
      } else {
        layer.msg(res.msg, {
          icon: 5
        });
      }
    }
  });

  //查看头像
  admin.events.avatarPreview = function (othis) {
    var src = avatarSrc.val();
    layer.photos({
      photos: {
        "title": "查看头像" //相册标题
          ,
        "data": [{
          "src": src //原图地址
        }]
      },
      shade: 0.01,
      closeBtn: 1,
      anim: 5
    });
  };

  admin.events.minappPreview = function (othis) {
    var src = minappSrc.val();
    layer.photos({
      photos: {
        "title": "查看" //相册标题
          ,
        "data": [{
          "src": src //原图地址
        }]
      },
      shade: 0.01,
      closeBtn: 1,
      anim: 5
    });
  };
  admin.events.wxappPreview = function (othis) {
    var src = wxappSrc.val();
    layer.photos({
      photos: {
        "title": "查看" //相册标题
          ,
        "data": [{
          "src": src //原图地址
        }]
      },
      shade: 0.01,
      closeBtn: 1,
      anim: 5
    });
  };

  //网站设置
  form.on('submit(LAY-website)', function (obj) {

    //提交修改

    admin.req({
      url: setter.request.host + '/admin/site/edit',
      method: 'post',
      data: obj.field,
      done: function () {
        form.render()
        layer.msg("提交成功")
      }
    });


  });





  //对外暴露的接口
  exports('website', {});
});