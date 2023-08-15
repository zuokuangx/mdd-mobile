<template>
  <div class="record">
    <div class="type">
      <div class="title">
        <van-icon name="arrow-left" @click="$router.push('/my-index')"/>
        <span>心理疏导记录</span>
      </div>
      <div class="toggleType"> <span :class="{active: type === 1}" @click="toggleType(1)">系统疏导</span> <span @click="toggleType(2)" :class="{active: type === 2}">专题训练</span> </div>
    </div>
    <div class="list" v-if="tableList.length > 0">
      <div class="card" v-for="item in tableList" :key="item.payTime">
        <div class="name">
          <span class="courseName">{{ item.courseName }}</span>
          <span class="tag" :class="getStatus(item.finishStatus).className">{{ getStatus(item.finishStatus).tag }}</span>
        </div>
        <div class="row"><span class="left">购买时间：</span><span class="right">{{DateFormat({date: item.payTime * 1000, format: 'yyyy-MM-dd hh:mm'})}}</span></div>
        <div class="row" v-if="item.thought">
          <span class="left">想法：</span>
          <div class="right"><TextEllipsis :info="item.thought" :lineClamp="3" :hiddenBtn="true"></TextEllipsis></div>
        </div>
        <div class="row tip" v-if="item.finishStatus === 1 || item.finishStatus === 2">
          <span>仅支持在App中疏导</span>
        </div>
      </div>
    </div>
    <div class="none" v-else>
      <div class="box">
        <img src="@/assets/img/my/nodata.png" alt="">
        <p>暂无记录</p>
      </div>
    </div>
  </div>
</template>

<script>
import { DateFormat } from '@/utils/date'
import { userThemeCourseList, userCourseList } from '@/api/modules/user'
import TextEllipsis from '@/components/TextEllipsis.vue'
export default {
  name: 'record',
  components: {
    TextEllipsis
  },
  data () {
    return {
      type: 1,
      DateFormat: DateFormat,
      tableList: []
    }
  },
  mounted () {
    this.type = Number(this.$route.query.type) || 1
    this.disponseUrl()
  },
  methods: {
    disponseUrl () {
      this.$router.replace(`/cbt-record?type=${this.type}`).catch(() => {})
      if (this.type === 1) {
        this.getCourseList()
      } else if (this.type === 2) {
        this.getThemeCourseList()
      }
    },
    toggleType (type) {
      console.log('type', type)
      if (type === this.type) return
      this.type = type
      this.disponseUrl()
    },
    getCourseList () {
      this.tableList = []
      userCourseList().then(res => {
        if (res.code === 0) {
          this.tableList = res.data.courseList
        }
      })
    },
    getThemeCourseList () {
      this.tableList = []
      userThemeCourseList().then(res => {
        if (res.code === 0) {
          this.tableList = res.data.courseList
        }
      })
    },
    getStatus (status) {
      if (status === 1) {
        return { tag: '未疏导', className: 'start' }
      } else if (status === 2) {
        return { tag: '疏导中', className: 'doing' }
      } else if (status === 3) {
        return { tag: '已疏导', className: 'completed' }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@w: 37.5;
.record{
  height: 100vh;
  background-color: #F6F6F7;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .type{
    height:74rem/@w;
    background-color: #FFFFFF;
    box-sizing: border-box;
    padding: 0 20rem/@w;
    .title{
      position: relative;
      padding: 10rem/@w 0 16rem/@w ;
      font-size: 16rem/@w;
      line-height: 22rem/@w;
      font-weight: bold;
      color: #333;
      text-align: center;
      i{
        position: absolute;
        left: 0;
        font-size: 0.533333rem;
      }
    }
    .toggleType{
      box-sizing: border-box;
      padding: 0 45rem/@w;
      display: flex;
      justify-content: space-between;
      span{
        font-size: 14rem/@w;
        line-height: 20rem/@w;
        color: #333;
        margin-bottom: 4rem/@w;
        border-bottom: 2rem/@w solid transparent;
      }
      .active{
        color: #34B7B9;
        border-bottom: 2rem/@w solid #34b7b9;
      }
    }
  }
  .list{
    flex: 1;
    width: 100%;
    overflow-y: scroll;
    box-sizing: border-box;
    padding:0 20rem/@w 16rem/@w;
    .card{
      margin-top: 16rem/@w;
      box-sizing: border-box;
      padding: 16rem/@w 20rem/@w;
      background-color: #fff;
      border-radius: 12rem/@w;
      .courseName{
        font-size: 14rem/@w;
        line-height: 20rem/@w;
        color: #333;
        font-weight: bold;
        margin-right: 5rem/@w;
      }
      .tag{
        display: inline-block;
        padding: 0 4rem/@w;
        border-radius: 5rem/@w;
        font-size: 12rem/@w;
        line-height: 17rem/@w;
        color: #fff;
      }
      .start{
        background-color: #b7b7b7;
      }
      .doing{
        background-color: #ffc31c;
      }
      .completed{
        background-color: #5ec565;
      }
      .row{
        margin-top: 8rem/@w;
        font-size: 12rem/@w;
        line-height: 18rem/@w;
        display: flex;
      }
      .left{
        color: #333;
      }
      .right{
        flex: 1;
        color: #666;
        position: relative;
        // .thought{
        //   // width: 100%;
        //   line-height: 18rem/@w;
        //   /* 设置为行高的整倍数，此处显示两行: 2 * 20rem/@w */
        //   max-height: 18rem/@w;
        // }
      }
      .tip{
        flex: 1;
        position: relative;
        height: 20rem/@w;
        font-size: 14rem/@w;
        line-height: 20rem/@w;
        color: #34B7B9;
        span{
          position: absolute;
          bottom: 0;
          right: 0;
        }
      }
    }
  }
  .none{
    display: flex;
    justify-content: center;
    flex: 1;
    width: 100%;
    .box{
      margin-top: 140rem/@w;
      img{
        width: 140rem/@w;
        height: 140rem/@w;
      }
      p{
        margin: 0;
        color: #999999;
        font-size: 18rem/@w;
        line-height: 25rem/@w;
        text-align: center;
      }
    }
  }
}
</style>
