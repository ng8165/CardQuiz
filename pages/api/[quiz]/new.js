import { addQuizCard } from "../../../firebase/db";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        res.status(405).json({ error: `${req.method} not allowed` });
        return;
    }

    try {
        const id = await addQuizCard(req.query.quiz);
        res.status(200).json({ id: id });
    } catch {
        res.status(500).json({ error: err.message });
    }
}