/**
 @Name:管理员管理
 */


layui.define(['table', 'form', 'element'], function (exports) {
  var $ = layui.$,
    admin = layui.admin,
    view = layui.view,
    table = layui.table,
    form = layui.form,
    setter = layui.setter;


  layui.use("treetable", function () {
    var $ = layui.$,
      table = layui.table,
      layer = layui.layer,
      treetable = layui.treetable;
    layer.load(2);
    treetable.render({
      treeColIndex: 1,
      treeSpid: -1,
      treeIdName: 'authorityId',
      treePidName: 'parentId',
      elem: '#LAY-category-list',
      url: setter.request.host + '/admin/category/list',
      page: false,
      cols: [
        [{
            type: 'checkbox',
            fixed: 'left'
          }, {
            field: 'id',
            width: 80,
            title: 'ID',
            sort: true
          },
          {
            field: 'name',
            minWidth: 200,
            title: '权限名称'
          },

          {
            field: 'sortNum',
            width: 80,
            align: 'center',
            title: '排序号'
          },
          {
            title: '操作',
            width: 150,
            align: 'center',
            fixed: 'right',
            toolbar: '#table-manager-operate'
          }
        ]
      ],
      done: function () {
        layer.closeAll('loading');
      }
    });

  })
  exports('category', {})
});