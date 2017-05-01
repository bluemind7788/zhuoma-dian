let menu = {
	queryByRestId: 'select * from food where restid = ?',
	deleteTag1: 'update food set tag2 = NULL where tag1 = ?',
	deleteTag2: 'update food set tag2 = NULL where tag2 = ?',
	deleteTag3: 'update food set tag3 = NULL where tag3 = ?',
	insert: 'insert into food(restid, foodname, price, image, des, tag1, tag2, tag3) values (?, ?, ?, ?, ?, ?, ?, ?)',
	delete: 'delete from food where foodid = ?',
};

module.exports = menu;