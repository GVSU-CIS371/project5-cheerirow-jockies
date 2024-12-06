<script>
    import {
        getAuth,
        signInWithPopup,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        sendEmailVerification,
        signOut,
    } from "firebase/auth";

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, "user_email", "user_password");
    sendEmailVerification(auth.currentUser);
    signInWithEmailAndPassword(auth, "user_email", "user_password");
    signInWithPopup(auth, ____);
    signOut(auth);

</script>