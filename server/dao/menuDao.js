var BaseDao = require('./baseDao');
var $sql = require('./menuSqlMapping');


module.exports = {
	queryByRestId: function (req, res, next) {
        var restid = req.query.restid;
        BaseDao.pool.getConnection(function(err, connection) {
            connection.query($sql.queryByRestId, restid, function(err, result) {
                let json = {
                    errnum: 10000,
                    errmsg: '',
                    data: {}
                }

                json.data.menu = result

                BaseDao.jsonWrite(res, json);
                connection.release();
            });
        });
    },
    insertOrUpdate: function (req, res, next) {
        var params = req.query || req.params;
        BaseDao.pool.getConnection(function(err, connection) {
            if(params.foodid) {
                connection.query($sql.update, [params.restid, params.foodname, params.price, params.image, params.des, params.tag1, params.tag2 ? params.tag2 : null, params.tag3 ? params.tag3 : null, params.foodid], function(err, result) {
                    var json = {
                        errnum : 10000,
                        errmsg: ''
                    };
                
                    if(err) {
                        console.log(err)
                        json.errnum = 10002;
                        json.errmsg = '新增失败';
                    }
                    BaseDao.jsonWrite(res, json);
                    connection.release();

                });
            } else {
                connection.query($sql.insert, [params.restid, params.foodname, params.price, params.image, params.des, params.tag1, params.tag2 ? params.tag2 : null, params.tag3 ? params.tag3 : null], function(err, result) {
                    var json = {
                        errnum : 10000,
                        errmsg: ''
                    };
                
                    if(err) {
                        console.log(err)
                        json.errnum = 10002;
                        json.errmsg = '新增失败';
                    }
                    BaseDao.jsonWrite(res, json);
                    connection.release();

                });
            }
            
        });
    },
    delete: function (req, res, next) {
        var params = req.query || req.params;
        BaseDao.pool.getConnection(function(err, connection) {
            connection.query($sql.delete, [params.foodid], function(err, result) {
                var json = {
                    errnum : 10000,
                    errmsg: ''
                };
            
                if(err) {
                    console.log(err)
                    json.errnum = 10002;
                    json.errmsg = '删除失败';
                }
                BaseDao.jsonWrite(res, json);
                connection.release();

            });
        });
    },
};
