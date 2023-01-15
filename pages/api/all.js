import { getAllQuizzes } from "../../firebase/db";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        res.status(405).json({ error: `${req.method} not allowed` });
        return;
    }

    try {
        const quizzes = await getAllQuizzes();
        res.status(200).json({ quizzes: quizzes });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}