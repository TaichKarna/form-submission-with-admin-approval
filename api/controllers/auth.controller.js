const admin = require('firebase-admin');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, sendPasswordResetEmail } = require('../config/firebase');

const auth = getAuth();
const db = admin.firestore(); 

class FirebaseAuthController {
    async registerUser(req, res) {
        const { email, password, role } = req.body;

        if (!email || !password ) {
            return res.status(422).json({
                email: "Email is required",
                password: "Password is required",
            });
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;

            const userRole = role === 'admin' ? 'admin' : 'user';
            await db.collection('users').doc(userId).set({
                email: email,
                role: userRole
            });

            await sendEmailVerification(auth.currentUser);
            res.status(201).json({ message: "Verification email sent! User created successfully!" });
        } catch (error) {
            console.error('Error during user registration:', error);
            res.status(500).json({ error: "An error occurred while registering user" });
        }
    }

    async loginUser(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({
                email: "Email is required",
                password: "Password is required",
            });
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const idToken = userCredential._tokenResponse.idToken;
            const userId = userCredential.user.uid;

            const userDoc = await db.collection('users').doc(userId).get();
            if (!userDoc.exists) {
                throw new Error("User data not found");
            }

            const userRole = userDoc.data().role;
            const user = userCredential._tokenResponse;

            if (idToken) {
                res.cookie('access_token', idToken, { httpOnly: true });
                res.status(200).json({
                    message: "User logged in successfully",
                    userRole,  
                    user
                });
            } else {
                res.status(500).json({ error: "Internal Server Error" });
            }
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ error: "An error occurred while logging in" });
        }
    }

    logoutUser(req, res) {
        signOut(auth)
        .then(() => {
            res.clearCookie('access_token');
            res.status(200).json({ message: "User logged out successfully" });
        })
        .catch((error) => {
            console.error('Error during logout:', error);
            res.status(500).json({ error: "Internal Server Error" });
        });
    }

    resetPassword(req, res) {
        const { email } = req.body;

        if (!email) {
            return res.status(422).json({
                email: "Email is required"
            });
        }

        sendPasswordResetEmail(auth, email)
        .then(() => {
            res.status(200).json({ message: "Password reset email sent successfully!" });
        })
        .catch((error) => {
            console.error('Error during password reset:', error);
            res.status(500).json({ error: "Internal Server Error" });
        });
    }

    async checkAdminRole(req, res, next) {
        const userId = req.user.uid; 
        try {
            const userDoc = await db.collection('users').doc(userId).get();
            if (userDoc.exists && userDoc.data().role === 'admin') {
                next(); 
            } else {
                res.status(403).json({ error: "Access forbidden: Admins only" });
            }
        } catch (error) {
            console.error('Error checking admin role:', error);
            res.status(500).json({ error: "An error occurred while checking role" });
        }
    }
}

module.exports = new FirebaseAuthController();
