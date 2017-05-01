let order = {
	insert: 'INSERT INTO zorder(restid, deskid, customerid, zordersaletime, totalprice, zorderstatus) VALUES (?, ?, ?, ?, ?, ?);',
	queryByCustomerid: 'select f.foodid, f.foodname, s.saleid, s.num, s.price, s.salestatus, z.zorderid from food f INNER JOIN sale s ON s.foodid = f.foodid INNER JOIN zorder z ON z.zorderid = s.zorderid AND customerid = ? and deskid = ? and zorderstatus = ?',
	queryById: 'select f.foodid, f.foodname, s.saleid, s.num, s.price, s.salestatus from food f INNER JOIN sale s ON s.foodid = f.foodid INNER JOIN zorder z ON z.zorderid = s.zorderid AND z.zorderid = ?',
	queryByRestIdAndStatus: 'select d.desknum, f.foodid, f.foodname, s.saleid, s.num, s.price, s.salestatus from food f INNER JOIN sale s ON s.foodid = f.foodid AND s.salestatus IN(0,1) INNER JOIN zorder z ON z.zorderid = s.zorderid AND z.restid = ? INNER JOIN desk d ON d.deskid = z.deskid',
	queryOrderDetails: 'select * from zorder zo, desk d, sale s, food f where zo.restid = ? and zordersaletime > ? and zordersaletime < ? and zo.deskid = d.deskid and s.zorderid = zo.zorderid and f.foodid = s.foodid',

};

module.exports = order;