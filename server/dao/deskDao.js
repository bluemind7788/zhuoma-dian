var BaseDao = require('./baseDao');
var $sql = require('./deskSqlMapping');

module.exports = {
    queryByRestId: function (req, res, next) {
        var params = req.query || req.params;
        BaseDao.pool.getConnection(function(err, connection) {
            connection.query($sql.queryByRestId, params.restid, function(err, result) {
                var json = {
                	errnum : 10000,
                	errmsg: '',
                	data: []
                };
                if(result.length > 0) {
                	json.data = result
                }
                BaseDao.jsonWrite(res, json);
                connection.release();

            });
        });
    },
    insert: function (req, res, next) {
        var params = req.query || req.params;

        BaseDao.pool.getConnection(function(err, connection) {
            connection.query($sql.queryMaxNumByRestId, params.restid, function(err, result) {
                console.log(result)
                var json = {
                    errnum : 10000,
                    errmsg: '',
                };
                var max = result.length > 0 ? result[0][Object.keys(result[0])[0]] : 0
                var sqlParamsEntity = [];
                for(var i=0;i<params.num;i++) {
                    sqlParamsEntity.push(BaseDao.getNewSqlParamEntity($sql.insert, [params.restid, max+i+1]));
                }

                BaseDao.execTrans(sqlParamsEntity, function(err, info){
                    if(err){
                        json.errnum = 10001;
                        json.errmsg = '失败'
                       console.error("事务执行失败");
                    }
                    connection.release();
                    BaseDao.jsonWrite(res, json);
                })

            });
        });

 
    },
};
