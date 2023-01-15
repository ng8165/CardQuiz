import { addQuiz } from "../../firebase/db";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        res.status(405).json({ error: `${req.method} not allowed` });
        return;
    }

    try {
        const id = await addQuiz();
        // res.status(200).json({ id: id });
        res.redirect(200, `/quiz/${id}/edit`);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}