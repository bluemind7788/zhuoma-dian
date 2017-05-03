import MockMenu from './mock/menu.js'
import API from './api'

export default {
	fetchMenu(params, callback) {
		// callback(MockMenu)
		API.get('/api/menu', params, callback)
	},
	addOrUpdateFood(params, callback) {
		API.get('/api/addOrUpdateFood', params, callback)
	},
	deleteFood(params, callback) {
		API.get('/api/deleteFood', params, callback)
	},
}