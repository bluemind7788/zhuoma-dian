let user = {
	insert: 'insert into user(username, userpassword, mobile) values (?, ?, ?)',
	queryByUsernameAndPassword: 'select * from user where username = ? and userpassword = ?',
};

module.exports = user;