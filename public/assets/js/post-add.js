// - 获取文章分类数据，并将数据显示在所属分类的下拉列表中，供管理员选择
$.ajax({
        type: 'get',
        url: '/categories',
        success: function(response) {
            console.log(response);
            var html = template('categoryTpl', { data: response })
            $('#category').html(html);
        }

    })
    // - 实现文章封面图片上传，并将上传后的图片地址保存在一个隐藏域中
$('#feature').on('change', function() {
        var file = this.files[0];
        // 创建formData对象
        var formData = new FormData();
        formData.append('cover', file);
        $.ajax({
            type: 'post',
            url: '/upload',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                console.log(response);
                $('#thumbnail').val(response);
            }
        })
    })
    // - 为添加文章表单中的每一个表单项添加name属性，并且name属性值要和接口中要求的参数名称一致

// - 为添加文章列表绑定表单提交事件，
$('#addForm').on('submit', function() {
    // - 获取到管理员在表单中输入的内容
    var formData = $(this).serialize();

    // - 向服务器端发送添加文章的请求，实现文章添加功能，文章添加成功以后要跳转到文章列表页面
    $.ajax({
            url: '/posts',
            type: 'post',
            data: formData,
            success: function() {
                location.href = '/admin/posts.html'
            }
        })
        // 在事件处理函数中阻止表单默认提交的行为
    return false;
})