/**
 @Name:message
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
  form.render(null, 'LAY-message-filter');
  //列表table render
  admin.table({
    elem: "#LAY-message-list",
    url: '/admin/message/list',
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
          field: 'userName',
          title: '用户名称'
        }, {
          field: 'phone',
          title: '手机'
        }, {
          field: 'email',
          title: '邮箱'
        }, {
          field: 'content',
          title: '留言内容'
        },
        {
          field: 'createTime',
          title: '留言时间',
          sort: true
        }, {
          field: 'status',
          title: '状态',
          templet: '#statusTpl',
          minWidth: 80,
          align: 'center'
        },
        {
          field: 'note',
          title: '处理内容'
        }, {
          title: '操作',
          width: 150,
          align: 'center',
          fixed: 'right',
          toolbar: '#table-message-operate'
        }
      ]
    ]
  })


  //监听筛选
  form.on('submit(LAY-message-filter)', function (data) {
    var field = data.field;
    //执行重载
    table.reload("LAY-message-list", {
      where: field
    })
  });

  //监听工具条
  table.on('tool(LAY-message-list)', function (obj) {
    var id = obj.data.id;
    if (obj.event === 'del') {
      layer.confirm('确定删除此留言？', function (index) {

        console.log("id", id)
        admin.req({
          url: setter.request.host + '/admin/message/delete',
          method: "post",
          data: {
            id: id
          },
          done: function (res) {
            console.log(res)
            obj.del();
            layer.close(index);
          }
        })

      });
    } else if (obj.event === 'edit') {
      var id = obj.data.id
      layer.prompt({
        formType: 2,
        value: '已处理', //初始时的值，默认空字符
        maxlength: 140, //可输入文本的最大长度，默认500
        title: '处理结果'
      }, function (value, index) {

        console.log("value", value, id)
        layer.close(index);
        admin.req({
          url: setter.request.host + '/admin/message/handle',
          method: "post",
          data: {
            id: id,
            note: value
          },
          done: function (res) {
            console.log(res)
            // obj.del();
            layer.close(index);
            table.reload("LAY-message-list")
          }
        })

      });


    }
  });





  exports('message', {})
});