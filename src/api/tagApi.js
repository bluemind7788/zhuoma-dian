import API from './api'

export default {
	fetchTagsByRestId(params, callback) {
		API.get('/api/fetchTagsByRestId', params, callback)
	},
	addTag(params, callback) {
		API.get('/api/addTag', params, callback)
	},
	deleteTag(params, callback) {
		API.get('/api/deleteTag', params, callback)
	},
	upgradeTag(params, callback) {
		API.get('/api/upgradeTag', params, callback)
	},
	degradeTag(params, callback) {
		API.get('/api/degradeTag', params, callback)
	},
}