<template>
  <div class="wrap">
    <van-loading color="#1989fa" v-if="loading"></van-loading>
    <div class="main" v-else>
      <div class="tagList">
        <!-- <div class="tag" :class="{selected : active === 0}">全部</div> -->
        <div class="tag" v-for="( item, index ) in tagList" :key="item" :class="{selected : active === (index)}" @click="handleSelect(item,index)">{{ item }}</div>
      </div>
      <div class="train-box" v-for="item in cbtCourseList" :key="item.courseImage" @click="$router.push({ path: '/cbt-detail', query: { courseId: item.courseId } })">
        <div class="img">
          <img :src="item.courseImage" alt="专题训练">
          <div class="tag" v-if="Number(item.price) === 1.99">限时优惠</div>
          <div class="tag" v-if="Number(item.price) === 0">限时免费</div>
        </div>
        <div class="description">
          <div class="name">{{ item.courseName }}</div>
          <div class="describe">
            <p v-for="v in item.describe" :key="v">{{ v }}</p>
          </div>
          <div class="price">
            <span>￥</span>
            {{ Number(item.price ).toFixed(2)}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cbtCourseList } from '@/api/modules/user'
export default {
  data () {
    return {
      loading: false,
      type: '',
      tempCbtCourseList: [],
      cbtCourseList: [],
      flag: 0,
      orderTagList: ['爱情', '情绪', '家庭', '婚姻', '自我成长', '人际关系', '职业发展'],
      tagList: [],
      active: 0
    }
  },
  mounted () {
    this.type = this.$route.query.type
    console.log('this.type', this.type)
    this.getCbtCourseList()
  },
  methods: {
    async getCbtCourseList () {
      this.loading = true
      const res = await cbtCourseList({ type: this.type })
      console.log('res', res)
      if (res.code === 0) {
        this.tempCbtCourseList = res.data.courseList
        const tagList = Array.from(new Set(this.tempCbtCourseList.map(v => v.tag)))
        this.tagList = this.orderTagList.filter(v => {
          return tagList.indexOf(v) !== -1
        })
        this.tagList.unshift('全部')
        this.handleSelect('全部', 0)
        console.log('this.tagList ', this.tagList)
        console.log('cbtCourseList', this.cbtCourseList, 'this.tagList', this.tagList)
      }
      this.loading = false
    },
    handleSelect (tag, index) {
      this.active = index
      if (tag === '全部') {
        this.cbtCourseList = this.tempCbtCourseList
      } else {
        this.cbtCourseList = this.tempCbtCourseList.filter(v => v.tag === tag)
      }
      console.log('this.tempCbtCourseList', this.tempCbtCourseList, 'this.cbtCourseList', this.cbtCourseList)
    }
  }
}
</script>

<style lang="less" scoped>
@w: 37.5;
.van-loading {
  position: relative;
  color: #D5D5D5;
  font-size: 0;
  vertical-align: middle;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0);
}
.wrap{
  height: 100vh;
  overflow-y: scroll;
}
.main{
  min-height: calc(100vh - 28rem/@w);
  background-color: #f4f4f4;
  padding: 18rem/@w 20rem/@w 10rem/@w;
}
.tagList{
  margin-bottom:6rem/@w;
  .tag{
    display: inline-block;
    border-radius: 10rem/@w;
    padding: 2rem/@w 10rem/@w;
    background-color: #fff;
    font-size: 14rem/@w;
    line-height: 20rem/@w;
    color: #000;
    margin:0 16rem/@w 12rem/@w 0;
    &.selected{
      color: #34b7b9;
    }
  }

}

.train-box{
  width:100%;
  box-sizing: border-box;
  margin-bottom: 10rem/@w;
  padding: 10rem/@w;
  height: 121rem/@w;
  border-radius: 12rem/@w;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  .img{
    width: 124rem/@w;
    height: 100%;
    box-sizing: border-box;
    padding: 9rem/@w 0 8rem/@w;
    font-size: 0;
    position: relative;
    .tag{
      position: absolute;
      top: 5rem/@w;
      left: -4rem/@w;
      width: 48rem / @w;
      height: 20rem / @w;
      border-radius: 8rem/@w 0 8rem/@w 0;
      background-color: #e4a434;
      text-align: center;
      font-size: 10rem/@w;
      line-height: 20rem/@w;
      color: #fff;
    }
    img{
      width: 100%;
      height: 100%;
    }
  }
  .description{
    flex: 1;
    margin-left: 10rem/@w;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .name{
      font-size: 14rem/@w;
      line-height: 20rem/@w;
      font-weight: bold;
      color: #333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      vertical-align: baseline;
    }
    .describe{
      p{
        margin: 0;
        font-size: 12rem/@w;
        line-height: 16rem/@w;
        color: #666;
      }
    }
    .price{
      margin: 0;
      font-size: 16rem/@w;
      line-height: 22rem/@w;
      color:#f31313;
      span{
        font-size: 12rem/@w;
        margin-right: 4rem/@w;
      }
    }
  }
}
.train-box:last-child{
  margin-bottom: 0;
}
</style>
