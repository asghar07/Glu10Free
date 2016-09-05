Ti.include(Titanium.Filesystem.resourcesDirectory + "helpers/apiHelper.js");
Ti.include(Titanium.Filesystem.resourcesDirectory + "controls/RightMenu.js");
Ti.include(Titanium.Filesystem.resourcesDirectory + "constants/appConstants.js");
var globals = require('globals').Globals;
var styles = require('globals').Styles;

function createScanButton(context) {
	var row = Ti.UI.createTableViewRow({
		selectionStyle : 0,
	});

	var scanView = Ti.UI.createView({
		top : 0,
		height : (Ti.Platform.displayCaps.platformHeight / 3) - 5 * dp,
		width : (Ti.Platform.displayCaps.platformWidth )  * dp,
		backgroundColor : styles.home_button.flatColors.scan,
		backgroundSelectedColor : '#7a0576',
	});
	row.add(scanView);

	var icon = Ti.UI.createImageView({
		image : '/images/home-map@2x.png',
		height : 64 * dp,
		width : 64 * dp,
		hires : true,
		touchEnabled : false
	});
	scanView.add(icon);

	var lbl_title = Ti.UI.createLabel({
		color : styles.home_button.color,
		text : 'SCAN',
		font : styles.home_button.font,
		bottom : 25 * dp,
		touchEnabled : false
	});
	scanView.add(lbl_title);
	
	scanView.addEventListener('click', function(e){
		var Scanner = require('/controls/Scanner');
		var scanner = new Scanner();
	});

	//row.height = 150 * dp;
	Ti.API.info('row height: ' + row.height);

	return row;

}

function createCustomButton(context, btnProperties) {
	var btn_custom = Ti.UI.createView({
		top : 0,
		height : (Ti.Platform.displayCaps.platformHeight / 3) - 5 * dp,
		width : (Ti.Platform.displayCaps.platformWidth / 2) - 5 * dp,
		backgroundColor : btnProperties.backgroundColor,
		backgroundSelectedColor : styles.home_button.selectedBackgroundColor,
	});
	if (btnProperties.left) {
		btn_custom.left = btnProperties.left;
	} else {
		btn_custom.right = btnProperties.right;
	}

	var icon = Ti.UI.createImageView({
		image : btnProperties.image,
		height : 64 * dp,
		width : 64 * dp,
		hires : true,
		touchEnabled : false
	});
	btn_custom.add(icon);

	var lbl_title = Ti.UI.createLabel({
		color : styles.home_button.color,
		text : btnProperties.title,
		font : styles.home_button.font,
		bottom : 10 * dp,
		touchEnabled : false
	});
	btn_custom.add(lbl_title);

	return btn_custom;
}

function createHomeButtonsSecond(context, top) {
	var row = Ti.UI.createTableViewRow({
		selectionStyle : 0,
	});

	var btnView = Ti.UI.createView({
		top : 5 * dp,
		backgroundColor : 'transparent',
		height : Ti.UI.SIZE,
		width : Ti.Platform.displayCaps.platformWidth
	});
	row.add(btnView);
	//
	// Map
	//
	var btn_map = createCustomButton(context, {
		image : styles.home_button.flatIcons.favorites,
		title : 'Favorites',
		left : 5 * dp,
		backgroundColor: styles.home_button.flatColors.favorites,
	});
	btn_map.addEventListener('click', function(e) {
		var MapWin = require('/ui/handheld/android/Map');
		MapWin = new MapWin(null, false);
		MapWin.open();
	});
	btnView.add(btn_map);
	//
	// Elements
	//
	var btn_elements = createCustomButton(context, {
		image : styles.home_button.flatIcons.contact,
		title : 'Contact',
		right : 5 * dp,
		backgroundColor: styles.home_button.flatColors.contact,
	});
	btn_elements.addEventListener('click', function(e) {
		var ElementsWin = require('/ui/handheld/android/Elements');
		ElementsWin = new ElementsWin(null, false);
		ElementsWin.open();
	});
	btnView.add(btn_elements);

	return row;
}

function createHomeButtons(context) {
	var row = Ti.UI.createTableViewRow({
		selectionStyle : 'none',
		height : Ti.UI.SIZE
	});

	var btnView = Ti.UI.createView({
		top : 5 * dp,
		backgroundColor : 'transparent',
		height : Ti.UI.SIZE
	});
	row.add(btnView);
	//
	// News
	//
	var btn_news = createCustomButton(context, {
		image : styles.home_button.flatIcons.search,
		title : 'Search',
		left : 5 * dp,
		backgroundColor: styles.home_button.flatColors.search,
	});
	btn_news.addEventListener('click', function(e) {
		var NewsWin = require('/ui/handheld/android/News');
		NewsWin = new NewsWin(null, false);
		NewsWin.open();
	});
	btnView.add(btn_news);
	//
	// Products
	//
	var btn_products = createCustomButton(context, {
		image : styles.home_button.flatIcons.products,
		title : 'Products',
		right : 5 * dp,
		backgroundColor: styles.home_button.flatColors.products,
	});
	btn_products.addEventListener('click', function(e) {
		var ProductsWin = require('/ui/handheld/android/Products');
		ProductsWin = new ProductsWin(null, false);
		ProductsWin.open();
	});
	btnView.add(btn_products);

	return row;

}

function create_Table(context) {
	var table = Ti.UI.createTableView({
		showVerticalScrollIndicator : false,
		top : 0 * dp,
		height : 'auto',
		backgroundColor : 'transparent',
		separatorStyle : 0,
		seperatorColor: 'transparent',
	});
	var data = [];

	// LOGO VIEW
	var row1 = createScanButton(context);
	data.push(row1);
	// BUTTON VIEWS
	var rowButtons = createHomeButtons(context);
	data.push(rowButtons);
	var rowButtonsSecond = createHomeButtonsSecond(context);
	data.push(rowButtonsSecond);
	//
	table.setData(data);
	context.HomeWin.add(table);
}

function Home(argument) {
	return this.init.apply(this, arguments);
}

Home.prototype.init = function(argument, isFlyout) {
	var that = this;

	this.HomeWin = require('/ui/handheld/android/ParentView');
	this.HomeWin = new this.HomeWin();

	var lbl_title = Ti.UI.createLabel({
		text : argument.menuItem.title,
		font : {
			fontSize : 18 * dp,
			fontFamily : 'Montserrat',
			fontWeight : 'Bold'
		},
		color : '#fff'
	});
	this.HomeWin.headerView.add(lbl_title);
	//this.HomeWin.headerView.add(rightNavButton(this));
	// CREATE MENU VIEW
	this.menuView = createRightMenu(this);
	//this.HomeWin.add(this.menuView);REMOVE THIS!!!!
	this.isMenuShown = false;
	//CREATE TABLE
	create_Table(this);

	return this.HomeWin;

}

module.exports = Home;
