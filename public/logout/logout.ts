function resetCookies() {
    fetch('/api/cookies/resetCookies', {
        method: 'GET', 
        credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    })
    .catch(error => {
        console.error('Error resetting cookies:', error);
    });
    window.location.href = "/"; 
}