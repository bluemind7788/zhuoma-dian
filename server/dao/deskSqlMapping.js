let desk = {
	queryByRestId: 'select * from desk where restid = ?',
	queryMaxNumByRestId: 'select max(desknum) from desk where restid = ?',
	insert: 'insert into desk(restid, desknum) values (?, ?)',

};

module.exports = desk;