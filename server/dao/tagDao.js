var BaseDao = require('./baseDao');
var $sql = require('./tagSqlMapping');
var $menuSql = require('./menuSqlMapping');
    

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
                if(err) {
                    json.errnum = 10002;
                    json.errmsg = '查询分类失败'
                }
            	json.data = result
                BaseDao.jsonWrite(res, json);
                connection.release();

            });
        });
    },
    insert: function (req, res, next) {
        var params = req.query || req.params;

        BaseDao.pool.getConnection(function(err, connection) {
        	connection.query($sql.queryMaxOrdByRestId, params.restid, function(err, result) {
        		if(err) {
        			connection.release();
                	return;
                }
                var max = result.length > 0 ? result[0][Object.keys(result[0])[0]] : 0,
                	tagord = max+1;
                
	            connection.query($sql.insert, [params.restid, params.tagname, tagord], function(err, result) {

	                var json = {
	                    errnum : 10000,
	                    errmsg: '',
	                };

	                if(err) {
	                	json.errnum = 100001
	                	json.errmsg = '执行失败'
	                	json.data = err;
	                }
	                json.data = {tagid: result.insertId, tagord: tagord}
	                connection.release();
	                BaseDao.jsonWrite(res, json);
	            });
            });
        });
    },
    deleteByTagId: function (req, res, next) {
        var params = req.query || req.params;
        BaseDao.pool.getConnection(function(err, connection) {
            var json = {
                errnum : 10000,
                errmsg: '',
                data: []
            };

            var sqlParamsEntity = [];
            sqlParamsEntity.push(BaseDao.getNewSqlParamEntity($menuSql.deleteTag1, [params.tagid]));
            sqlParamsEntity.push(BaseDao.getNewSqlParamEntity($menuSql.deleteTag2, [params.tagid]));
            sqlParamsEntity.push(BaseDao.getNewSqlParamEntity($menuSql.deleteTag3, [params.tagid]));
            sqlParamsEntity.push(BaseDao.getNewSqlParamEntity($sql.deleteByTagId, [params.tagid]));

            BaseDao.execTrans(sqlParamsEntity, function(err, info){
                if(err){
                    json.errnum = 10001;
                    json.errmsg = '失败'
                   console.error("事务执行失败");
                }
                if(info.length > 0) {
                    json.data = info
                }
                connection.release();
                BaseDao.jsonWrite(res, json);
            })

        });
    },
    upgradeTag: function (req, res, next) {
        var params = req.query || req.params;
        BaseDao.pool.getConnection(function(err, connection) {
        	var json = {
            	errnum : 10000,
            	errmsg: '',
            };
            connection.query($sql.queryMaxOrdByRestId2, [params.restid, params.restid, params.tagord], function(err, result) {
            	console.log(result)
            	if(err || result.length == 0){
                    json.errnum = 10001;
                    json.errmsg = '失败'
                   connection.release();
                   BaseDao.jsonWrite(res, json);
                   return;
                }
                var switchTagId = result[0].tagid,
                	switchTagOrd = result[0].tagord;

                var sqlParamsEntity = [];
	        	sqlParamsEntity.push(BaseDao.getNewSqlParamEntity($sql.updateTag, [params.tagord, switchTagId]));
	        	sqlParamsEntity.push(BaseDao.getNewSqlParamEntity($sql.updateTag, [switchTagOrd, params.tagid]));

	        	BaseDao.execTrans(sqlParamsEntity, function(err, info){
	                if(err){
	                    json.errnum = 10001;
	                    json.errmsg = '失败'
	                   console.error("事务执行失败");
	                   connection.release();
	                   BaseDao.jsonWrite(res, json);
	                   return;
	                }

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

            });
        	

        });
    },
};
