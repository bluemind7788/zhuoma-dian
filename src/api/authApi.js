import API from './api'

export default {
	register(params, callback) {
		// callback(MockMenu)
		API.get('/api/register', params, callback)
	},
	login(params, callback) {
		API.get('/api/login', params, callback)
	}
}