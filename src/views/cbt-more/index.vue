<template>
  <div class="main">
    <van-loading color="#1989fa" v-if="loading"></van-loading>
    <div class="container" v-else>
      <!-- 系统课程 -->
      <div class="counseling">
        <div class="title">
          <h5>系统课程</h5>
        </div>
        <div class="counseling-box">
          <div class="counseling-box-content" v-for="v in courseList" :key="v.courseImage" @click="$router.push({ path: '/cbt-detail', query: { courseId: v.courseId } })">
            <div class="img">
              <img :src="v.courseImage" alt="系统课程">
            </div>
            <p class="name">{{ v.courseName }}</p>
            <p class="price"><span>￥</span>{{ Number(v.price).toFixed(2) }}</p>
          </div>
        </div>
      </div>
      <!-- 专题训练 -->
      <div class="train">
        <div class="title">
          <h5>专题训练</h5>
          <span @click="$router.push({ path: '/train', query: { type:'all' } })">查看全部
            <van-icon name="arrow" color="#666"/>
            <van-icon name="arrow" color="#666"/>
          </span>
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
              {{ Number(item.price).toFixed(2) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <MainTabbar></MainTabbar>
    </div>
    <NewPersonGift :flag="newPersonFlag" />
  </div>
</template>

<script>
import { courseList, cbtCourseList } from '@/api/modules/user'
import MainTabbar from '@/components/MainTabbar'
import NewPersonGift from '@/components/newPerson'
export default {
  components: {
    MainTabbar,
    NewPersonGift
  },
  data () {
    return {
      newPersonFlag: false,
      courseList: [],
      cbtCourseList: [],
      flag: 0,
      loading: false
    }
  },
  mounted () {
    this.getCourseList()
    this.getCbtCourseList()
    if (localStorage.getItem('phone')) {
      this.$store.dispatch('getInfo').then(res => {
        if (res.data.isNewUser && !res.data.isRxNUReward) {
          this.newPersonFlag = true
          // 这是满足新人有礼条件
        }
      })
    }
  },
  methods: {
    async getCourseList () {
      this.loading = true
      const res = await courseList()
      console.log('res', res)
      if (res.code === 0) {
        this.courseList = res.data.courseList
        console.log('cbtCourseList', this.cbtCourseList)
      }
      this.loading = false
    },
    async getCbtCourseList () {
      const res = await cbtCourseList({ type: 'show' })
      console.log('res', res)
      if (res.code === 0) {
        this.cbtCourseList = res.data.courseList
        console.log('cbtCourseList', this.cbtCourseList)
      }
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
.main {
  height: 100vh;
  // display: flex;
  background-color: #f4f4f4;
  // flex-direction: column
}
.container{
  // flex: 1;
  height: calc(100vh - 50rem/@w);
  padding: 0 20rem/@w;
  overflow-y: scroll;
  .counseling{
    // width: 335rem/@w;
    height: 217rem/@w;
    border-radius: 12rem/@w;
    color: #333;
    .title{
      h5{
        padding: 16rem/@w 0 10rem/@w 0;
        margin: 0;
        font-size: 18rem/@w;
        line-height: 25rem/@w;
      }
    }
    .counseling-box{
      white-space: nowrap;
      font-size: 0;
      display: flex;
      justify-content: space-between;
      width: 100%;
      .counseling-box-content{
        flex: 1;
        // width: 163rem/@w;
        border-radius: 12rem/@w;
        height: 166rem/@w;
        padding: 0;
        background-color: #fff;
        overflow: hidden;
        display:inline-block;
        margin-right: 10rem/@w;
        .img{
          height: 104rem/@w;
          width: 100%;
          margin-bottom: 4rem/@w;
          font-size: 0;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .name{
          font-size: 14rem/@w;
          line-height: 20rem/@w;
          margin:0 10rem/@w 5rem/@w;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: baseline;
        }
        .price{
          margin: 0 10rem/@w 10rem/@w;
          font-size: 16rem/@w;
          line-height: 22rem/@w;
          color:#f31313;
          span{
            font-size: 12rem/@w;
            margin-right: 4rem/@w;
          }
        }
      }
      .counseling-box-content:last-child{
        margin-right: 0;
      }
    }
  }
  .train{
    // width: 335rem/@w;
    color: #333;
    .title{
      display: flex;
      justify-content: space-between;
      margin: 16rem/@w 0 10rem/@w;
      h5{
        margin: 0;
        font-size: 18rem/@w;
        line-height: 25rem/@w;
      }
      span{
        font-size: 14rem/@w;
        line-height: 25rem/@w;
        color: #666;
        .van-icon-arrow{
          margin-left: -3rem/@w;
        }
      }
    }
    .train-box{
      width:100%;
      margin-bottom: 10rem/@w;
      box-sizing: border-box;
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
        overflow:hidden ;
        .name{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: baseline;
          font-size: 14rem/@w;
          line-height: 20rem/@w;
          font-weight: bold;
          color: #333;
        }
        .describe{
          p{
            margin: 0;
            font-size: 12rem/@w;
            line-height: 16rem/@w;
            color: #666;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            vertical-align: baseline;
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
    // .train-box:last-child{
    //   margin-bottom: 0;
    // }
  }
}
.footer {
  height: 50rem/@w;
}
</style>
