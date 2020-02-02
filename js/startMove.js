
    /* 
        所有动画都可以在此基础上进行完成
        其中speed的数字可以进行自定义
        定时器的毫秒数可以进行自定义
    */
//node为需要运动的动画节点， cssObj为需要变化的属性（对象）,complete为回调函数
function startMove(node, cssObj, complete) {
    clearInterval(node.timer);
    node.timer = setInterval(function () {
        //假设到达目的值
        var isEnd = true;
        //遍历需要变化的css属性对象
        for (var cssStyle in cssObj) {
            //目标值
            var iTarget = cssObj[cssStyle];
            //获取当前样式值(icur)并判断透明属性
            var icur = null;
            if (cssStyle == "opacity") {
                icur = parseInt(parseFloat(getStyle(node, cssStyle)) * 100);
            } else {
                icur = parseInt(getStyle(node, cssStyle));
            }

            //计算速度(数字自定义)
            var speed = (iTarget - icur) / 7;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            //样式处理
            if (cssStyle == "opacity") {
                icur += speed;
                node.style.opacity = icur / 100;
                node.style.filter = `filter: alpha(opacity=${icur})`;
            } else {
                node.style[cssStyle] = icur + speed + "px";
            }
        }

        //动画不到达目的值后，isEnd为false
        if (icur != iTarget) {
            isEnd = false;
        }

        //所有动画到达目的值后，才可以关闭定时器
        if (isEnd) {
            clearInterval(node.timer);
            //判断complete回调函数是否存在
            if (complete) {
                complete.call(node);
            }
        }
    }, 40)
}

//获取当前有效样式的兼容函数
function getStyle(node, cssStyle) { //node为元素节点，cssStyle元素样式
    return node.currentStyle ? node.currentStyle[cssStyle] : getComputedStyle(node)[cssStyle];
}