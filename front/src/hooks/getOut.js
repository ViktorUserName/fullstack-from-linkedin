import { getAuth, signOut } from "firebase/auth";

const logOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
        }).catch((error) => {
        });
}

export default logOut;