const { db } = require('../config/firebase');

class FormController {
    async submitForm(req, res) {
        const formData = req.body;
        const user_id = req.user.user_id; 

        if (!formData) {
            return res.status(422).json({ error: "Form data is required" });
        }

        try {
            const formRef = await db.collection('form_submissions').add({
                user_id,
                formData,
                    status: 'pending',
                    submittedAt: new Date(),
            });

            return res.status(201).json({
                message: "Form submitted successfully",
                formId: formRef.id
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            return res.status(500).json({ error: "Error submitting form" });
        }
    }

    async getFormSubmissions(req, res) {

        try {
            const submissionsSnapshot = await db.collection('form_submissions').get();
            const forms = [];

            submissionsSnapshot.forEach(doc => {
                forms.push({ id: doc.id, ...doc.data() });
            });

            return res.status(200).json({ forms });
        } catch (error) {
            console.error("Error retrieving form submissions:", error);
            return res.status(500).json({ error: "Error retrieving form submissions" });
        }
    }

    async approveForm(req, res) {
        const { id } = req.params;


        try {
            const formDoc = await db.collection('form_submissions').doc(id).get();
            if (!formDoc.exists) {
                return res.status(404).json({ error: "Form submission not found" });
            }

            await formDoc.ref.update({
                status: 'approved',
                reviewedAt: new Date(),
                reviewedBy: req.user.user_id,
            });

            return res.status(200).json({ message: "Form approved successfully" });
        } catch (error) {
            console.error("Error approving form submission:", error);
            return res.status(500).json({ error: "Error approving form submission" });
        }
    }

    async rejectForm(req, res) {
        const { id } = req.params;


        try {
            const formDoc = await db.collection('form_submissions').doc(id).get();
            if (!formDoc.exists) {
                return res.status(404).json({ error: "Form submission not found" });
            }

            await formDoc.ref.update({
                status: 'rejected',
                reviewedAt: new Date(),
                                     reviewedBy: req.user.user_id,
            });

            return res.status(200).json({ message: "Form rejected successfully" });
        } catch (error) {
            console.error("Error rejecting form submission:", error);
            return res.status(500).json({ error: "Error rejecting form submission" });
        }
    }

    async getUserProfile(req, res) {
        const user_id = req.user.uid;
        
        try {
            const submissionsSnapshot = await db.collection('form_submissions')
            .where('user_id', '==', user_id)
            .get();

            const userDoc = await db.collection('users').doc(user_id).get();
            const user = !userDoc.exists ? null: userDoc.data();

            const submissions = [];
            submissionsSnapshot.forEach(doc => {
                submissions.push({ id: doc.id, ...doc.data() });
            });

            return res.status(200).json({ profile: { user, submissions } });
        } catch (error) {
            console.error("Error retrieving user profile:", error);
            return res.status(500).json({ error: "Error retrieving user profile" });
        }
    }
}

module.exports = new FormController();
