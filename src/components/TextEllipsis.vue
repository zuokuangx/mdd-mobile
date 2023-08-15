<template>
  <div class="text-ellipsis-wrapper">
    <div class="test1" v-if="threeline">{{ info }}</div>
    <div class="text" :class="textClass" :style="textStyleObject" v-else>
      <label class="btn" @click="showall = !showall"></label>
      {{ info }}
    </div>
  </div>
</template>
<script>
import { throttle } from '@/utils/throttle.js'
export default {
  name: 'DpTextEllipsis',
  props: {
    info: {
      type: String,
      default: ''
    },
    lineClamp: {
      type: Number,
      default: 3
    },
    hiddenBtn: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showall: false,
      threeline: false
    }
  },
  computed: {
    textStyleObject () {
      return {
        'max-height': this.showall ? 'none' : `${this.lineClamp * 18 / 37.5}rem`
      }
    },
    textClass () {
      let cls = this.showall ? 'showall' : ''
      cls = cls + (this.hiddenBtn ? ' hidden-btn' : '')
      return cls
    }
  },
  watch: {
    info () {
      this.showall = false
    }
  },
  mounted () {
    this.showthreeline(this.info)
    window.onresize = () => { throttle(this.showthreeline, 500)(); window.location.reload() }
  },
  methods: {
    showthreeline (text) {
      const div = document.createElement('div')
      div.style.visibility = 'hidden'
      div.style.position = 'absolute'
      const contentWidth = window.getComputedStyle(document.getElementsByClassName('text-ellipsis-wrapper')[0]).width
      const wrapper = document.getElementsByClassName('text-ellipsis-wrapper')[0]
      div.style.width = contentWidth
      div.innerText = text
      wrapper.appendChild(div)
      div.style.fontSize = '0.32rem'
      div.style.height = '1.44rem'
      console.log('div.clientHeight', div.clientHeight, 'div.scrollHeight', div.scrollHeight, 'div', div)
      if (div.clientHeight < div.scrollHeight) {
        this.threeline = false
        console.log('true')
      } else {
        this.threeline = true
        console.log('false')
      }
    }

  }
}
</script>
<style lang="less">
@w:37.5;
.text-ellipsis-wrapper {
  display: flex;
  // margin: 6rem/@w 0 18rem/@w 0;
  // height: 18rem/@w;
  overflow: hidden;
  font-size: 12rem/@w;
  line-height: 18rem/@w;
  .text1{
    white-space: nowrap;
  }
  .text {
    position: relative;
    overflow: hidden;
    // line-height: ;
    text-align: justify;
    text-overflow: ellipsis;
    word-break: break-all;
    transition: 0.3s max-height;
  }
  .text::before {
    float: right;
    height: calc(~'100% - 0.47rem');
    content: '';
  }
  .text::after {
    position: absolute;
    width: 999vw;
    height: 999vw;
    margin-left: -100rem/@w;
    // box-shadow: inset calc(100rem/@w - 999vw) calc(30rem/@w - 999vw) 0 0 #fff;
    content: '';
  }
  .btn {
    position: relative;
    float: right;
    clear: both;
    margin-left: 10rem/@w;
    font-size: 12rem/@w;
    color: #34b7b9;
    line-height: 18rem/@w;
    border-radius: 4rem/@w;
    cursor: pointer;
    z-index: 10;
  }
  .btn::after {
    /* stylelint-disable-next-line */
    content: '【展开】';
  }

  .text.showall {
    max-height: none;
  }
  .text.showall .btn::before {
    visibility: hidden;
  }
  .text.showall .btn::after {
    visibility: hidden;
  }
  .text.showall.hidden-btn .btn::after {
    content: '【收起】';
    visibility: visible;
  }
  .btn::before {
    position: absolute;
    left: 1rem/@w;
    color: #333;
    transform: translateX(-100%);
    content: '...';
  }
}
</style>
