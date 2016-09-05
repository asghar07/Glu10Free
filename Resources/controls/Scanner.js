var scanditsdk = require("com.mirasense.scanditsdk");

// disable the status bar for the camera view on the iphone and ipad
if (Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad') {
	Titanium.UI.iPhone.statusBarHidden = true;
}

function createPicker() {
	var picker = scanditsdk.createView({
		width : "100%",
		height : "100%"
	});
	picker.init("cYArejEDEeKE/iycRYYGFLpSiZz9C0IPycvI21tHmcg", 0);
	picker.showSearchBar(true);
	picker.showToolBar(true);
	picker.setSuccessCallback(function(e) {
		alert("success (" + e.symbology + "): " + e.barcode);
	});
	picker.setCancelCallback(function(e) {
		closeScanner();
	});
	return picker;
}

function Scanner() {
	return this.init.apply(this, arguments);
}

Scanner.prototype.init = function(args) {
	var that = this;
	var win = Titanium.UI.createWindow({
		title : 'Scandit SDK',
		navBarHidden : true
	});
	var picker = createPicker();
	win.add(picker);
	win.addEventListener('open', function(e) {
		if (Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad') {
			picker.setOrientation(Ti.UI.orientation);
		} else {
			picker.setOrientation(win.orientation);
		}
		picker.setSize(Ti.Platform.displayCaps.platformWidth, Ti.Platform.displayCaps.platformHeight);
		picker.startScanning();
	});
	win.open();
	var closeScanner = function() {
		if (picker != null) {
			picker.stopScanning();
			win.remove(picker);
		}
		win.close();
	}

	Ti.Gesture.addEventListener('orientationchange', function(e) {
		win.orientationModes = [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];
		if (picker != null) {
			picker.setOrientation(e.orientation);
			picker.setSize(Ti.Platform.displayCaps.platformWidth, Ti.Platform.displayCaps.platformHeight);
			// You can also adjust the interface here if landscape should look
			// different than portrait.
		}
	});
	return win;
}

module.exports = Scanner;
