// the users object
const users = {};

// converts users into a list
const usersList = (usersObj)=>{
	const list = [];
	Object.keys(usersObj).forEach(username=>{
		list.push({username, timestamp:usersObj[username].timestamp});
	})
	return list;
};

// console log with timestamp
function Log(message, data){
    console.log((new Date()).toISOString(),message, data);
};