import 'es6-promise/auto'
import Vue from 'vue'
import { app, store } from './app'

import FastClick from 'fastclick'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import Vue from 'vue'
import VueQriously from 'vue-qriously'

Vue.use(ElementUI)

Vue.use(VueQriously)

FastClick.attach(document.body)

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
// store.replaceState(window.__INITIAL_STATE__)

// actually mount to DOM
app.$mount('#app')

// service worker
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
}
