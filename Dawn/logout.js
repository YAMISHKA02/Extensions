let appid;
let token;
chrome.storage.local.get(["appid"], function (result) {
  if (
    result.appid !== undefined &&
    result.appid !== null &&
    result.appid !== ""
  ) {
    appid = result.appid;
  }
});
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("backButton").addEventListener("click", function () {
    window.history.back();
  });
  document.getElementById("logout-btn").addEventListener("click", function () {
    logout();
  });
  chrome.storage.local.get("token", (result) => {
    token = result.token;
  });
});
async function logout() {
  const version = chrome.runtime.getManifest().version;
  window.location.href = "signin.html";

  try {
    const response = await fetch(
      `https://www.aeropres.in/chromeapi/dawn/v1/userlogout/logout?app_v=${version}&appid=${appid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Berear " + token,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        response.message || `HTTP error! status: ${response.status}`
      );
    }
    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error(
      "There was a problem with the fetch operation:",
      error.message
    );
  }
}
