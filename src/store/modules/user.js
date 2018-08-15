import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { register,regCheckCode } from '@/api/register'

const user = {
  state: {
    token: getToken(),
    userName: null,
    uid: localStorage.getItem('uid'),
    roles: [],
    id: null,
    eid: null,
    phone: null,
    kind: null,
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, userName) => {
      state.userName = userName
    },
    SET_UID: (state, uid) => {
      state.uid = uid
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_EID: (state, eid) => {
      state.eid = eid
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone
    },
    SET_KIND: (state, kind) => {
      state.kind = kind
    },
    
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      console.log(userInfo)
      const phone = userInfo.phone.trim()
      const loginParams ={phone:phone, password:userInfo.password}
      console.log(loginParams)
      return new Promise((resolve, reject) => {
        login(loginParams).then(response => {
          const data = response.data
          console.log(data)
          setToken(data.tokenId)
          localStorage.setItem('uid',data.userId)
          commit('SET_TOKEN', data.tokenId)
          commit('SET_UID', data.userId)
          commit('SET_PHONE', data.phone)
          commit('SET_KIND', data.kind)
          console.log(data.kind)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        const user = {uid:state.uid,token:state.token}
        getInfo(user).then(response => {
          const data = response.data
          console.log(data);
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_ROLES', [data.createTime,data.eid])
          commit('SET_ID', data.id)
          commit('SET_EID', data.eid)
          commit('SET_UID', data.uid)
          commit('SET_PHONE', data.phone)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    //注册
    Register({commit},userInfo){
      console.log(userInfo)
      const registerparams = {nick:userInfo.nick,phone:userInfo.phone,password:userInfo.password,rePassword:userInfo.rePassword,regCheckCode:userInfo.regCheckCode}
      return new Promise((resolve, reject) => {
        register(registerparams).then( response => {
          const data = response.data
          resolve()
        }).catch(error => {
          reject(error)
        })
    })
  },
  //验证码  
  RegCheckCode({commit},userPhone){
    const regCheckCodeparams = userPhone
    return new Promise((resolve, reject) => {
      regCheckCode(regCheckCodeparams).then( response => {
        const data = response.data
        resolve()
      }).catch(error => {
        reject(error)
      })
  })
  },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
