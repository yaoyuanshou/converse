//冒泡排序
function bubbleSort(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = 0; j < arr.length - (i + 1); j++) {
            //前后两两进行比较
            if (arr[j] > arr[j + 1]) {
                var tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp
            }
        }
    }

}

//选择排序
function changeSort(arr) {
    //选出擂台
    for (var i = 0; i < arr.length - 1; i++) {
        //和后面所有数进行比较
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                var tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
        }
    }
}

//数组元素去重
function noRepeat(arr) {
    //选出要比较的数。
    for (var i = 0; i < arr.length - 1; i++) {
        //被比较的数
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
                arr.splice(j, 1);
                j--;
            }
        }
    }
}

//倒序数组元素去重
function noRepeatDesc(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        for (var j = i - 1; j >= 0; j--) {
            if (arr[i] === arr[j]) {
                arr.splice(j, 1);
            }
        }
    }
}

//数字验证码
function codeOfnum(n) {
    //n为生成验证码的位数
    var arr = [];
    for (var i = 0; i < n; i++) {
        var tmp = parseInt(Math.random() * 10);
        arr.push(tmp);
    }
    return arr.join("");
}

//数字 字母验证码
function codeOfWord(n) {
    //n为生成的验证码位数
    var arr = [];
    for (var i = 0; i < n; i++) {
        var tmp = parseInt(Math.random() * 123);
        if (tmp >= 0 && tmp <= 9) {
            arr.push(tmp);
        } else if (tmp >= 97 && tmp <= 122 || tmp >= 65 && tmp <= 90) {
            arr.push(String.fromCharCode(tmp));
        } else {
            //没有用的数字
            i--;
        }
    }
    return arr.join("");
}

//显示当前时间
function showTime() {
    var date = new Date();

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var week = date.getDay();
    week = numChangeChinese(week);

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    hours = double(hours);
    minutes = double(minutes);
    seconds = double(seconds);

    var str = year + "年" + month + "月" + day + "日 星期" + week + " " + hours + ":" + minutes + ":" + seconds;
    return str;
}
//将星期转换为汉字
function numChangeChinese(num) {
    var arr = ["日", "一", "二", "三", "四", "五", "六"];
    return arr[num];
}
//将秒转换为两位数
function double(num) {
    if (num < 10) {
        return "0" + num;
    } else {
        return num;
    }
}

//自定义通过class获取元素节点的兼容函数
function byClassName(node, classStr) { //node为元素节点，classStr为class名字
    var nodes = node.getElementsByTagName("*");
    var arr = [];
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].className === classStr) {
            arr.push(nodes[i]);
        }
    }
    return arr;
}

//获取当前有效样式的兼容函数
function getStyle(node, cssStyle) { //node为元素节点，cssStyle元素样式
    return node.currentStyle ? node.currentStyle[cssStyle] : getComputedStyle(node)[cssStyle];
}

//随机颜色函数
function randomColor() {
    var str = "rgba(" + parseInt(Math.random() * 256) + ", " + parseInt(Math.random() * 256) + ", " + parseInt(Math.random() * 256) + ", 1)";
    return str;
}

//阻止事件冒泡的浏览器兼容
function stopBubble(ev) {
    if (ev.stopPropagation) {
        ev.stopPropagation();
    } else {
        ev.cancleBubble = true;
    }
}

//元素拖拽进行函数封装
function drag(node) {
    //鼠标按下
    node.onmousedown = function (ev) {
        var e = ev || window.event;
        //鼠标和元素的坐标差
        var offsetX = e.clientX - node.offsetLeft;
        var offsetY = e.clientY - node.offsetTop;
        //鼠标移动
        document.onmousemove = function (ev) {
            var e = ev || window.event;
            //目标元素的top和left
            node.style.left = e.clientX - offsetX + 'px';
            node.style.top = e.clientY - offsetY + 'px';
        }
    }
    //鼠标抬起
    document.onmouseup = function () {
        document.onmousemove = null;
    }
}

//拖拽限制元素出界的函数封装
function limitDrag(node){
    node.onmousedown = function(ev){
        var e = ev || window.event;
        var offsetX = e.clientX - node.offsetLeft;
        var offsetY = e.clientY - node.offsetTop;

        document.onmousemove = function(ev){
            var e = ev || window.event;
            var l = e.clientX - offsetX;
            if(l <= 0){
                l = 0;
            }
            var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
            if(l >= windowWidth - node.offsetWidth){
                l = windowWidth - node.offsetWidth;
            }
            

            var t = e.clientY - offsetY;
            if(t <= 0){
                t = 0;
            }
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            if(t >= windowHeight - node.offsetHeight){
                t = windowHeight - node.offsetHeight;
            }

            node.style.left = l + 'px';
            node.style.top = t + 'px';
        }
    }

    document.onmouseup = function(){
        document.onmousemove = null;
    }
}


//浏览器阻止默认行为的兼容函数封装
function preDef(ev){
    if(ev.preventDefault){
        ev.preventDefault;
    }else{
        window.event.returnValue = false;
    }
}

//浏览器添加事件监听器兼容函数封装
function addEvent(node, eventType, funcName){
    if(node.addEventListener){
        node.addEventListener(eventType, funcName, false);
    }else{
        node.attachEvent("on" + eventType, funcName);
    }
}
//浏览器移除事件监听器兼容函数封装
function removeEvent(node, eventType, funcName){
    if(node.removeEventListener){
        node.removeEventListener(eventType, funcName);
    }else{
        node.detachEvent("on" + eventType, funcName);
    }
}