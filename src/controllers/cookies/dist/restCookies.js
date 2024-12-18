"use strict";
exports.__esModule = true;
exports.resetCookies = void 0;
function resetCookies(req, res) {
    try {
        res.clearCookie('client', { httpOnly: true, path: '/' });
        res.clearCookie('user', { httpOnly: true, path: '/' });
        res.status(200).json({ message: "Cookies have been reset" });
    }
    catch (error) {
        console.error("Error resetting cookies:", error.message);
        res.status(500).json({ error: error.message });
    }
}
exports.resetCookies = resetCookies;
