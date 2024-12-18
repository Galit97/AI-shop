function resetCookies() {
    fetch('/api/cookies/resetCookies', {
        method: 'GET',
        credentials: 'same-origin'
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log(data.message);
    })["catch"](function (error) {
        console.error('Error resetting cookies:', error);
    });
    window.location.href = "/";
}
