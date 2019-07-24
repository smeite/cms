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
  // 折叠筛选面板
  element.render('collapse');

  //筛选form render
  form.render(null, 'LAY-manager-filter');
  //列表table render
  admin.table({
    elem: "#LAY-manager-list",
    url: '/admin/manager/list',
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
        title: '姓名'
      }, {
        field: 'phone',
        title: '手机'
      }, {
        field: 'email',
        title: '邮箱'
      }, {
        field: 'sex',
        title: '性别',
        templet: '#sexTpl',
      }, {
        field: 'lastVisitTime',
        title: '加入时间',
        sort: true
      }, {
        field: 'status',
        title: '状态',
        templet: '#statusTpl',
        minWidth: 80,
        align: 'center'
      }, {
        title: '操作',
        width: 150,
        align: 'center',
        fixed: 'right',
        toolbar: '#table-manager-operate'
      }]
    ]
  })


  //监听筛选
  form.on('submit(LAY-manager-filter)', function (data) {
    var field = data.field;
    //执行重载
    table.reload("LAY-manager-list", {
      where: field
    })
  });

  //监听工具条
  table.on('tool(LAY-manager-list)', function (obj) {
    var data = obj.data;
    if (obj.event === 'del') {
      layer.confirm('确定禁用此管理员？', function (index) {
        var ids = data.id
        admin.req({
          url: setter.request.host + '/admin/manager/delete',
          method: "post",
          data: {
            ids: ids
          },
          done: function (res) {
            console.log(res)
            //  obj.del();
            layer.close(index);
            table.reload("LAY-manager-list");
          }
        })

      });
    } else if (obj.event === 'edit') {
      admin.popup({
        title: '编辑管理员',
        area: ['420px', '450px'],
        id: 'LAY-popup-manager-edit',
        success: function (layero, index) {
          view(this.id).render('manager/edit', data).done(function () {
            form.render(null, 'LAY-manager-edit');
            //监听提交
            form.on('submit(LAY-manager-edit)', function (data) {
              var manager = data.field; //获取提交的字段
              console.log("manager", manager)
              //提交 Ajax 成功后，关闭当前弹层并重载表格
              admin.req({
                url: setter.request.host + '/admin/manager/edit',
                method: "post",
                data: {
                  manager: manager
                },
                done: function (res) {
                  console.log(res)
                  //  obj.del();
                  table.reload('LAY-manager-list'); //重载表格
                  layer.close(index); //执行关闭 

                }
              })

            });
          });
        }
      });
    }
  });



  //批量禁用
  $("#LAY-manager-batchForbid").on('click', function () {
    var checkStatus = table.checkStatus('LAY-manager-list'),
      checkData = checkStatus.data; //得到选中的数据
    console.log("check status", checkStatus)
    console.log("check data", checkData)


    if (checkData.length === 0) {
      return layer.msg('请选择数据');
    }
    var ids = checkData.map(e => e.id).join(",")
    console.log(ids, ids)

    layer.confirm('确定禁用此管理员？', function (index) {
      admin.req({
        url: setter.request.host + '/admin/manager/delete',
        method: "post",
        data: {
          ids: ids
        },
        done: function (res) {
          console.log(res)
          // obj.del();
          table.reload('LAY-manager-list');
          layer.close(index);
        }
      })

    });

  })

  // 增加
  $("#LAY-manager-add").on("click", function () {
    admin.popup({
      title: '添加管理员',
      area: ['420px', '450px'],
      id: 'LAY-popup-manager-edit',
      success: function (layero, index) {
        view(this.id).render('manager/add').done(function () {
          form.render(null, 'LAY-manager-edit');

          form.on('submit(LAY-manager-edit)', function (data) {
            var manager = data.field; //获取提交的字段
            console.log("manager", manager)
            //提交 Ajax 成功后，关闭当前弹层并重载表格
            admin.req({
              url: setter.request.host + '/admin/manager/edit',
              method: "post",
              data: {
                manager: manager
              },
              done: function (res) {
                console.log(res)
                //  obj.del();
                table.reload('LAY-manager-list'); //重载表格
                layer.close(index); //执行关闭 

              }
            })

          });
        });
      }
    });
  })



  exports('manager', {})
});