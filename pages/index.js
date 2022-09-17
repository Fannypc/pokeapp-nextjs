import styles from "../styles/Home.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session, status } = useSession();
  //the user is stored in session
  const user = session?.user;

  return (
    <div className={styles.container}>
      This is home
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
  );
}
