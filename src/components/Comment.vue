<template>
  <div>
    <div class="comment">
      <h2>评论</h2>
      <div class="comment-msg">
        <div class="comment-img">
          <img :src="attachImageUrl(avator)" alt="">
        </div>
        <el-input class="comment-input" type="textarea" :row="2" placehoder="请输入内容" v-model="textarea"/>
      </div>
      <el-button type="primary" class="sub-btn" @click="postComment">评论</el-button>
    </div>
    <p>精彩评论: 共{{ commentList.length }}条评论</p>
    <ul class="popular" v-for="(item,index) in commentList" :key="index">
      <li>
        <div class="popular-img">
          <img :src="attachImageUrl(userPic[index])" alt="">
        </div>
        <div class="popular-msg">
          <ul>
            <li class="name">{{ userName[index] }}</li>
            <li class="time">发表时间{{ item.createTime }}</li>
            <li class="time">修改时间{{ item.updateTime }}</li>
            <li class="content">{{ item.content }}</li>
          </ul>
        </div>
        <div class="up" ref="up" @click="postUp(item.id,item.up,index)">
          <svg class="icon">
            <use xlink:href="#icon-zan"/>
          </svg>
          {{ item.up }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {mixin} from '../mixins'
import {mapGetters} from 'vuex'
import {getAllComment, getUserOfId, setComment, setLike} from '../api/interface'

export default {
  name: 'comment',
  mixins: [mixin],
  props: [
    'playId', // 歌曲或歌单的id
    'type' // 0歌单,1歌曲
  ],
  computed: {
    ...mapGetters([
      'id',
      'loginIn',
      'userId',
      'avator'
    ])
  },
  data() {
    return {
      textarea: '', // 评论内容
      commentList: [], // 存放评论列表
      userPic: [], // 用户头像
      userName: [], // 用户的昵称
    }
  },
  mounted() {
    this.getComment()
  },
  methods: {
    // 提交评论
    postComment() {
      if (this.loginIn) {
        let params = new URLSearchParams()
        if (this.type === 0) {
          params.append('songId', this.playId)
        } else {
          params.append('songListId', this.playId)
        }
        params.append('userId', this.userId)
        params.append('type', this.type)
        params.append('content', this.textarea)
        setComment(params)
          .then(res => {
            if (res.code === 1) {
              this.notify('评论成功', 'success')
              this.textarea = ''
              this.getComment()
            } else {
              this.notify('评论失败', 'error')
            }
          })
          .catch(err => {
            this.notify('评论失败', 'error')
            console.log(err)
          })
      } else {
        this.rank = null
        this.notify('请先登录', 'warning')
      }
    },
    // 评论列表
    getComment() {
      getAllComment(this.type, this.playId)
        .then(res => {
          this.commentList = res
          for (let item of res) {
            this.getUsers(item.userId)
          }
        })
        .catch(err => {
          this.notify('评论加载失败', 'error')
          console.log(err)
        })
    },
    // 获取用户的头像和昵称
    getUsers: function (id) {
      getUserOfId(id)
        .then(res => {
          this.userPic.push(res.avator)
          this.userName.push(res.username)
        })
        .catch(err => {
          this.notify('出错了', 'error')
          console.log(err)
        })
    },
    postUp(id, up, index) {
      if (this.loginIn) {
        let params = new URLSearchParams()
        params.append('id', id)
        params.append('up', up + 1)
        setLike(params)
          .then(res => {
            if (res.code === 1) {
              this.$refs.up[index].children[0].style.color = '#2796cd'
              this.getComment()
            } else {
              this.notify('点赞失败', 'error')
            }
          })
          .catch(err => {
            this.notify('点赞失败', 'error')
            console.log(err)
          })
      } else {
        this.rank = null
        this.notify('请先登录', 'warning')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/comment.scss';
</style>
