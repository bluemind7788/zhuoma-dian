var BaseDao = require('./baseDao');
var $sql = require('./restSqlMapping');

module.exports = {
	insert: function (req, res, next) {
        var params = req.query || req.params;
        BaseDao.pool.getConnection(function(err, connection) {
            connection.query($sql.insert, [params.restname, params.telephone, params.mobile, params.address], function(err, result) {
                var json = {
                	errnum : 10000,
                	errmsg: ''
                };
                if(!result.insertId) {
                	json.errnum = 10002;
                	json.errmsg = '新增失败';
                }
                BaseDao.jsonWrite(res, json);
                connection.release();

            });
        });
    },
    update: function (req, res, next) {
        var params = req.query || req.params;
        BaseDao.pool.getConnection(function(err, connection) {
            connection.query($sql.update, [params.restname, params.telephone, params.mobile, params.address, params.restid], function(err, result) {
                var json = {
                	errnum : 10000,
                	errmsg: ''
                };
         
                BaseDao.jsonWrite(res, json);
                connection.release();

            });
        });
    },
    queryAll: function (req, res, next) {
        var params = req.query || req.params;
        BaseDao.pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, params.userid, function(err, result) {
                var json = {
                	errnum : 10000,
                	errmsg: '',
                	data: {
                		list: result
                	}
                };
                BaseDao.jsonWrite(res, json);
                connection.release();

            });
        });
    },
    queryByRestId: function (req, res, next) {
        var params = req.query || req.params;
        BaseDao.pool.getConnection(function(err, connection) {
            connection.query($sql.queryByRestId, params.restid, function(err, result) {
                var json = {
                	errnum : 10000,
                	errmsg: '',
                	data: {}
                };
                if(result.length > 0) {
                	json.data = result[0]
                }
                BaseDao.jsonWrite(res, json);
                connection.release();

            });
        });
    },
};
