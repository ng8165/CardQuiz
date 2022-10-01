import "bootstrap/dist/css/bootstrap.min.css";

export default function MyApp({ Component, pageProps }) {
    return <>
        <main className="p-3 d-flex flex-column align-items-center">
            <Component {...pageProps} />
        </main>
    </>;
};
