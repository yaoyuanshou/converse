/* 
    该函数是ajax的封装函数
    用解构的方式传入参数
    method 为请求方式（get、post）
    url 为跳转路径
    data 所需要进行传输的数据
    success 执行成功的回调函数
    error   执行失败的回调函数
*/
function ajax({ method = "get", url, data, success, error }) {
    //创建ajax
    var xhr = null;

    try {
        xhr = new XMLHttpRequest();
    } catch (error) {
        xhr = ActiveXObject("Microsoft.XMLHTTP");
    }
    if (data) {
        data = queryString(data);
    }

    //调用open方法
    if (method == "get" && data) {
        url += "?" + data;
    }
    xhr.open(method, url, true);

    if (method == "get") {
        xhr.send();
    } else {
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (success) {
                    success(xhr.responseText);
                }
            } else {
                if (error) {
                    error("ERROR:" + xhr.status);
                }
            }
        }
    }
}


//以对象的方式去进行遍历拼接数据
function queryString(obj) {
    var str = "";
    for (var attr in obj) {
        str += attr + "=" + obj[attr] + "&";
    }
    return str.substring(0, str.length - 1);
}







