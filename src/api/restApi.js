import API from './api'

export default {
	addRest(params, callback) {
		API.get('/api/addRest', params, callback)
	},
	updateRest(params, callback) {
		API.get('/api/updateRest', params, callback)
	},
	fetchRestList(params, callback) {
		API.get('/api/fetchRestList', params, callback)
	},
	fetchByRestId(params, callback) {
		API.get('/api/fetchByRestId', params, callback)
	},
}