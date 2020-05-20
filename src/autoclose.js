
const permanentWhiteList = [
	'google.com',
	'mozilla.org'
];

var enabled = false;
var whiteList = permanentWhiteList;

function isHttp(url) {
	return url && url.substring(0, 4) === "http";
}

function getDomaineAndExtension(url) {
	const splitedBySlash = url.split("/");
	const splitedByDot = splitedBySlash[2].split(".");

	return splitedByDot.slice(-2).join(".");
}

function toggle(tab) {
	browser.tabs.query({})
		.then(tabs => {
			if (!enabled) {
				const currentDomains = tabs.filter(tab => isHttp(tab.url)).map(tab => getDomaineAndExtension(tab.url));
				whiteList = permanentWhiteList.concat(currentDomains);
				browser.browserAction.setIcon({ path: 'icons/close-enabled.png' });
				// console.log("enabling autoclose for", whiteList);
			} else {
				whiteList = permanentWhiteList;
				browser.browserAction.setIcon({ path: 'icons/close-disabled.png' });
				// console.log("disabling autoclose");
			}
			enabled = !enabled;
		});
}

browser.browserAction.onClicked.addListener(toggle);

function handleClose(id, change, tab) {
	if (!enabled || !isHttp(tab.url)) {
		return;
	}

	const domain = getDomaineAndExtension(tab.url);

	if (whiteList.indexOf(domain) === -1) {
		// console.log("autoclose", tab.url);
		browser.tabs.remove(tab.id);
	}
}

browser.tabs.onUpdated.addListener(handleClose);
