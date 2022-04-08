/** PERMISSION EXAMPLE **/
import Permission from './Permission';

Permission.permissionControl({
	permission: 'LOG_CHAT',
}).then((response) => {
	if (response.response) {
		//true response
	} else {
		//false response
	}
});
