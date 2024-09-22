const admin = require('firebase-admin');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, sendPasswordResetEmail } = require('../config/firebase');
const errorHandler = require('../middlewares/errorHandler')

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
            const userCredential = await admin.auth().createUser({email, password});
            const userId = userCredential.uid;
            const userRole = role === 'admin' ? 'admin' : 'user';
            await db.collection('users').doc(userId).set({
                email: email,
                role: userRole
            });

            res.status(201).json({ message: "sign in successful" });
        } catch (error) {
            console.error('Error during user registration:', error);
            res.status(500).json({ error: error });
        }
    }

    async loginUser(req, res) {
        const { email, password, userId } = req.body;

        if (!email || !password || !userId) {
            return res.status(422).json({
                email: "Email is required",
                password: "Password is required",
                userId: "UserId is required"
            });
        }

        try {

            const userDoc = await db.collection('users').doc(userId).get();
            if (!userDoc.exists) {
                throw new Error("User data not found");
            }

            const userRole = userDoc.data().role;
            
            if (userRole) {
                res.status(200).json({
                    message: "User logged in successfully",
                    userRole,  
                });
            } else {
                res.status(500).json({ error: "Internal Server Error" });
            }
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ error: "An error occurred while logging in" });
        }
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
