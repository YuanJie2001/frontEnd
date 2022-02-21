<template>
  <div id="panel"/>
</template>

<script>
export default {
  name: 'MouseMove',
  methods: {
    mouseMove(e) {
      //这里获取元素节点
      let oPanel = document.getElementById('panel')
      let oSpan = document.createElement(`span`)
      //浏览器兼容
      e = e || window.Event
      // let x = e.clientX
      // let y = e.clientY
      //获取相关参数
      oSpan.style.left = e.clientX + `px`
      oSpan.style.top = e.clientY - 50 + `px`
      //设定随机数存储在size中
      let size = Math.random() * 20
      //给节点赋值参数数值
      oSpan.style.width = 5 + size + `px`
      oSpan.style.height = 5 + size + `px`
      // 在body中添加span标签
      oPanel.appendChild(oSpan)
      // 设置定时器 间隔时间为2000毫秒
      setTimeout(() => {
        //清除ospan节点
        oSpan.remove()
      }, 1000)
    },
  },
  mounted() {
    // 这里是给整个页面添加了一个鼠标移动的监听事件 e为事件对象
    document.addEventListener(`mousemove`, this.mouseMove)
  },
  beforeDestroy() {
    document.removeEventListener(`mousemove`, this.mouseMove)
  },
}
</script>

<style lang='less'>
#panel {
  height: 100vh;
  width: 100%;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  //块元素都有鼠标移入事件；当经过两块元素交集处，则层级高德移入事件会被层级低的移入事件覆盖；导致，层级高的移入事件无效；
  //
  //期望：
  //
  //层级高的鼠标移入事件等级高于层级低的鼠标移入事件；
  //
  //做法：
  //
  //为被遮挡元素上层使用z-index属性的元素添加以下样式：
  z-index: 999;
  pointer-events: none;
  span {
    width: 10px;
    height: 10px;
    background: #55b9f3;
    border-radius: 50%;
    position: absolute;
    box-shadow: 5px 5px 15px #489dcf, -5px -5px 15px #62d5ff;
    animation: blow 4s linear infinite;
    -webkit-animation: blow 4s linear infinite;
  }
}
/*这里是定义里一个动画效果*/

@keyframes blow {
  0% {
    transform: translate(-50%, -50%);
    /*这里是定义初始透明度为1*/
    opacity: 1;
    /*
这里是初始滤镜效果
给图像应用色相旋转。"angle"一值设定图像会被调整的色环角度值。
值为0deg，则图像无变化。若值未设置，默认值是0deg。
该值虽然没有最大值，超过360deg的值相当于又绕一圈。
*/
    filter: hue-rotate(0deg);
    /*这里是浏览器兼容*/
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
  }

  100% {
    /*
2D转化
这里是从自身向上平移
*/
    transform: translate(-50%, -1000%);
    /*这里是定义结束时透明度为0*/
    opacity: 0;
    /*
这里是结束滤镜效果
给图像应用色相旋转。"angle"一值设定图像会被调整的色环角度值。
值为0deg，则图像无变化。若值未设置，默认值是0deg。
该值虽然没有最大值，超过360deg的值相当于又绕一圈。
*/
    filter: hue-rotate(720deg);
    /*这里是浏览器兼容*/
    -webkit-transform: translate(-50%, -1000%);
    -moz-transform: translate(-50%, -1000%);
    -ms-transform: translate(-50%, -1000%);
    -o-transform: translate(-50%, -1000%);
    -webkit-filter: hue-rotate(720deg);
  }
}
</style>
