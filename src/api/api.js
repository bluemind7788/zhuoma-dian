import Axios from 'axios'
import { Message } from 'element-ui';

const Base_Url = 'http://localhost:8080'

export default {
	get(url, params, callback, failback) {
		Axios.get(url, {
			params: params
		}).then((res) => {
			if(res.data.errnum != 10000) {
		        Message({
					showClose: true,
					message: res.data.errmsg,
					type: 'error'
				});
				failback && failback(res.data)
				return;
			}
			callback && callback(res.data)
		})
	}
}