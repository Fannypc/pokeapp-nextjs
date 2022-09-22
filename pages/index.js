import styles from "../styles/Home.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Navbar from "../components/organisms/Navbar";

export default function Home() {
  const { data: session, status } = useSession();
  //the user is stored in session
  const user = session?.user;

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        This is home
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        {user && (
          <>
            <Image src={user.image} alt="user-img" width={100} height={100} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <button onClick={() => signOut()}>Sign out</button>
          </>
        )}
        {!user && <button onClick={() => signIn("github")}>Sign in</button>}
      </div>
    </>
  );
}
