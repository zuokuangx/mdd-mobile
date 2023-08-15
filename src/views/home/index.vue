<template>
  <div class="main">
    <van-loading color="#1989fa" v-if="loading"></van-loading>
    <div v-else>
      <div class="header">
      <!-- 搜索 -->
      <div class="search" @click="$router.push('/search')">
        <img src="@/assets/img/test/search.png" alt="search">
        <span>请输入您要找的量表名</span>
      </div>
      <div class="sign-in" @click="signIn">
      </div>
      </div>
      <div class="container">
        <!-- 轮播图 -->
        <van-swipe :autoplay="5000">
          <van-swipe-item>
            <img class="game" @click.stop="playGame" src="@/assets/img/test/game.png" alt="game">
          </van-swipe-item>
          <van-swipe-item v-for="(item, index) in swipList" :key="index">
            <img :src="item.imageLink" @click="toDeatil(item)" />
          </van-swipe-item>
        </van-swipe>
        <!-- 专题训练 -->
        <div class="train">
          <div class="title">
            <h5>专题训练</h5>
            <span @click="$router.push({ path: '/train', query: { type:'all' } })">
              查看全部
              <van-icon name="arrow" color="#666"/>
              <van-icon name="arrow" color="#666"/>
            </span>
          </div>
          <div class="train-box">
            <div class="train-box-content" v-for="v in cbtCourseList" :key="v.courseImage" @click="$router.push({ path: '/cbt-detail', query: { courseId: v.courseId } })">
              <div class="tag" v-if="Number(v.price) === 0">限时免费</div>
              <div class="tag" v-if="Number(v.price) === 1.99">限时优惠</div>
              <div class="img"><img :src="v.courseImage" alt="专题训练"></div>
              <p class="name">{{ v.courseName }}</p>
              <p class="price"><span>￥</span>{{ Number(v.price).toFixed(2) }}</p>
            </div>
          </div>
        </div>
        <!-- 小愈精选 -->
        <div class="careful-select">
          <div class="title">
            <h5>小愈精选</h5>
            <span @click="change()">
              换一换
              <van-icon name="replay" color="#666"/>
            </span>
          </div>
          <div class="careful-select-box" v-for="item in carefulSelection" :key="item.tableLogo" @click="$router.push({ path: '/test-detail', query: { tableCode: item.tableCode } })">
            <img :src="item.tableLogo" alt="小愈精选" >
            <div class="description">
              <div class="name">{{ item.tableName }}</div>
              <div class="introduction" v-if="item.tableIntroduction">{{ item.tableIntroduction }}</div>
              <div v-else></div>
              <div class="price">
                <div class="red"><span>￥</span>{{ Number(item.price).toFixed(2) }}</div>
                <div><img src="@/assets/img/my/hot.png" alt="已测试"><span>{{ item.evalRecordCount }}人已测试</span></div>
              </div>
            </div>
          </div>
        </div>
        <!-- 系统疏导 -->
        <div class="train counseling">
          <div class="title">
            <h5>系统疏导</h5>
          </div>
          <div class="train-box counseling-box">
            <div class="train-box-content counseling-box-content" v-for="v in courseList" :key="v.courseImage" @click="$router.push({ path: '/cbt-detail', query: { courseId: v.courseId } })">
              <div class="img"><img :src="v.courseImage" alt="系统疏导"></div>
              <p class="name">{{ v.courseName }}</p>
              <p class="price"><span>￥</span>{{ Number(v.price).toFixed(2) }}</p>
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
import { h5ActivitylList, cbtCourseList, carefulSelection, courseList } from '@/api/modules/user'
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
      swipList: [],
      cbtCourseList: [],
      courseList: [],
      selection: [],
      carefulSelection: [],
      flag: 0,
      loading: false
    }
  },
  mounted () {
    this.geth5ActivitylList()
    this.getCbtCourseList()
    this.getCarefulSelection()
    this.getCourseList()
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
    signIn () {
      this.$router.push('/my-index')
    },
    geth5ActivitylList () {
      h5ActivitylList({ status: 2 }).then(res => {
        if (res.code === 0) {
          const activityBasicInfo = res.data.activityBasicInfo || []
          this.swipList = activityBasicInfo.filter(e => e.imageLink)
        }
        // console.log(this.swipList)
      })
    },
    async getCbtCourseList () {
      const res = await cbtCourseList({ type: 'show' })
      console.log('res', res)
      if (res.code === 0) {
        this.cbtCourseList = res.data.courseList
        console.log('cbtCourseList', this.cbtCourseList)
      }
    },
    async getCarefulSelection () {
      this.loading = true
      const res = await carefulSelection()
      console.log('res', res)
      if (res.code === 0) {
        // this.selection = res.data
        this.selection = res.data.map(v => {
          if (v.evalRecordCount >= 10000) {
            if ((v.evalRecordCount / 10000).toFixed(1) > 9999.9) {
              v.evalRecordCount = 9999.9 + 'w'
            } else {
              v.evalRecordCount = (v.evalRecordCount / 10000).toFixed(1) + 'w'
            }
          }
          return v
        })
        this.change()
        this.loading = false
        console.log('selection', this.selection)
      }
    },
    async getCourseList () {
      const res = await courseList()
      console.log('res', res)
      if (res.code === 0) {
        this.courseList = res.data.courseList
        console.log('cbtCourseList', this.cbtCourseList)
      }
    },
    toDeatil (item) {
      this.$router.push(`/test-detail?tableCode=${item.tables[0]}&discountCode=${item.discountCode}`)
    },
    playGame () {
      const userId = localStorage.getItem('userId')
      window.location.href = `https://depression.fubianmed.com/game/xcwm${userId ? '?userId=' + userId : ''}`
    },
    change () {
      this.carefulSelection = this.selection.slice(4 * this.flag % 12, 4 * this.flag % 12 + 4)
      this.flag++
      console.log()
      console.log('this.carefulSelection', this.carefulSelection)
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
  display: flex;
  flex-direction: column
}
.header{
  padding: 10rem/@w 20rem/@w;
  background-color: #f4f4f4;
  height: 33rem/@w;
  display: flex;
  justify-content: space-between;
  .search {
    display: flex;
    align-items: center;
    width: 240rem/@w;
    height: 33rem/@w;
    background: #fff;
    border-radius: 17rem/@w;
    padding: 0 10rem/@w;

    img {
      width: 15rem/@w;
      height: 17rem/@w;
    }

    span {
      font-size: 14rem/@w;
      color: #999;
      margin-left: 10rem/@w;
    }
  }
  .sign-in{
    width: 65rem/@w;
    height: 33rem/@w;
    background: url('~@/assets/img/my/signin.png')  top left / cover no-repeat;
  }

}
.container{
  flex: 1;
  overflow-y: scroll;
  background-color: #f4f4f4;
  padding: 0 20rem/@w 10rem/@w;
  margin-bottom: 50rem/@w;
  .van-swipe {
    margin:0 0 10rem/@w 0 ;
    width: 100%;

    .van-swipe-item {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .train{
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 12rem/@w;
    padding: 16rem/@w 10rem/@w;
    color: #333;
    margin-bottom: 10rem/@w;
    .title{
      display: flex;
      justify-content: space-between;
      margin-bottom: 10rem/@w;
      h5{
        margin: 0;
        font-size: 16rem/@w;
        line-height: 22rem/@w;
      }
      span{
        font-size: 12rem/@w;
        line-height: 22rem/@w;
        color: #666;
        .van-icon-arrow{
          margin-left: -3rem/@w;
        }
      }
    }
    .train-box{
      width:100%;
      overflow-x: scroll;
      -webkit-overflow-scrolling:touch;
      display: -webkit-box;
      white-space: nowrap;
      &::-webkit-scrollbar {
        display:none
      }
      padding-top: 4rem/@w;
      font-size: 0;
      .train-box-content{
        display:inline-block;
        width: 124rem/@w;
        padding-left: 4rem/@w;
        margin-right: 6rem/@w;
        position: relative;

        .tag{
          position: absolute;
          top: -4rem/@w;
          left: 0;
          width: 48rem / @w;
          height: 20rem / @w;
          border-radius: 8rem/@w 0 8rem/@w 0;
          background-color: #e4a434;
          text-align: center;
          font-size: 10rem/@w;
          line-height: 20rem/@w;
          color: #fff;
        }
        .img{
          width: 100%;
          height: 84rem/@w;
          border-radius: 12rem/@w;
          margin-bottom: 4rem/@w;
          overflow: hidden;
          font-size: 0;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .name{
          font-size: 14rem/@w;
          line-height: 20rem/@w;
          margin: 0 0 3rem/@w;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: baseline;
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
  }
  .careful-select{
    padding: 16rem/@w 10rem/@w;
    background-color: #fff;
    border-radius: 12rem/@w;
    margin-bottom: 10rem/@w;
    .title{
      width: 100%;
      display: flex;
      justify-content: space-between;
      line-height: 22rem/@w;
      h5{
        font-size: 16rem/@w;
        color: #333;
        margin: 0;
      }
      span{
        font-size: 12rem/@w;
        color:#666;
        .van-icon-replay{
          margin-left: 6rem/@w;
        }
      }
    }
    .careful-select-box{
      padding: 10rem/@w 0;
      width: 100%;
      display: flex;
      img{
        width: 68rem / @w;
        height: 68rem / @w;
        border-radius: 4rem/@w;
        margin-right: 10rem/@w;
      }
      .description{
        height: 68rem/@w;
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
        font-size: 16rem/@w;
        color: #666;
        overflow: hidden;
        .name{
          color: #333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: baseline;
        }
        .introduction{
          font-size: 12rem/@w;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: baseline;
        }
        .price{
          display: flex;
          justify-content: space-between;
          line-height: 22rem/@w;
          .red{
            font-size: 16rem/@w;
            color: #f31313;
            span{
              font-size: 12rem/@w;
              margin-right: 4rem/@w;
            }
          }
          img{
            width: 11rem/@w;
            height: 14rem/@w;
            margin-right: 4rem/@w;
          }
        }
      }

    }
    .careful-select-box:last-child{
      padding-bottom: 0;
    }
  }
  .counseling{
      // height: 220rem / @w;
      margin-bottom: 0;
      .counseling-box{
        // height: 156rem/@w;
        width: 100%;
        display: flex;
        justify-content: space-between;
        .counseling-box-content{
          // width: 153rem/@w;
          flex: 1;
          margin-right: 10rem/@w;
          height: 100%;
          padding: 0;
          .img{
            height: 104rem/@w;
          }
          .name{
            margin-bottom: 5rem/@w;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            vertical-align: baseline;
          }
        }
        .counseling-box-content:last-child{
          margin-right: 0;
        }
      }
    }
}
.footer {
  height: 50rem/@w;
}
</style>
