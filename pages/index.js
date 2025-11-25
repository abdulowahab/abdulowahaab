import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Abdul Owahab - Portfolio</title>
      </Head>
      <h1>Welcome to My Portfolio</h1>
      <p>I am a web developer with a passion for creating stunning projects.</p>
      <Link href="/projects">Check out my projects</Link>
      <Link href="/contact">Contact me</Link>
    </div>
  );
}
