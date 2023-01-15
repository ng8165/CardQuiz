import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Table, Spinner } from "react-bootstrap";
import { getQuiz, deleteQuiz, updateQuizCard }  from "../../firebase/db";
import useSWR from "swr";

export function useQuiz(id) {
    const { data, error } = useSWR(id, getQuiz);
    return { quiz: data, isLoading: !error && !data, isError: error };
}

export default function Flashcards() {
    const router = useRouter();
    const { id } = router.query;
    
    const { quiz, isLoading, isError } = useQuiz(id);
    if (isLoading) return <Spinner animation="border" variant="dark" />;
    if (isError) router.replace("/500");

    return <>
        <Head><title>{quiz.name}</title></Head>
        
        <h1>{quiz.name}</h1>
        <Link href={`${id}/edit`}><Button variant="dark" className="mb-3">Edit</Button></Link>

        <Link href={`${id}/flashcards`}><Button variant="primary">Flashcards</Button></Link>

        <p className="mb-0 mt-3">{quiz.data.length} terms</p>

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

