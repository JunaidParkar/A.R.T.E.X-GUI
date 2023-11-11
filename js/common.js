document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && (event.key === 'r' || event.code === 'KeyR')) {
        event.preventDefault();
    }
});
