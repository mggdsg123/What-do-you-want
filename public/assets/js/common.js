// 退出功能
// 给退出按钮注册点击事件
$('#logout').on('click', function() {
    // 判断用户是否确认退出
    var isconfirm = confirm('确定要退出吗？')
    if (isconfirm) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function() {
                location.href = 'login.html'
            },
            error: function() {
                alert('退出失败')
            }
        })
    }
})