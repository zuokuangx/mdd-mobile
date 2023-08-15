<template>
  <div class="login-box">
    <div class="container" ref="container" v-show="!find">
      <div class="img"><img src="@/assets/login.png" alt="yunyu"></div>
      <h5>登录/注册</h5>
      <div class="complex-line">
        <div class="left" @click="choiceArea"><van-field class="dis-van-field" :value="`+${countryCode}`" readonly right-icon="play" /></div>
        <van-field v-model="username" type="number" placeholder="请输入手机号（新号自动注册）" @blur="checkUsername" />
      </div>
      <van-field class="line" v-model="smsCode" type="number" maxlength="6"  placeholder="请输入验证码">
        <template #button>
          <van-button class="timeBtn" size="small"  @click="getMsgCode" round type="primary" :disabled="msgFlag || timeFlag">{{getmsg}}</van-button>
        </template>
      </van-field>
      <div class="login">
        <van-button round block type="primary" @click="login" :disabled="allCompleteFlag">登录</van-button>
      </div>
      <p>登录注册即代表同意 <span @click="skip('agreements')">《服务协议》</span > 及 <span @click="skip('policy')">《隐私政策》</span> </p>
    </div>
    <div class="area" v-show="find">
      <div class="area-top" ref="areatop">
        <van-nav-bar title="选择国家和地区" :border="false" left-arrow @click-left="find = false"/>
        <div class="cover-box">
          <div class="search-line">
            <img src="@/assets/img/my/dark-search.png" alt="" class="left">
            <div class="center">
              <form action="javascript:void 0">
                <input @input="search()" @blur="searchFinished = false, show = false " @focus="show = true" ref="myInput" type="search" v-model="keyWord" placeholder="搜索" />
              </form>
            </div>
            <img src="@/assets/img/my/clear.png" @click="clear()" v-show="keyWord !== ''" alt="" class="right">
          </div>
          <div class="cancel" v-if="keyWord || show" @click="cancel()">取消</div>
        </div>
      </div>
      <!-- ----- -->
      <div class="area-list">
        <van-overlay :show="show && keyWord === ''"></van-overlay>
        <!-- panel -->
        <!-- <van-index-bar ref="bar" v-show="!searchFinished && searchList.length === 0 " :index-list="['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z']" :sticky-offset-top="top"> -->
        <van-index-bar ref="bar" class="van-index-bar-empty" v-show="keyWord === ''" :index-list="['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z']" :sticky-offset-top="top">
          <div v-for="item in areas" :key="item.type">
            <van-index-anchor :index="item.type" />
            <van-cell :title="`${it.chinese_name}(${it.english_name})`" v-for="it in item.list" :key="it.chinese_name" @click="backLogin(it.phone_code, it.chinese_name)">
              <div class="number">+{{it.phone_code}}</div>
            </van-cell>
          </div>
        </van-index-bar>
        <!-- -------------------- -->
        <van-index-bar v-if="searchList.length > 0" :index-list="[]" :sticky-offset-top="top" :key="new Date().getTime()">
            <van-cell :title="`${it.chinese_name}(${it.english_name})`" v-for="(it,index) in searchList" :key="index + index" @click="backLogin(it.phone_code, it.chinese_name)" >
              <div class="number">+{{it.phone_code}}</div>
            </van-cell>
        </van-index-bar>
        <!-- -------------------- -->
        <div class="noneData" v-if="searchList.length === 0 && keyWord !== ''">
          <div class="none-list" ><img src="../../assets/img/my/none-list.png" alt=""> <div class="text">无内容</div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { areas } from './area'
