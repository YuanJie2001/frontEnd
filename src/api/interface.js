import {get, post} from './http'
import axios from 'axios';

// 判断管理员是否登录成功
export const getLoginStatus = (params) => post(`admin/login/status`, params)
// ============歌手相关===========
// 查询歌手
export const getAllSinger = () => get(`singer/allSinger`)
// 根据性别查询歌手
export const getSingerOfGender = (gender) => get(`singer/singerOfGender?gender=${gender}`)
// ============歌曲相关===========
// 根据歌手id查询歌曲
export const songOfSingerId = (id) => get(`song/songOfSingerId?singerId=${id}`)
// 根据歌曲id查询歌曲对象
export const songOfSongId = (id) => get(`song/songOfSongId?id=${id}`)
// 根据歌名模糊查询
export const likeSongOfName = (keywords) => get(`song/likeSongOfName?name=${keywords}`)

// ============歌单相关===========
// 查询歌单
export const getAllSongList = () => get(`songList/allSongList`)
// 返回标题包含文字的歌单列表
export const getSongListOfLikeTitle = (keywords) => get(`songList/likeTitle?title=${keywords}`)
// 返回风格包含文字的歌单列表
export const getSongListOfLikeStyle = (keywords) => get(`songList/likeStyle?style=${keywords}`)

// ============歌单的歌曲相关===========
// 根据歌单id查询歌曲列表
export const listContainSongOfSongId = (songListId) => get(`ListContainSong/listContainSongOfSongId?songListId=${songListId}`)

// ============用户相关===========
// 查询用户
export const getAllUser = () => get(`user/allUser`)
// 根据用户id查询其详细信息
export const getUserOfId = (id) => get(`user/selectByPrimaryKey?id=${id}`)
// 注册
export const register = (params) => post(`/user/add`, params)
// 登录
export const loginIn = (params) => post(`/user/login`, params)
// 更新用户信息
export const updateUserMsg = (params) => post(`/user/update`, params)
// 下载音乐
export const download = (url) => axios({
  method: 'get',
  url: url,
  responseType: 'blob'
})

// ============评价===========
// 提交评分
export const setRank = (params) => post(`/rank/add`, params)
// 查询平均分
export const getSongAverage = (songListId) => get(`/rank/average?songListId=${songListId}`)

// ============评论===========
// 提交评论
export const setComment = (params) => post(`/comment/add`, params)
// 点赞
export const setLike = (params) => post(`/comment/update`, params)

// 返回当前歌单或歌曲的评论列表
export const getAllComment = (type, id) => {
  if (type === 0) { // 歌曲
    return get(`/comment/commentOfSongId?songId=${id}`)
  } else {
    return get(`/comment/commentOfSongListId?songListId=${id}`)
  }
}
// ==========收藏==========
// 新增收藏
export const setCollect = (params) => post(`/collect/add`, params)
// 查询用户收藏
export const getCollectUserId = (userId) => get(`/collect/collectOfUserId?userId=${userId}`)
