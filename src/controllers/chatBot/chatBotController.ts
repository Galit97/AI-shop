import 'dotenv/config';
import { Request, Response  } from "express";

export const chatBotPost = async (req: any, res: any) => {
    try{
        const {userMessage} = req.body;
        if (!userMessage)
            return res.status(400).json({ error: 'No user message provided.' });
        
        const response = await fetch("https://api.openai.com/v1/chat/completions",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: userMessage }],
            }),
        })
        
        const data = await response.json();
        if (!response.ok)
            return res.status(400).json({ error: data.error?.message });
        
        const botMessage = data.choices[0].message.content;
        res.json(botMessage);
    }
    catch(error: any){
        console.error(error);
        return res.status(500).json({ error: 'An error occurred.' });

}
}