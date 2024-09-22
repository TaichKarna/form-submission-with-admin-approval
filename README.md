# form-submission-with-admin-approval


### Initial Setup

Run the following commands from the command line to get your local environment set up:

```bash
$ git clone https://github.com/TaichKarna/form-submission-with-admin-approval.git
$ cd form-submission-with-admin-approval    # go to the form submission directory
$ cd api
$ npm install               # install dependencies for api
$ cd ../client              # go to client folder
$ npm install               # install dependencies for client
```

Follow these steps to set up Firebase Admin and Authentication with Firestore:

### 1. Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click on "Add project" and follow the prompts to create a new project.

### 2. Enable Authentication:
   1. Go to the Firebase Console, and select **Authentication** from the **Build** menu.
   2. Click on **Get Started**.
   3. Select **Sign-in method > Add new provider > Email/Password** then enable both the
   **Email/Password** and **Email link (passwordless sign-in)** options.


### 3. Enable Firestore:
   1. Go to the Firebase Console, and select **Firestore Database** from the **Build** menu.
   2. Click on the **Create database**  button. You can choose to set up Firestore either in
   the production mode or in the test mode.

### 4. Generate Firebase Admin SDK Credentials
1. In the Firebase Console, navigate to "Project Settings" (gear icon).
2. Go to the "Service accounts" tab.
3. Click on "Generate new private key". This will download a JSON file containing your service account credentials.
4. Copy that to root of api folder and save it as FirebaseService.json

## Environment Variables

To run the project, you need to set up the following environment variables. Create a `.env` file in the root of your api folder and add the following:

```plaintext
PORT=3000

FIREBASE_API_KEY=<Your_API_Key>
FIREBASE_AUTH_DOMAIN=<Your_Auth_Domain>
FIREBASE_PROJECT_ID=<Your_Project_ID>
FIREBASE_STORAGE_BUCKET=<Your_Storage_Bucket>
FIREBASE_MESSAGING_SENDER_ID=<Your_Messaging_Sender_ID>
FIREBASE_APP_ID=<Your_App_ID>
FIREBASE_MEASUREMENT_ID=<Your_Measurement_ID>
```
To get the necessary Firebase configuration values, follow these steps:

1. **Go to Firebase Console**: 
   Navigate to the [Firebase Console](https://console.firebase.google.com/).

2. **Select Your Project**: 
   Click on your project (e.g., "form-submission-f90a4").

3. **Project Settings**: 
   - Click on the gear icon ⚙️ next to "Project Overview" in the left sidebar.
   - Select "Project settings."

4. **General Tab**: 
   Under the "General" tab, you'll find the **Firebase SDK snippet**. Here you can find the following values:
   - `apiKey` (FIREBASE_API_KEY)
   - `authDomain` (FIREBASE_AUTH_DOMAIN)
   - `projectId` (FIREBASE_PROJECT_ID)
   - `storageBucket` (FIREBASE_STORAGE_BUCKET)
   - `messagingSenderId` (FIREBASE_MESSAGING_SENDER_ID)
   - `appId` (FIREBASE_APP_ID)

## Running the Project

To run the project, you need to start both the API and client applications. Follow these steps:

1. **Navigate to the API Folder**:
   Open your terminal and change to the API directory:

   ```bash
   cd api
   npm run dev
   ```
2. **Navigate to Client Folder in a new terminal:**
    Open a new terminal window and change to the client directory:

   ```bash
   cd client
   npm run dev
   ```

  









