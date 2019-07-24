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
    element = layui.element;  // 折叠筛选面板
  element.render('collapse');

  //筛选form render

  form.render(null, 'LAY-medium-filter');
  //列表table render
  admin.table({
    elem: "#LAY-medium-list",
    url: '/admin/medium/list',
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
        field: 'firstCateName',
        title: '分类1'
      }, {
        field: 'secondCateName',
        title: '分类2'
      }, {
        field: 'name',
        title: '标题'
      }, {
        field: 'pic',
        title: '头图',
        templet: '#picTpl',
      }, {
        field: 'readNum',
        title: '浏览数'
      }, {
        field: 'sortNum',
        title: '排序'
      },
      {
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
        toolbar: '#LAY-medium-operate'
      }
      ]
    ]
  })

  var categories = new Array();

  admin.req({
    url: setter.request.host + '/admin/category/list',
    method: "get",
    done: function (res) {
      categories = res.data
      var options = ""
      categories.forEach(e => {
        if (e.pid === 0) {
          options += '<option value="' + e.id + '">' + e.name + '</option>'
        }
      })

      $("#LAY-firstCateId").append(options)
      form.render('select')
    }
  })


  // 分类联动
  var firstCateName = ""
  form.on('select(LAY-firstCateId)', function (data) {
    var parentId = data.value
    console.log("parentId", parentId)
    if (parentId == "") {
      layer.alert("请选择分类")
    } else {
      var options = "";
      categories.forEach(e => {

        if (e.id == Number.parseInt(parentId)) {
          firstCateName = e.name
        }
        if (e.pid == Number.parseInt(parentId)) {
          options += '<option value="' + e.id + '">' + e.name + '</option>'
        }
      })
      console.log("options", options)
      $("#LAY-secondCateId").append(options)
      form.render('select')
    }
  })
  // 二级联动监听
  var secondCateName = ""
  form.on('select(LAY-secondCateId)', function (data) {
    var firstCateId = $("#LAY-firstCateId").val()
    var secondCateId = data.value
    console.log("firstCateId", firstCateId)
    if (firstCateId == "") {
      layer.alert("请选择一级分类")
    } else {
      categories.forEach(e => {
        if (e.id === Number.parseInt(secondCateId)) {
          secondCateName = e.name
        }
      })
    }
  })

  //监听筛选
  form.on('submit(LAY-medium-filter)', function (data) {
    var field = data.field;
    //执行重载
    table.reload("LAY-medium-list", {
      where: field
    })
  });

  //监听工具条
  table.on('tool(LAY-medium-list)', function (obj) {
    var data = obj.data;
    if (obj.event === 'del') {
      layer.confirm('确定要删除吗？', function (index) {
        var id = data.id
        admin.req({
          url: setter.request.host + '/admin/medium/delete',
          method: "post",
          data: {
            id: id
          },
          done: function (res) {
            console.log(res)
            obj.del();
            layer.close(index);
            table.reload("LAY-medium-list");
          }
        })

      });
    }
  });








  exports('medium', {})
});