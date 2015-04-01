
/**
 * Load the cordova library if the device is on Android but not the thd emulator
 */
//if (navigator.userAgent.toLowerCase().match('android') && !navigator.userAgent.toLowerCase().match('thdemulate')) {
if(window.CordovaTattleTale != undefined){
//		document.write("<script src='js/cordova/cordova.js'><\/script>");
	document.write("<script src='https://content-qa.homedepot.com/MobileFramework/firstphone/1.0/cordova/cordova.js'><\/script>");
}

document.addEventListener("deviceready", firstphoneapi_init, false);

function firstphoneapi_init() {
	JSInterface.initInterface();
	mobileFramework.internal.STORE = JSInterface.getStoreNumber();
	if (mobileFramework.internal.STORE_CALLBACK != null) {
		mobileFramework.internal.STORE_CALLBACK(JSInterface.getStoreNumber());
	}
	
	if (mobileFramework.internal.SCAN_CALLBACK != null) {
		JSInterface.setScanCallBack(mobileFramework.internal.SCAN_CALLBACK.name);
	}
}

/****************************************************************************************
 * Start of public API
 ***************************************************************************************/

/* encapsulated within mobileFramework object */

/* check to see if the object has already been instantiated (by some other framework script) */
if (window.mobileFramework == undefined){
	window.mobileFramework = {};
}

/* generic error code for use when calling error callbacks in place of cordova */
mobileFramework.GENERIC_ERROR_CODE_FP = 99;


/**
 * Register a scanner callback
 * @param callback Callback that is called when a scan is made.  Has the prototype function(skuAsString). 
 * 		  this function must be global as it will be called globally
 */
mobileFramework.registerScanCallback = function(callback){
	
	mobileFramework.internal.SCAN_CALLBACK = callback;
	
	if (typeof JSInterface == 'undefined'){
		console.log("mobileFramework.registerScanCallback(): Attempted to access device layer while missing device integration layer...");
	}else{
		JSInterface.setScanCallBack(callback.name);
	}
	
};

/**
 * Register a store callback.  Retrieves the store number as a string
 * @param callback Callback that is called when the store is loaded. Has the prototype function(storeNumAsString) 
 */
mobileFramework.registerStoreCallback = function(callback) {
	
	mobileFramework.internal.STORE_CALLBACK = callback;
	
	if (typeof JSInterface == 'undefined'){
		console.log("mobileFramework.registerStoreCallback(): Attempted to access device layer while missing device integration layer...");
	}else{
		callback(JSInterface.getStoreNumber());
	}
	
};

/**
 * Launches a local or remotely hosted video in the native player
 * @param url Url of the video.  Http://, https://, file://
 */
mobileFramework.showVideo = function(url) {
	
	if (typeof JSInterface == 'undefined'){
		console.log("mobileFramework.showVideo(): Attempted to access device layer while missing device integration layer...");
		return false;
	}
	
	console.log("Starting video " + url);
	if (typeof url !== 'undefined') {
		text = JSInterface.startVideo(url);
	}
	console.log("End video response: " + text);
};

/**
 * Captures a video with a max duration 
 * @param duration Max duration of the video
 * @param success Called with the full path to the video.  Has the prototype function(pathAsString)
 * @param error Called on error.  
 */
mobileFramework.captureVideo = function(duration, success, error) {
	
	if (typeof JSInterface == 'undefined' || typeof navigator.device == 'undefined' || typeof navigator.device.capture == 'undefined'){
		console.log("mobileFramework.captureVideo(): Attempted to access device layer while missing device integration layer...");
		error({code: mobileFramework.GENERIC_ERROR_CODE_FP, message: "Device integration layer missing. Possibly running as web only."});
		return false;
	}
	
	// Launch device video recording application,
	navigator.device.capture.captureVideo(function(mediaFiles) {
		if (mediaFiles.length != 1) return;
		success(mediaFiles[0].fullPath);
	}, error, {
		limit : 1 , duration : duration
	});
};

/**
 * Captures a picture
 * @param success Called with the full path of the picture taken.  Has the prototype function(pathAsString)
 * @param error Called on error
 */
/* commented due to current bug. To be fixed in subsequent release */
//mobileFramework.captureImage = function(success, error) {
//    navigator.device.capture.captureImage(success, error, {limit: 1});
//};

/**
 * Creates a large thumbnail for the given video
 * This implementation is NOT thread-safe 
 * @param videoPath Full path to the video
 * @param generateBase64 If true, generates the base64 encoded image and supplies it via the success function
 * @param success Called when the new thumbnail is created.  This will return a base64 encoded image as a string.
 * 				Set an <img> src tag to this to display the image
 * @param failure Called when an error occurs generating the base64 image
 * @returns String device filesystem path or null if bridge to device doesn't exist
 */
mobileFramework.createLargeThumbnail = function(videoPath, generateBase64, success, failure) {
	
	if (typeof JSInterface == 'undefined' || typeof window.requestFileSystem == 'undefined'){
		console.log("mobileFramework.createLargeThumbnail(): Attempted to access device layer while missing device integration layer...");
		failure({code: mobileFramework.GENERIC_ERROR_CODE_FP, message: "Device integration layer missing. Possibly running as web only."});
		return null;
	}
	
	var thumbnailPath = JSInterface.createLargeThumbnail(videoPath);
	console.log("Path to video thumbnail: " + thumbnailPath);
	
	if (generateBase64){
		// Now function will read a video on the file system and return a thumbnail
		// in a base64 encoded string. You can use this to set <img> tags in your application 
		mobileFramework.internal.LOCAL_FILE = thumbnailPath;
		mobileFramework.internal.FILE_READ_CALLBACK = success;
		mobileFramework.internal.FILE_READ_CALLBACK_FAIL = failure;
		console.log("Local file: " + mobileFramework.internal.LOCAL_FILE);
	    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, mobileFramework.internal.gotFS, failure);
	}
	
    return thumbnailPath;
};

