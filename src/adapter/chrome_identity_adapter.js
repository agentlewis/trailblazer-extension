// config
import config from '../config';

// helpers
import Promise    from 'promise';
import superagent from 'superagent';
import _          from 'lodash';

/**
 * Creates a new ChromeIdentityAdapter
 *
 * @class ChromeIdentityAdapter
 * @classdesc
 * Maintains the authenticated state of the extension and provides a common
 * interface to authenticate with the chrome.identity.* APIs
 */

export default class ChromeIdentityAdapter {

  /**
  * Consults chrome.storage.sync to check if a token already exists, resolving
  * the returned promise if it does. If a token is not already stored, the
  * sign in flow will be launched.
  *
  * Then, if resolved (i.e. on a successful sign in), the callback will be
  * passed an object containing details about the access token;
  * ```javascript
  * {
  *   access_token: "string",
  *   token_type: "bearer",
  *   expires_in: number(seconds)
  * }
  * ```
  *
  * If rejected (user denies access or the prompt is closed) the callback will
  * either be passed an object detailing the rejection;
  * ```javascript
  * {
  *   error: "error code",
  *   error_description: "description"
  * }
  * ```
  * in the case of explicit denial, or the exception in the event of some
  * other failure.
  *
  * @function ChromeIdentityAdapter#signIn
  * @returns {Promise}
  */
  signIn() {
    var redirect = encodeURIComponent("https://" + chrome.runtime.id + ".chromiumapp.org/")
      , host     = config.api.host
      , version  = config.api.version
      , clientId = config.api.clientId;

    var params = "?" + [
      "client_id="+clientId,
      "response_type=token",
      "redirect_uri="+redirect
    ].join("&");

    var authUrl = [host, "oauth/authorize"].join("/") + params;

    var promise = new Promise((resolve, reject) => {
      this.getToken().then((token) => {
        resolve(token);
      }, () => {
        chrome.identity.launchWebAuthFlow({ url: authUrl, interactive: true }, (redirectUrl) => {
          if (redirectUrl) {
            // Slice up the redirect and parse the response object from url hash
            var response = redirectUrl.substring(redirectUrl.indexOf("#") + 1)
              , responseObject = {};

            _.each(response.split("&"), (item) => {
              var i = item.split("=");
              responseObject[i[0]] = i[1];
            });

            if (responseObject.access_token) {
              // If we have an access token then add some useful properties,
              // store it, and resolve the promise with it
              responseObject.expires_in = parseInt(responseObject.expires_in);
              responseObject.expires_at = Date.now() + responseObject.expires_in;

              this.storeToken(responseObject);
              resolve(responseObject);
            } else {
              // Otherwise, reject it with the details
              reject(responseObject);
            }
          } else {
            reject(chrome.runtime.lastError);
          }
        }); //chrome.identity.launchWebAuthFlow
      }); //getToken();
    }); //promise

    return promise;
  }

  /**
  * Terminate the currently authenticated session. Returns a promise which
  * resolves if the token was successfully revoked (passing no parameters).
  *
  * @function ChromeIdentityAdapter#signOut
  * @returns {Promise}
  */
  signOut() {
    var promise = new Promise((resolve, reject) => {
      chrome.storage.sync.get("token", (token) => {
        if (token.token) {
          var token = JSON.parse(token.token);

          this._clearToken().then(resolve);

          // Best effort
          superagent.post(config.api.host + "/oauth/revoke")
            .send({ token: token.access_token })
            .set("Content-Type", "application/x-www-form-urlencoded")
            .end();
        } else {
          resolve();
        }

        var signOutUrl = [config.api.host, "sign_out"].join("/");
        chrome.identity.launchWebAuthFlow({ url: signOutUrl, interactive: false }, (url) => {
          // Ignore everything
          console.log("The warning from chrome is fine - we don't want user intervention here as we're terminating a session inside the auth frame",
            chrome.runtime.lastError);
        });

      }); //chrome.storage.sync.get
    }); //promise

    return promise;
  }

  /**
  * Check whether there is a valid token available. Promise will always
  * resolve, passing a single boolean parameter indicating whether there is a
  * token available or not.
  * @function ChromeIdentityAdapter#isSignedIn
  * @returns {Promise}
  */
  isSignedIn() {
    return new Promise((resolve, reject) => {
      this.getToken().then(
          () => { resolve(true); },
          () => { resolve(false); })
    });
  }

  /**
  * @function ChromeIdentityAdapter#profile
  * @TODO Get the currently authenticated person's profile information
  */
  profile() {};

  /**
  * Retrieves the token stored in chrome.storage.sync
  * @function ChromeIdentityAdapter#getToken
  * @returns {Promise} A promise which resolves with the token object if it
  * was found
  */
  getToken() {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get("token", (token) => {
        if (token.token) {
          resolve(JSON.parse(token.token));
        } else if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          reject();
        }
      }); //chrome.storage.sync.get
    }); //promise
  }

  /**
  * Stores the provided token in chrome.storage.sync
  * @function ChromeIdentityAdapter#storeToken
  * @param {Object} tokenObject - the token passed to {@link
  * ChromeIdentityAdapter#signIn}'s `resolve`
  * @returns {Promise} A promise which resolves if chrome.runtime.lastError is
  * not set
  */
  storeToken(tokenObject) {
    return new Promise((resolve, reject) => {
      var userUrl = [
        config.api.host,
        config.api.nameSpace,
        config.api.version,
        "me"
      ].join("/");

      superagent("GET", userUrl)
        .set("Authorization", "Bearer " + tokenObject.access_token)
        .set("Accept", "application/json")
        .end((response) => {
          tokenObject.user_id = response.body.id;
          chrome.storage.sync.set({ token: JSON.stringify(tokenObject) }, () => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            } else {
              resolve();
            }
          }); //chrome.storage.sync.set
        });
    }); //promise
  }

  /**
  * Clears the stored token from chrome.storage.sync
  * @function ChromeIdentityAdapter#_clearToken
  * @returns {Promise} A promise which resolves if chrome.runtime.lastError is
  * not set
  * @private
  */
  _clearToken() {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.remove("token", () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      }); //chrome.storage.sync.remove
    }); //promise
  }

};
