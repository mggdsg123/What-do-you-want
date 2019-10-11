$('#userForm').on('submit', function() {
    // 获取表单中的内容并将其转化为字符串
    var formData = $(this).serialize();

    // 发送请求
    $.ajax({
            type: 'post',
            url: '/users',
            data: formData,
            success: function() {
                location.reload()
            },
            error: function() {
                alert('用户添加失败')
            }
        })
        // 阻止表单的默认提交行为
    return false;
});
//当用户选择文件的时候,头像上传功能
$('#avatar').on('change', function() {
    // 用户选择的文件
    // this.file[0]
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            // 头像预览功能
            $('#preview').attr('src', response[0].avatar)
            $('#hiddenAvatar').val(response[0].avatar)
        }
    })
});
// 展示页面
$.ajax({
        type: 'get',
        url: '/users',
        success: function(response) {
            var html = template('userTpl', { data: response });
            $('#userBox').html(html);
        }
    })
    //删除功能
    // - 为删除按钮添加点击事件
$('#userBox').on('click', '.delete', function() {
    // - 确认用户是否进行删除操作
    if (confirm('确定要删除吗？')) {
        // - 获取到当前被点击的用户的id
        var id = $(this).attr('data-id')
            // - 调用删除用户接口，根据id删除用户，如果删除功能，刷新当前页面，让页面显示最新的内容
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function() {
                location.reload()
            }

        })
    }

})