/**
 * Creates a small thumbnail for the given video
 * This implementation is NOT thread-safe 
 * @param videoPath Full path to the video
 * @param width Width of the image
 * @param height Height of the image
 * @param generateBase64 If true, generates the base64 encoded image and supplies it via the success function
 * @param success Called when the new thumbnail is created.  This will return a base64 encoded image as a string.
 * 				Set an <img> src tag to this to display the image
 * @param failure Called when an error occurs generating the base64 image
 * @returns String device filesystem path or null if bridge to device dosen't exist
 */
mobileFramework.createSmallThumbnail = function (videoPath, width, height, generateBase64, success, failure) {
	
	if (typeof JSInterface == 'undefined' || typeof window.requestFileSystem == 'undefined'){
		console.log("mobileFramework.createSmallThumbnail(): Attempted to access device layer while missing device integration layer...");
		failure({code: mobileFramework.GENERIC_ERROR_CODE_FP, message: "Device integration layer missing. Possibly running as web only."});
		return null;
	}
	
	var thumbnailPath = JSInterface.createSmallThumbnail(videoPath, width, height);
	console.log("Path to video thumbnail: " + thumbnailPath);
	
	if (generateBase64){
		// Now function will read a video on the file system and return a thumbnail
		// in a base64 encoded string. You can use this to set <img> tags in your application 
		mobileFramework.internal.LOCAL_FILE = thumbnailPath;
		mobileFramework.internal.FILE_READ_CALLBACK = success;
		mobileFramework.internal.FILE_READ_CALLBACK_FAIL = failure;
		console.log("Local file: " + mobileFramework.internal.LOCAL_FILE);
	    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, mobileFramework.internal.gotFS, failure);
	}
	
    return thumbnailPath;
};

/**
 * Gets the logged-in associate's LDAP/SSO info
 * @returns JSON object with LDAP info
 */
mobileFramework.getUserData = function() {
	if (typeof JSInterface == 'undefined'){
		console.log("mobileFramework.getUserData(): Attempted to access device layer while missing device integration layer...");
		return null;
	}else{
		return JSON.parse(JSInterface.getUserData());
	}
	
};

/**
 * Gets the device information
 * @returns JSON object with device info
 */
mobileFramework.getDeviceData = function() {
	if (typeof JSInterface == 'undefined'){
		console.log("mobileFramework.getDeviceData(): Attempted to access device layer while missing device integration layer...");
		return null;
	}else{
		return JSON.parse(JSInterface.getDeviceData());	
	}
};

/**
 * Uploads a file on the filesystem to a server
 * @param filePath Path on the device file system
 * @param fileName The name of the file
 * @param uploadPath Server path for the upload
 * @param params Data to be uploaded to the server
 * @param success Callback function upon success
 * @param failure Callback function upon failure
 * @param progress Callback function for providing upload progress
 */
mobileFramework.uploadFile = function(filePath, fileName, uploadPath, params, success, failure, progress){
	
	if (typeof FileTransfer == 'undefined' ){
		console.log("mobileFramework.uploadFile(): Attempted to access device layer while missing device integration layer...");
		failure({code: mobileFramework.GENERIC_ERROR_CODE_FP, message: "Device integration layer missing. Possibly running as web only."});
		return null;
	}
	
	console.log("Attempting File Upload...");
	console.log("File Path: " + filePath);
	console.log("File Name: " + fileName);
	console.log("Upload Path: " + uploadPath);
	console.log("Params: " + JSON.stringify(params));
	
	var options = new FileUploadOptions();
	options.fileKey = "file";
	options.fileName = fileName;
	options.params = params;

	var ft = new FileTransfer();
	
	ft.onprogress = function(progressEvent) {
	    if (progressEvent.lengthComputable) {
	    	progress(progressEvent.loaded / progressEvent.total);
	    } else {
	    	progress();
	    }
	};
	
	ft.upload(filePath, encodeURI(uploadPath), success, failure, options);
};

/****************************************************************************************
 * End of public API
 ***************************************************************************************/

/****************************************************************************************
 * Internal variables
 ***************************************************************************************/
if (mobileFramework.internal == undefined){
	mobileFramework.internal = {};
}

mobileFramework.internal.LOCAL_FILE = null;
mobileFramework.internal.STORE = null;
mobileFramework.internal.FILE_READ_CALLBACK = null;
mobileFramework.internal.FILE_READ_CALLBACK_FAIL = null;
mobileFramework.internal.STORE_CALLBACK = null;
mobileFramework.internal.SCAN_CALLBACK = null;


/****************************************************************************************
 * Internal use for reading files
 ***************************************************************************************/
mobileFramework.internal.gotFS = function(fileSystem) {
    fileSystem.root.getFile(mobileFramework.internal.LOCAL_FILE, null, mobileFramework.internal.gotFileEntry, mobileFramework.internal.FILE_READ_CALLBACK_FAIL);
};

mobileFramework.internal.gotFileEntry = function(fileEntry) {
    fileEntry.file(mobileFramework.internal.gotFile, mobileFramework.internal.FILE_READ_CALLBACK_FAIL);
};

mobileFramework.internal.gotFile = function(file){
	mobileFramework.internal.readDataUrl(file);
};

mobileFramework.internal.readDataUrl = function(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        console.log("Read as data URL");
        console.log(evt.target.result);
        // Call the view new video so we can review it.
        // This will be base 64 encoded so make sure your method can handle it.
        mobileFramework.internal.FILE_READ_CALLBACK(evt.target.result);
    };
    reader.readAsDataURL(file);
};
