import { Request, Response } from 'express';
export function resetCookies(req: Request, res: Response) {
    try {
        res.clearCookie('client', { httpOnly: true, path: '/' });
        res.clearCookie('user', { httpOnly: true, path: '/' });
        res.status(200).json({ message: "Cookies have been reset" });
    } catch (error: any) {
        console.error("Error resetting cookies:", error.message);
        res.status(500).json({ error: error.message });
    }
}