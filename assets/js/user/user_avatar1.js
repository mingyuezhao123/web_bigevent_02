var $image = $('#image');
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}
$image.cropper(options)

$('#btnChooseImage').on('click', function() {
    $('#file').click();
})
var layer = layui.layer;
$('#file').on("change", function(e) {
    // change就是事件源的value值发生改变的时候触动
    // 获取用户选择的文件
    var filelist = e.target.files;
    if (filelist.length === 0) {
        return layer.msg('请选择照片!')
    }
    var file = e.target.files[0];
    // 将文件转换为路径
    var imgURL = URL.createObjectURL(file)
        // 重新初始化裁剪区域
    $image
        .cropper('destroy') // 销毁旧的裁剪区域
        .attr('src', imgURL) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域

})

// 创建一个 Canvas 画布，将 Canvas 画布上的内容，转化为 `base64` 格式的字符串
$('#btnUpload').on('click', function() {
    var dataURL = $image
        .cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')
        // 把头像上传到服务器
    $.ajax({
        method: 'post',
        url: '/my/update/avatar',
        data: {
            avatar: dataURL
        },
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('更换头像失败!')
            }
            layer.msg('更换头像成功!')
            window.parent.getUserInfo()

        }
    })

})