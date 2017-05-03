let rest = {
	insert: 'insert into rest(restname, telephone, mobile, address, userid) values (?, ?, ?, ?, ?)',
	update: 'UPDATE rest SET restname = ?, telephone = ?, mobile = ?, address = ? where restid = ? ',
	queryAll: 'select * from rest where userid = ?',
	queryByRestId: 'select * from rest where restid = ?'
};

module.exports = rest;