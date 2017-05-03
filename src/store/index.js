import Vue from 'vue'
import Vuex from 'vuex'

import { RestApi, TagApi, MenuApi, DeskApi } from '../api/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userid: '',
    username: '',
    restList: [],
    selectedRestId: null,
    selRestTags: [],
    selRestMenu: [],
    selRestDesks: []
  },

  getters: {
    userid (state) {
      return state.userid;
    },
    username (state) {
      return state.username;
    },
    restList(state) {
      return state.restList;
    },
    selectedRestId(state) {
      return state.selectedRestId;
    },
    selRestTags(state) {
      return state.selRestTags;
    },
    selRestMenu(state) {
      return state.selRestMenu;
    },
    selRestDesks(state) {
      return state.selRestDesks;
    },
  },

  actions: {
    userInit({ commit }) {
      let userid = localStorage.getItem('userid')
      let username = localStorage.getItem('username')
      if(userid && username) {
        commit('setUser', {userid: userid, username: username})
      }
    },
    setUser({ commit }, user) {
      localStorage.setItem('userid', user.userid);
      localStorage.setItem('username', user.username);
      commit('setUser', user)
    },
    clearUser({ commit }) {
      localStorage.clear();
      commit('setUser', {userid: '', username: ''})
    },
    fetchRestList({ commit, getters, dispatch }) {
      if(!getters.userid) {
        commit('setRestList', []);
        return;
      }
      RestApi.fetchRestList({
        userid: getters.userid,
      }, (res) => {
        if(res.errnum == 10000) {
          if(res.data.list && res.data.list.length > 0) {
            commit('setRestList', res.data.list);
            commit('setSelectedRestId', res.data.list[0].restid);
            dispatch('updateSelectedRestId', res.data.list[0].restid);
          }
          
        }
      })
    },
    updateSelectedRestId({ commit, getters, dispatch }, restId) {
      commit('setSelectedRestId', restId);
      dispatch('fetchTags');
      dispatch('fetchMenu');
      dispatch('fetchDesks');
    },
    fetchTags({ commit, getters }) {
      TagApi.fetchTagsByRestId({
        restid: getters.selectedRestId
      }, (res) => {
        commit('setSelTags', res.data)
        
      });
    },
    fetchMenu({ commit, getters }) {
      MenuApi.fetchMenu({
        restid: getters.selectedRestId
      }, (res) => {
        commit('setSelMenu', res.data.menu)
      });
    },
    fetchDesks({ commit, getters }) {
      DeskApi.fetchDesksByRestId({
        restid: getters.selectedRestId
      }, (res) => {
        commit('setSelDesks', res.data)
      })
    },
  },

  mutations: {
    setUser(state, { userid, username }) {
      state.userid = userid;
      state.username = username;
    },
    setRestList(state, restList) {
      state.restList = restList
    },
    setSelectedRestId(state, restId) {
      state.selectedRestId = restId
    },
    setSelTags(state, tags) {
      state.selRestTags = tags
    },
    setSelMenu(state, menu) {
      state.selRestMenu = menu
    },
    setSelDesks(state, desks) {
      state.selRestDesks = desks
    },
  },

  
})

export default store
