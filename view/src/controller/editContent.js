layui.define(['admin', 'form', 'upload'], function (exports) {

    var $ = layui.$,
        admin = layui.admin,
        element = layui.element,
        layer = layui.layer,
        setter = layui.setter,
        upload = layui.upload,

        form = layui.form;






    // 判断是编辑 or 新增
    var id = layui.router().search.id;
    if (id) {
        admin.req({
            url: setter.request.host + '/admin/medium/show',
            method: "get",
            data: {
                id: id
            },
            done: function (res) {
                form.render();
                var cate1Option = '<option value="' + res.data.firstCateId + '" selected>' + res.data.firstCateName + '</option>'
                var cate2Option = '<option value="' + res.data.secondCateId + '" selected>' + res.data.secondCateName + '</option>'
                $("#LAY-firstCateId").append(cate1Option)
                $("#LAY-secondCateId").append(cate2Option)

                //  editor.txt.html(res.data.content)
                form.val("LAY-medium-edit", res.data)
            }
        })

    } else {
        form.render();
    }


    /* 处理头图 */
    var avatarSrc = $('#LAY_avatarSrc');

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

    admin.events.avatarPreview = function (othis) {
        var src = avatarSrc.val();
        layer.photos({
            photos: {
                "title": "查看头图", //相册标题
                "data": [{
                    "src": src //原图地址
                }]
            },
            shade: 0.01,
            closeBtn: 1,
            anim: 5
        });
    };





    /* 表单处理 */
    form.render();

    /* 自定义验证规则 */
    form.verify({
        name: function (value) {
            if (value.length < 3) {
                return '标题至少得3个字符啊';
            }
        },
        content: function (value) {
            //  layedit.sync(editor);
        }
    });


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


    /* 监听提交 */
    form.on('submit(LAY-medium-submit)', function (obj) {

        // var content = editor.txt.html()

        var medium = obj.field;
        medium['firstCateName'] = firstCateName;
        medium['secondCateName'] = secondCateName;
        //  medium['content'] = content
        console.log("medium", medium)
        layer.msg("提交成功")
        //提交修改
        admin.req({
            url: setter.request.host + '/admin/medium/edit',
            method: 'post',
            data: medium,
            done: function () {
                form.render()
                layer.msg("提交成功")
            }
        });


    });

    //对外暴露的接口
    exports('editContent', {});
});
