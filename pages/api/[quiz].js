import { getQuiz, deleteQuiz, updateQuizName } from "../../firebase/db";

export default async function handler(req, res) {
    try {
        switch (req.method) {
            case "GET":
                const id = await getQuiz(req.quiz);
                res.status(200).json({ id: id });
            
            case "DELETE":
                await deleteQuiz(req.quiz);
                res.status(204).end();
            
            case "PATCH":
                await updateQuizName(req.quiz, req.body.name);
                res.status(204).end();
    
            default:
                res.status(405).json({ error: `${req.method} not allowed` });
        }
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}