import { getCode, postUserLogin } from '@/api/modules/login'
export default {
  name: 'login',
  data () {
    return {
      areas: areas,
      username: '',
      smsCode: '',
      countryCode: '86',
      top: 0,
      timeFlag: false,
      find: false,
      country: '中国',
      getmsg: '获取验证码',
      keyWord: '',
      show: false,
      searchList: [],
      // searchFinished: false,
      defaultF: true,
      appid: '192871241'
    }
  },
  mounted () {
    this.$refs.container.style.height = window.innerHeight + 'px'
    // const flag = this.$store.getters.isLogin(localStorage.getItem('phone'))
  },
  computed: {
    msgFlag () {
      const reg = /[0-9]$/
      if (this.username !== '' && reg.test(this.username)) {
        return false
      } else {
        return true
      }
    },
    allCompleteFlag () {
      if (!this.msgFlag && this.smsCode !== '') {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    // 检查名字
    checkUsername () {
      if (this.username === '') {
        this.$toast('请输入手机号')
      }
    },
    // 获取验证码
    getMsgCode () {
      try {
        // eslint-disable-next-line no-unused-vars, no-undef
        var captcha = new TencentCaptcha(this.appid, this.callback, { loading: false })
        // eslint-disable-next-line no-undef
        captcha.show()
        // eslint-disable-next-line no-undef
      } catch (error) {
        this.loadErrorCallback(error)
      }
    },
    // 无感验证回调
    callback (res) {
      console.log('callback', 'res', res)
      if ((res.ret === 0 && !res.errorCode) || (res.ret === 0 && res.errorCode === 1001)) {
        this.getMessageCode(res.ticket, res.randstr)
      } else {
        if (res.ret === 0) {
          this.loadErrorCallback()
        }
      }
    },
    // 腾讯云验证js加载失败回调
    loadErrorCallback (error) {
      console.log('loadErrorCallback', error)
      // 生成容灾票据或自行做其它处理
      var ticket = 'terror_1001' + this.appid + '_' + Math.floor(new Date().getTime() / 1000)
      this.callback({
        ret: 0,
        randstr: '@' + Math.random().toString(36).substr(2),
        ticket: ticket,
        errorCode: 1001,
        errorMessage: 'jsload_error'
      })
    },
    // 获取验证码
    getMessageCode (ticket, randstr) {
      console.log('getCode')
      getCode({ ticket: ticket, randStr: randstr, phone: this.username, countryCode: this.countryCode }).then(res => {
        if (res.code === 0) {
          this.timeFlag = true
          this.countDown(60)
        }
      }).catch(err => {
        if (err.code) {
          this.$toast(err.message)
        }
      })
    },
    // 计时器
    countDown (time) {
      if (time === 0) {
        this.getmsg = '重新获取'
        this.timeFlag = false
        return
      } else {
        this.getmsg = time + 's'
        time--
      }
      setTimeout(() => { this.countDown(time) }, 1000)
    },
    // 登录
    login () {
      const data = {
        username: this.username,
        smsCode: this.smsCode,
        countryCode: this.countryCode,
        country: this.country
      }
      postUserLogin(data).then(res => {
        if (res.code === 0) {
          // if (res.data.isNewUser && !res.data.isRxNUReward) {
          //   newUserReward().then(resp => {
          //   })
          // }
          localStorage.phone = res.data.phone
          localStorage.isNewUser = res.data.isNewUser
          localStorage.userId = res.data.userId
          if (this.$route.query.url) {
            const { url, ...otherQuery } = this.$route.query
            this.$router.push({ path: url, query: otherQuery })
          } else {
            this.$router.push({ path: '/home' })
          }
        }
      }).catch(() => {
        // console.log(err)
        // this.$toast(err.message)
      })
    },
    // 链接
    skip (type) {
      if (type === 'policy') {
        window.location.href = window.location.origin + '/agreements/#/privacy'
      } else {
        window.location.href = window.location.origin + '/agreements/#/user'
        // window.location.href = 'https://depression.fubianmed.com/agreements/#/user'
      }
    },
    choiceArea () {
      this.find = true
      this.keyWord = ''
      this.searchList = []
      this.defaultF = true
      this.$nextTick(() => {
        // this.top = this.$refs.areatop.clientHeight
        this.$refs.bar.scrollTo('B')
        this.$refs.bar.scrollTo('A')
      })
    },
    clear () {
      this.keyWord = ''
      this.$refs.myInput.focus()
      // this.searchFinished = false
      // this.searchList = []
      // this.defaultF = true
    },
    search () {
      /* eslint-disable */
      this.show = false
      // 中文、拼音、国家英文（不区分大小写) 区号
      // 一言难尽  拼音居然也不分大小写
      // chinese_name chinese_pinyin？english_name phone_code
      if (this.keyWord === '') {
        this.show = true
      // this.$refs.myInput.blur()
      // this.show = false
      } else if (this.keyWord !== '' && this.keyWord != '')  {
        // console.log(this.searchList)
        // this.$refs.myInput.blur()
        this.show = false
        this.getList()
        // this.searchFinished = false
      } else {
        this.show = false
        this.getList()
      }
    },
    getList () {
      this.searchList = []
      const cloneData = JSON.parse(JSON.stringify(this.areas))
      cloneData.forEach(e => {
        e.list.forEach(item => {
          if (item.chinese_name.includes(this.keyWord)) {
            this.searchList.push(item)
          } else if (this.disponseSpace(item.chinese_pinyin).includes(this.disponseSpace(this.keyWord))) {
            this.searchList.push(item)
          } else if (this.disponseSpace(item.english_name).includes(this.disponseSpace(this.keyWord))) {
            this.searchList.push(item)
          } else if (item.phone_code.includes(this.keyWord)) {
            this.searchList.push(item)
          }
        })
      })
    },
    backLogin (code, chineseName) {
      this.countryCode = code
      this.country = chineseName
      this.find = false
      this.searchFinished = false
    },
    disponseSpace (s) {
      // const str = s.replace(/\s*/g, '')
      return s.toLocaleLowerCase()
    },
    cancel () {
      this.keyWord = ''
      this.searchList = []
      this.show = false
      // this.searchFinished = false
    }
  }
}
</script>

<style lang="less" vars="{top}" scoped>
@import '../../assets/style/reset-vant.less';
.login-box{
  .container{
  padding-left: 1.28rem;
  position: absolute;
  width: 100%;
  padding-right: 1.28rem;
  padding-top: 1.6rem;
  box-sizing: border-box;
  background: #FFFFFF;
  height: 100%;
  overflow: hidden;
  .img{
    text-align: center;
    img{
      width: 2.133333rem;
      height: 1.626667rem;
      margin: 0 auto;
    }
    margin-bottom: 1.093333rem;
  }
  h5{
    font-size: .533333rem;
    font-weight: 600;
    color: #000000;
    height: .746667rem;
    line-height: .746667rem;
    margin-bottom: 1.066667rem;
  }
  .complex-line{
    display: flex;
    flex-wrap: nowrap;
    .left{
      width: 2.5rem;
      margin-right: 0.2667rem;
      display: flex;
      /deep/.van-field__right-icon{
        padding: 0;
        margin-right: 0px;
        color: #000000;
        transform: rotate(90deg);
      }
    }
    /deep/.dis-van-field{
      .van-field__control{
        text-align: center;
      }
    }
    /deep/.van-field__control{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    /deep/.van-field__control{
      color: #000000;
    }
  }
  .login{
    margin-top: 1.066667rem;
  }
  .timeBtn{
    width: 2.133333rem;
    padding: 0;
  }
  .van-button{
    background-color: @green;
    border: 1px solid @green;
  }
  .van-button--disabled{
    background-color: @gray-5;
    border: 1px solid @gray-5;
  }
  .van-cell{
    padding-left: 0;
    height: 1.573333rem;
    padding-top: .4rem;
    padding-right: 0;
    border-bottom: 1px solid #DEDEDE;
  }
  .van-cell::after{
    display: none;
  }
  p{
    position: absolute;
    bottom: 20px;
    left: 50%;
    font-size: .32rem;
    text-align: center;
    width: 100%;
    transform: translateX(-50%);
    word-break: keep-all;
    span{
      color: @green;
    }
  }
  }
  .area{
    .area-top{
      width: 100%;
      z-index: 3000;
      position: fixed;
      background: #FFFFFF;
      height: 2.6667rem;
      .cover-box{
        display: flex;
        .cancel{
          font-size: 0.3733rem;
          color: #333333;
          width: 1.2267rem;
          display: flex;
          align-items: center;
          margin: 0.2667rem 0rem .4267rem;
        }
      }
      .search-line{
        flex: 1;
        padding: 0 .4267rem;
        height: .88rem;
        margin: 0.2667rem .4267rem .4267rem;
        border-radius: 0.4533rem;
        background: #F6F6F6;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: .4267rem;
          height: .4267rem;
        }
        .center{
          flex: 1;
          form{
            padding: 0 0.5em;
            input{
              width: 100%;
              border: none;
              background-color: #F6F6F6;
             -webkit-appearance: none;
            }
            input[type=search]::-webkit-search-cancel-button{
             -webkit-appearance: none;
            }
          }
        }
      }
    }
    .area-list::-webkit-scrollbar {
      display: none;
    }
    .area-list{
      z-index: 2999;
      width: 100%;
      top: 2.6667rem;
      height: calc( 100vh - 2.6667rem);
      position: fixed;
      overflow-y: scroll;
      .van-cell{
        padding-top: 11px;
      }
      .van-index-bar-empty{
        padding-bottom: 2rem;
      }
      .van-cell__value{
        min-width: 1.3333rem;
        max-width: 1.3333rem;
        padding: 0 0.5em;
        color: #999999;
        float: right;
      }
      .van-cell__title{
        color: #333333;
      }
      /deep/.van-index-anchor{
        background-color:  #F6F6F6;
        color: #333333;
      }
      /deep/.van-index-bar__index{
        padding: 0;
      }
      // /deep/.van-index-anchor--sticky{
      //   background-color: pink !important;
      // }
      /deep/.van-cell__title{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      /deep/.myred{
        .van-index-bar__sidebar{
          :first-child{
            color: #FFFFFF;
            width: .32rem;
            height: .32rem;
            border-radius: 50%;
            background-color: #34B7B9;
          }
        }
      }
      /deep/.van-index-bar__index--active{
        color: #FFFFFF;
        width: .32rem;
        height: .32rem;
        border-radius: 50%;
        background-color: #34B7B9;
      }
      .van-overlay{
        // position: absolute;
        z-index: 999;
        background-color: rgba(0, 0, 0, 0.4);
      }
      .noneData{
        text-align: center;
        padding-top: 5.4133rem;
        img{
          width: 3.7333rem;
          height: 3.7333rem;
        }
        .text{
          color: #999999 ;
          font-size: 0.48rem;
        }
      }
    }
  }
}

</style>
