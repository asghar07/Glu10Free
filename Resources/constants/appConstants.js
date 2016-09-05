var dp = "";
if (Titanium.Platform.Android) {
	dp = (Ti.Platform.displayCaps.dpi / 160);
} else {
	dp = 1;
}