import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { addQuiz, getAllQuizNames } from "../firebase/db";

export async function getServerSideProps() {
    const quizzes = await getAllQuizNames();
    return { props: { quizzes } };
}

export default function Home({ quizzes }) {
    const [id, setId] = useState("");
    const router = useRouter();

    return <>
        <Head><title>CardQuiz</title></Head>

        <h1>CardQuiz</h1>

        <Form.Label htmlFor="id">Enter an ID:</Form.Label>
        <Form.Control className="w-auto mb-2" id="id" value={id} onChange={(e) => setId(e.target.value)} />
        
        <Link href={`quiz/${id}`}><Button variant="primary" className="mb-3">Load</Button></Link>

        {quizzes.map((quiz) => (
            <Link key={quiz.id} href={`quiz/${quiz.id}`}>{quiz.name}</Link>
        ))}

        <Button className="mt-3" variant="primary" onClick={async () => {
            const id = await addQuiz();
            router.push(`quiz/${id}/edit`);
        }}>Add Quiz</Button>
    </>;
};