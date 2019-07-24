/**
 @Name:管理员管理
 */


layui.define(['table', 'form', 'element'], function (exports) {
  var $ = layui.$,
    admin = layui.admin,
    view = layui.view,
    table = layui.table,
    form = layui.form,
    setter = layui.setter,
    element = layui.element;


  //列表table render
  admin.table({
    elem: "#LAY-link-list",
    url: '/admin/link/list',
    cols: [
      [{
        type: 'checkbox',
        fixed: 'left'
      }, {
        field: 'id',
        width: 80,
        title: 'ID',
        sort: true
      }, {
        field: 'name',
        title: '名称'
      }, {
        field: 'url',
        title: '网址'
      }, {
        field: 'sortNum',
        title: '排序'
      }, {
        field: 'pic',
        title: '网站logo',
        templet: '#picTpl',
      }, {
        field: 'note',
        title: '备注'
      }, {
        title: '操作',
        width: 150,
        align: 'center',
        fixed: 'right',
        toolbar: '#LAY-link-operator'
      }]
    ]
  })



  //监听工具条
  table.on('tool(LAY-link-list)', function (obj) {
    var data = obj.data;
    if (obj.event === 'del') {
      layer.confirm('确定要删除吗？', function (index) {
        var id = data.id
        admin.req({
          url: setter.request.host + '/admin/link/delete',
          method: "post",
          data: {
            id: id
          },
          done: function (res) {
            console.log(res)
            obj.del();
            layer.close(index);
            //  table.reload("LAY-link-list");
          }
        })

      });
    } else if (obj.event === 'edit') {
      admin.popup({
        title: '编辑',
        area: ['420px', '450px'],
        id: 'LAY-popup-link-edit',
        success: function (layero, index) {
          view(this.id).render('system/editLink', data).done(function () {
            form.render(null, 'LAY-link-edit');
            //监听提交
            form.on('submit(LAY-link-edit)', function (data) {
              var link = data.field; //获取提交的字段

              //提交 Ajax 成功后，关闭当前弹层并重载表格
              admin.req({
                url: setter.request.host + '/admin/link/edit',
                method: "post",
                data: link,
                done: function (res) {
                  console.log(res)

                  table.reload('LAY-link-list'); //重载表格
                  layer.close(index); //执行关闭 

                }
              })

            });
          });
        }
      });
    }
  });




  // 增加
  $("#LAY-link-add").on("click", function () {
    admin.popup({
      title: '添加友情链接',
      area: ['420px', '450px'],
      id: 'LAY-popup-link-edit',
      success: function (layero, index) {
        view(this.id).render('system/editLink').done(function () {
          form.render(null, 'LAY-link-edit');

          form.on('submit(LAY-link-edit)', function (data) {
            var link = data.field; //获取提交的字段

            //提交 Ajax 成功后，关闭当前弹层并重载表格
            admin.req({
              url: setter.request.host + '/admin/link/edit',
              method: "post",
              data: link,
              done: function (res) {
                console.log(res)
                //  obj.del();
                table.reload('LAY-link-list'); //重载表格
                layer.close(index); //执行关闭 

              }
            })

          });
        });
      }
    });
  })



  exports('link', {})
});