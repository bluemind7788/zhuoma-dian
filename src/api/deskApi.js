import API from './api'

export default {
	fetchDesksByRestId(params, callback) {
		API.get('/api/fetchDesksByRestId', params, callback)
	},
	addDesks(params, callback) {
		API.get('/api/addDesks', params, callback)
	},
}