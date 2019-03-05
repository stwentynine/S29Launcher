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

var signIn = () => {
  return new Promise((resolve, reject) => {
    // check if form is filled up:
    if ($("#email-input").val() == "" || $("#password-input").val() == ""){
      reject("Form incomplete")
    }
    // all fields are filled up, continue by sending credentials to mojang auth server:
    else {
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://authserver.mojang.com/authenticate",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json",
          "cache-control": "no-cache",
        },
        "processData": false,
        "data": JSON.stringify({
          agent: {
            name: "Minecraft",
            version: 1
          },
          username: $("#email-input").val(),
          password: $("#password-input").val(),
          requestUser: true})
      }

      $.ajax(settings).done((response) => {
        console.log(response);
        // success, save information
        resolve(response);
      }).fail((xhr, status) => {
        if(xhr.status == 403) {
          reject("Invalid credentials")
        }
        else {
          reject("An Unknown error happend. Please create a new pull request on GitHub")
        }
      });
    }
  });
}

$("#login-in-button").click(async() => {
  try {
    var authToken = await signIn();
    // save auth tokens from mojang
    auth.set(authToken);
    // set signedIn to true
    auth.set("signedIn", true);
    alert("You have been successfully signed in");
    route.loadPath("index.html");
    updateActive("index.html");
    return;
  }
  catch (err){
    console.error(err);
    alert(err);
    return;
  }
});
