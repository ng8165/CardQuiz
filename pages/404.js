import Head from "next/head";
import Link from "next/link";
import { Button } from "react-bootstrap";

export default function Error404() {
    return <>
        <Head><title>404</title></Head>

        <h1>404</h1>
        <p className="mb-3">Page not found.</p>

        <Link href="/"><Button variant="primary">Return Home</Button></Link>
    </>;
};