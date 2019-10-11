// - 为表单中每一个表单项添加 name 属性，name 属性的值要和接口文档中要求的参数名称保持一致
// - 为表单添加表单提交事件，在事件处理函数中，
$('#addCategory').on('submit', function() {
        // - 获取到用户在表单中输入的内容
        var formData = $(this).serialize();
        // - 调用分类添加接口，实现添加分类功能
        $.ajax({
                type: 'post',
                url: '/categories',
                data: formData,
                success: function() {
                    location.reload();
                }
            })
            // 阻止表单提交的默认行为
        return false;
    })
    // 展示页面
    // 发送请求获取数据
$.ajax({
        type: 'get',
        url: '/categories',
        success: function(response) {
            var html = template('categoryListTpl', { data: response });
            $('#categoriesBox').html(html);
        }
    })
    // 修改分类数据
    // 为编辑按钮添加点击事件
$('#categoriesBox').on('click', '.edit', function() {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'get',
            url: '/categories/' + id,
            success: function(response) {
                var html = template('modifyCategoryTpl', response);
                $('#formBox').html(html);
            }
        })
    })
    // 给修改按钮添加提交事件
$('#formBox').on('submit', '#modifyCategory', function() {
        var formData = $(this).serialize();
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'put',
            url: '/categories/' + id,
            data: formData,
            success: function() {
                location.reload();
            }
        })
        return false;
    })
    // 删除分类
$('#categoriesBox').on('click', '.delete', function() {
    if (confirm('确定删除吗？')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function() {
                location.reload();
            }
        })
    }

})