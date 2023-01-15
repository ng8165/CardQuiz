import { deleteQuizCard, updateQuizCard } from "../../firebase/db";

export default async function handler(req, res) {
    try {
        switch (req.method) {
            case "DELETE":
                await deleteQuizCard(req.quiz, req.card);
                res.status(204).end();
            
            case "PATCH":
                await updateQuizCard(req.quiz, req.card, req.body.card);
                res.status(204).end();
    
            default:
                res.status(405).json({ error: `${req.method} not allowed` })
        }
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}

