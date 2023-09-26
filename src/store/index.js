import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      storeData: [],
  },
  mutations: {
      setdata(state, payload) {
          if(payload.index !== null)
          {
              state.storeData.splice(payload.index,1,payload)
          }
          else{
              state.storeData.push(payload);
          }
         
          localStorage.setItem('storeData', JSON.stringify(state.storeData))
      },
      markdata(state, payload) {
          state.storeData = state.storeData.map(element => element.id === payload.id ? payload : element)
          localStorage.setItem('storeData', JSON.stringify(state.storeData))
      },
      eliminardata(state, payload) {
          console.log(payload);
          state.storeData = state.storeData.filter(element => element.id !== payload)
          localStorage.setItem('storeData', JSON.stringify(state.storeData))
      },
      cargarLocalStorage(state, payload) {
          state.storeData = payload
      }
  },
  actions: {
    setdata({ commit }, data) {
          commit('setdata', data)
      },
      markdata({ commit }, data) {
          commit('markdata', data)
      },
      eliminardata({ commit }, iddata) {
          commit('eliminardata', iddata)
      },
      cargarLocalStorage({ commit }) {
          if (localStorage.getItem('storeData')) {
              commit('cargarLocalStorage', JSON.parse(localStorage.getItem('storeData')))
              return
          }
          localStorage.setItem('storeData', JSON.stringify([]))
      }
  },
})
