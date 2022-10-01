import Head from "next/head";
import Link from "next/link";
import Error404 from "../../404";
import Error500 from "../../500";
import { Form, Button, InputGroup, Container, Row, Col } from "react-bootstrap";
import { updateQuizCard, updateQuizName } from "../../../firebase/db";
import { useRouter } from "next/router";
import { useState } from "react";

export { getServerSideProps } from "../[id]";

export default function Edit({ quiz }) {
    const router = useRouter();
    const { id } = router.query;
    const [name, setName] = useState(quiz.name);

    if (quiz.status === "error404") {
        return <Error404 />;
    } else if (quiz.status === "error500") {
        return <Error500 message={quiz.message} />;
    }

    return <>
        <Head><title>{name.length == 0 ? "Edit" : `Edit - ${name}`}</title></Head>
        
        <h1 className="mb-0">Edit</h1>
        {name.length > 0 && <h3 className="mb-0">{name}</h3>}

        <h4 className="mt-2">Title</h4>
        <InputGroup size="lg">
            <Form.Control type="text" placeholder="Enter a title..." value={name}
            onChange={(e) => setName(e.target.value)} onBlur={() => updateQuizName(id, name)} />
        </InputGroup>

        <h4 className="mt-4">Cards</h4>
        {quiz.data.map((card, index) => (
            <Container fluid key={index} className="p-0">
                <Row>
                    <Col xs="6" className="pe-1" onBlur={(e) => updateQuizCard(id, index, { term: e.target.value })}>
                        <Form.Control type="text" placeholder="Enter a term..." defaultValue={card.term} />
                    </Col>

                    <Col xs="6" className="ps-1" onBlur={(e) => updateQuizCard(id, index, { definition: e.target.value })}>
                        <Form.Control type="text" placeholder="Enter a definition..." defaultValue={card.definition} />
                    </Col>
                </Row>
            </Container>
        ))}
        
        <Button variant="primary" className="my-3">Add Card</Button>

        <Link href={`../${id}`}><Button variant="secondary">Return to {name}</Button></Link>
    </>;
}