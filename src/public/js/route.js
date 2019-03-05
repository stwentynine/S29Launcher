/*
 * MIT License
 *
 * Copyright (c) 2019 Mtechnik(Jamie Moore)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */


let route = {
selector: null,
paths: []
};

function Path(path, type="url", callback) {
	this.path = path;
	this.callback = callback;
	this.type = type;
}

const fs = require('fs');
const path = require('path');

// contains object in array?
var hasPath = (path) => {
	for (var key in route.paths) {
		if (route.paths[key].path == path) return key;
	}
	return undefined;
}

// check for jquery
if(window.jQuery) {
	throw("Error: jQuery is required");
}
else {
	document.addEventListener("DOMContentLoaded", (event) => {
		console.log("jQuery version: " + $().jquery || jQuery().jquery);
	});

}

route.addPath = (url, type, callback = () => {}) => { // default callback is blank
	route.paths.push(new Path(url, type, callback));
	callback();
};

route.loadPath = (file) => {
	if(route.selector === null) throw("Error: No selector for content");
	// check if path exists
	if(hasPath(file) === undefined) throw("Error: Path dosen't exist");

	let tempPath = route.paths[hasPath(file)];

	// get data from ajax:
	if(tempPath.type == "url") console.log("Type not supported yet");
	if(tempPath.type == "fs") {
		fs.access(path.join(__dirname, tempPath.path), fs.constants.R_OK, (err) => {
	  	if (err) throw err;

			// read file:
			fs.readFile(path.join(__dirname, tempPath.path), "utf-8", (err, data) => {
				if(err) throw err;
				// set content to data
				$(route.selector).html(data);
				// console.log success
				console.log("Navigation occured: " + file)
			});
		});
	}
	else throw("Error: Invalid path type")
}

route.setSelector = (selector) => {
	route.selector = selector;
}

route.disableAnchors = (clickEvent = () => {}) => {
	$(() => {
		// disable html anchors
		$("a").click((event) => {
			event.preventDefault();

			// check for href attribute
			if(!($(event.currenttarget).attr("href"))) {
				// navigate with spa
				route.loadPath($(event.currentTarget).attr("href")); // get href attribute

				clickEvent($(event.currentTarget).attr("href"));
			}
			else {
				console.log("lol")
			}
		});
	});
}
