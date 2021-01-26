import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMobile: false,
    isDesktop: true,
    users: [
      {
        message: []
      }
    ]
  },
  mutations: {
    setUsers(state, data) {
      state.users = data
    },
    switchMobile(state) {
      state.isMobile = true;
      state.isDesktop = false;
    },
    switchDesktop(state) {
      state.isMobile = false;
      state.isDesktop = true;
    },
    addMessage(state, {to, body}) {
      state.users[state.users.findIndex(idx => idx.id === to)].message.push({
        body,
        email: "test",
        postId: to,
        own: true
      })
    }
  },
  actions: {
    async getUsersData ({ commit }) {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users`)
        const arr = response.data.map(async (key) => {
          const photo = await axios.get(`https://jsonplaceholder.typicode.com/photos/${key.id}`)
            const message = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${key.id}`)
          return {id: key.id, name: key.name, photo: photo.data.thumbnailUrl, message: message.data}
        }
        )
        let users = await Promise.all(arr)
        commit("setUsers", users)
      } catch (e) {
        throw e
      }
    },
    async sendMessage({commit}, {to, body}) {
      try {
        commit('addMessage', {to, body})
      } catch (e) {
        throw e
      }
    },
    setMobile({commit}) {
      commit('switchMobile')
    },
    setDesktop({commit}) {
      commit('switchDesktop')
    },
  },
  getters: {
    users: s => s.users,
    isMobile: s => s.isMobile,
    isDesktop: s => s.isDesktop,
    messages: s => id => s.users[s.users.findIndex(idx => idx.id === id)],
  },
  modules: {
  }
})
