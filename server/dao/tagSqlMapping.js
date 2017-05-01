let tag = {
	queryByRestId: 'select * from tag where restid = ? order by tagord asc',
	queryMaxOrdByRestId: 'select max(tagord) from tag where restid = ?',
	queryMaxOrdByRestId2: 'select tagid, tagord from tag where restid = ? and tagord = (select max(tagord) from tag where restid = ? and tagord < ?)',
	insert: 'insert into tag(restid, tagname, tagord) values (?, ?, ?)',
	deleteByTagId: 'delete from tag where tagid = ?',
	updateTag: 'UPDATE tag SET tagord = ? where tagid = ?',
};

module.exports = tag;