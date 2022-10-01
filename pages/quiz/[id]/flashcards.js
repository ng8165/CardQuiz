import React from "react";
import Head from "next/head";
import Link from "next/link";
import Error404 from "../../404";
import Error500 from "../../500";
import { useState } from "react";
import { ProgressBar, Carousel, Card, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import styles from "./flashcards.module.css";

export { getServerSideProps } from "../[id]";

export default function Flashcards({ quiz }) {
    const router = useRouter();
    const { id } = router.query;
    const [curr, setCurr] = useState(0);
    const len = quiz.data.length;

    if (quiz.status === "error404") {
        return <Error404 />;
    } else if (quiz.status === "error500") {
        return <Error500 message={quiz.message} />;
    }

    const Flashcard = React.forwardRef((props, ref) => (
        <Carousel.Item ref={ref} className={props.className + " " + styles.flashcard}>
            <Card>
                <Card.Body onClick={props.onClick}>
                    {props.children}
                </Card.Body>
            </Card>
        </Carousel.Item>
    ));
    Flashcard.displayName = "Flashcard";

    return <>
        <Head><title>{`Flashcards - ${quiz.name}`}</title></Head>
        
        <h1 className="mb-0">Flashcards</h1>
        <h3 className="mb-3">{quiz.name}</h3>
        
        <Carousel className="w-100" activeIndex={curr} onSelect={(index) => curr < len && setCurr(index)}
        interval={null} indicators={false} controls={curr < len} variant="dark">
            {quiz.data.map((card, index) => 
                <Flashcard key={index} onClick={({target}) => {
                    target.textContent = (target.textContent === card.term) ? card.definition : card.term;
                }}>
                    {card.term}
                </Flashcard>
            )}

            <Flashcard>
                <p>You&apos;re done!</p>
                <Button variant="primary" size="lg" onClick={() => setCurr(0)}>Reset</Button>
            </Flashcard>
        </Carousel>

        <ProgressBar className="my-3 w-100" now={curr/len*100} />
        
        <Link href={`../${id}`}><Button variant="secondary">Return to {quiz.name}</Button></Link>
    </>;
};

