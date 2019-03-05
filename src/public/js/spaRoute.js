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



const Store = require('electron-store');
const auth = new Store({
  name: "auth",
  fileExtension: "cfg",
  encryptionKey: "encryptionKey",
  defaults: {
    signedIn: false
  }
});

const shell = require("electron").shell;

route.setSelector(".spa-content");

// update .active class
var updateActive = (hrefSelector) => {
	// remove all classes
	$(".menu-area a").removeClass("active");
	// add new class
	$(".menu-area a[href=\"" + hrefSelector + "\"]").addClass("active");

	// update auth link
	if(auth.get("signedIn") == true) {
		$("#authLink").attr("href", "signout.html");
		$("#authLink").html("Sign Out");
	}
	else {
		$("#authLink").attr("href", "login.html");
		$("#authLink").html("Log In");
	}

  // update mc name
  updateName();
}

route.disableAnchors(updateActive);

route.addPath("login.html", "fs");
route.addPath("index.html", "fs");
route.addPath("instances.html", "fs");
route.addPath("soundcloud.html", "fs");
route.addPath("twitch.html", "fs");
route.addPath("signout.html", "fs");

// default page
route.loadPath("index.html");
// update log in status
$(() => {
	updateActive("index.html");
});

// get mc username and add to site
var updateName = () => {
  if(auth.get("signedIn") == true) {
    $("#mcName").text(auth.get("selectedProfile").name); // name stored in auth.cfg from mc api
    $("#mcFace").attr("src", "https://minotar.net/helm/" + auth.get("selectedProfile").id + "/100.png")
    $("#skinRender").attr("src", "https://minotar.net/armor/body/" + auth.get("selectedProfile").id + "/100.png")
    $("#userId").text(auth.get("selectedProfile").id)
  }
}
