import Head from "next/head";
import Link from "next/link";
import Error404 from "../../404";
import Error500 from "../../500";
import { Form, Button, InputGroup, Container, Row, Col } from "react-bootstrap";
import { addQuizCard, updateQuizCard, updateQuizName, deleteQuizCard } from "../../../firebase/db";
import { useRouter } from "next/router";
import { useState } from "react";

export { getServerSideProps } from "../[id]";

export default function Edit({ quiz }) {
    const router = useRouter();
    const { id } = router.query;
    const [name, setName] = useState(quiz.name);
    const [cards, setCards] = useState(quiz.data);

    if (quiz.status === "error404") {
        return <Error404 />;
    } else if (quiz.status === "error500") {
        return <Error500 message={quiz.message} />;
    }

    return <>
        <Head><title>{name.length == 0 ? "Edit" : `Edit - ${name}`}</title></Head>
        
        <h1 className="mb-0">Edit</h1>
        {name.length > 0 && <h3 className="mb-0 text-center">{name}</h3>}

        <h4 className="mt-4">Title</h4>
        <InputGroup size="lg">
            <Form.Control type="text" placeholder="Enter a title..." value={name}
            onChange={(e) => setName(e.target.value)} onBlur={() => updateQuizName(id, name)} />
        </InputGroup>

        <h4 className="mt-4">Cards</h4>
        {cards.map((card) => (
            <Container fluid key={card.id} className="py-1 px-1">
                <Row>
                    <Col className="ps-0 pe-1" onBlur={(e) => updateQuizCard(id, card.id, { term: e.target.value })}>
                        <Form.Control type="text" placeholder="Enter a term..." defaultValue={card.term} />
                    </Col>

                    <Col className="px-1" onBlur={(e) => updateQuizCard(id, card.id, { definition: e.target.value })}>
                        <Form.Control type="text" placeholder="Enter a definition..." defaultValue={card.definition} />
                    </Col>
                    
                    <Col xs="auto" className="p-0 ps-1">
                        <Button variant="danger" className="p-0" onClick={async () => {
                            await deleteQuizCard(id, card.id);
                            setCards(cards.filter((card2) => card.id !== card2.id));
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </Button>
                    </Col>
                </Row>
            </Container>
        ))}
        
        <Button variant="primary" className="my-3" onClick={async () => {
            if (cards.length >= 2000) {
                alert("The maximum number of cards has been reached.");
                return;
            }

            const cardId = await addQuizCard(id);
            setCards([...cards, {term: "", definition: "", starred: false, id: cardId}]);
        }}>Add Card</Button>

        <Link href={`../${id}`}><Button variant="secondary">Return to {name}</Button></Link>
    </>;
}