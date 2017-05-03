var BaseDao = require('./baseDao');
var $sql = require('./userSqlMapping');

module.exports = {
	insert: function (req, res, next) {
        var params = req.query || req.params;
        BaseDao.pool.getConnection(function(err, connection) {
            connection.query($sql.insert, [params.username, params.userpassword, params.mobile], function(err, result) {
                var json = {
                    errnum : 10000,
                    errmsg: '',
                    data: {}
                };
                if(err) {
                    json.errnum = 10001;
                    json.errmsg = '注册失败'
                } else {
                    json.data.userid = result.insertId;
                    json.data.username = params.username;
                }
                BaseDao.jsonWrite(res, json);
                connection.release();
            });
        });
    },
    validate(req, res, next) {
    	var params = req.query || req.params;
        BaseDao.pool.getConnection(function(err, connection) {
            connection.query($sql.queryByUsernameAndPassword, [params.username, params.userpassword], function(err, result) {
            	var json = {}
            	if(result.length > 0) {
            		json.errnum = 10000;
            		json.errmsg = '';
            		json.data = {
            			userid: result[0].userid,
            			username: result[0].username
            		}
            	} else {
            		json.errnum = 10001;
            		json.errmsg = '用户名或密码错误';
            	}
                BaseDao.jsonWrite(res, json);
                connection.release();
            });
        });
    }
};
