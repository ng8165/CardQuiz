import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { ProgressBar, Carousel, Card, Button, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import styles from "./flashcards.module.css";
import { useQuiz } from "../[id]";

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

export default function Flashcards() {
    const router = useRouter();
    const { id } = router.query;
    const [curr, setCurr] = useState(0);

    const { quiz, isLoading, isError } = useQuiz(id);
    if (isLoading) return <Spinner animation="border" variant="dark" />;
    if (isError) router.replace("/500");

    const len = quiz.data.length;

    return <>
        <Head><title>{`Flashcards - ${quiz.name}`}</title></Head>
        
        <h1 className="mb-0">Flashcards</h1>
        <h3 className="mb-3">{quiz.name}</h3>

        <p>{curr >= len ? curr : curr+1}/{len}</p>
        
        <Carousel className="w-100" activeIndex={curr} onSelect={(index) => curr < len && setCurr(index)}
        interval={null} indicators={false} controls={curr < len} variant="dark">
            {quiz.data.map((card) => 
                <Flashcard key={card.id} onClick={({target}) => {
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

