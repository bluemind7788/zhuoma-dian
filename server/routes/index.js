var restDao = require('../dao/restDao');
var menuDao = require('../dao/menuDao');
var orderDao = require('../dao/orderDao');
// var saleDao = require('../dao/saleDao');
var userDao = require('../dao/userDao');
var deskDao = require('../dao/deskDao');
var tagDao = require('../dao/tagDao');

module.exports = function(app) {
    app.get('/api/register', function(req, res, next) {
        userDao.insert(req, res, next);
    });
    app.get('/api/login', function(req, res, next) {
        userDao.validate(req, res, next);
    });
    app.get('/api/addRest', function(req, res, next) {
        restDao.insert(req, res, next);
    });
    app.get('/api/updateRest', function(req, res, next) {
        restDao.update(req, res, next);
    });
    
    app.get('/api/fetchRestList', function(req, res, next) {
        restDao.queryAll(req, res, next);
    });
    app.get('/api/fetchByRestId', function(req, res, next) {
        restDao.queryByRestId(req, res, next);
    });
    app.get('/api/fetchDesksByRestId', function(req, res, next) {
        deskDao.queryByRestId(req, res, next);
    });
    app.get('/api/addDesks', function(req, res, next) {
        deskDao.insert(req, res, next);
    });
    app.get('/api/fetchTagsByRestId', function(req, res, next) {
        tagDao.queryByRestId(req, res, next);
    });
    app.get('/api/addTag', function(req, res, next) {
        tagDao.insert(req, res, next);
    });
    app.get('/api/deleteTag', function(req, res, next) {
        tagDao.deleteByTagId(req, res, next);
    });
    app.get('/api/upgradeTag', function(req, res, next) {
        tagDao.upgradeTag(req, res, next);
    });
    app.get('/api/degradeTag', function(req, res, next) {
        tagDao.degradeTag(req, res, next);
    });
    // app.get('/api/restinfo', function(req, res, next) {
    //     restDao.queryById(req, res, next);
    // });
    app.get('/api/menu', function(req, res, next) {
        menuDao.queryByRestId(req, res, next);
    });
    app.get('/api/addFood', function(req, res, next) {
        menuDao.insert(req, res, next);
    });
    app.get('/api/deleteFood', function(req, res, next) {
        menuDao.delete(req, res, next);
    });
    // app.get('/api/saveorder', function(req, res, next) {
    //     orderDao.saveOrder(req, res, next);
    // });

    // app.get('/api/getOrderByCustId', function(req, res, next) {
    //     orderDao.queryOrderByCustomerId(req, res, next);
    // });

    // app.get('/api/queryOrderById', function(req, res, next) {
    //     orderDao.queryOrderById(req, res, next);
    // });
    
    app.get('/api/getOrderByRestIdAndStatus', function(req, res, next) {
        orderDao.queryByRestIdAndStatus(req, res, next);
    });
    app.get('/api/fetchOrderDetails', function(req, res, next) {
        orderDao.queryOrderDetails(req, res, next);
    });
    // app.get('/api/updateSaleStatus', function(req, res, next) {
    //     saleDao.updateSaleStatus(req, res, next);
    // });

    // app.get('/api/deleteSale', function(req, res, next) {
    //     saleDao.deleteSale(req, res, next);
    // });
    
    // app.get('/api/saveSale', function(req, res, next) {
    //     saleDao.saveSale(req, res, next);
    // });
};
