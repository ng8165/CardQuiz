import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Table } from "react-bootstrap";
import Error404 from "../404";
import Error500 from "../500";
import { getQuiz, deleteQuiz, updateQuizCard }  from "../../firebase/db";

export async function getServerSideProps({ params }) {
    let quiz;

    try {
        const res = await getQuiz(params.id);

        if (res == null)
            quiz = {status: "error404", message: "Quiz not found."}
        else
            quiz = {status: "ok", ...res};
    } catch(err) {
        quiz = {status: "error500", message: err.message}
    } finally {
        return { props: { quiz } };
    }
}

export default function Flashcards({ quiz }) {
    const router = useRouter();
    const { id } = router.query;

    if (quiz.status === "error404") {
        return <Error404 />;
    } else if (quiz.status === "error500") {
        return <Error500 message={quiz.message} />;
    }

    return <>
        <Head><title>{quiz.name}</title></Head>
        
        <h1>{quiz.name}</h1>
        <Link href={`${id}/edit`}><Button variant="dark" className="mb-3">Edit</Button></Link>

        <Link href={`${id}/flashcards`}><Button variant="primary">Flashcards</Button></Link>

        <Table bordered hover className="w-auto my-3">
            <thead>
                <tr>
                    <th>Term</th>
                    <th>Definition</th>
                    <th>Starred</th>
                </tr>
            </thead>
            <tbody>
                {quiz.data.map((card) => 
                    <tr key={card.id}>
                        <td>{card.term}</td>
                        <td>{card.definition}</td>
                        <td style={{cursor: "pointer"}} onClick={(e) => {
                            card.starred = !card.starred;
                            updateQuizCard(id, card.id, { starred: card.starred });
                            e.target.textContent = card.starred ? "★" : "☆";
                        }}>{card.starred ? "★" : "☆"}</td>
                    </tr>
                )}
            </tbody>
        </Table>

        <Button variant="danger" onClick={async () => {
            await deleteQuiz(id);
            router.push("/");
        }}>Delete Quiz</Button>

        <Link href="/"><Button variant="secondary" className="mt-3">Go Home</Button></Link>
    </>;
};

