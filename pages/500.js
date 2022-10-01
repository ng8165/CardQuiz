import Head from "next/head";
import Link from "next/link";
import { Button } from "react-bootstrap";

export default function Error500(props) {
    return <>
        <Head><title>500</title></Head>

        <h1>500</h1>
        <p>Server error.</p>
        <p className="mb-3">{props.message}</p>

        <Link href="/"><Button variant="primary">Return Home</Button></Link>
    </>;
};