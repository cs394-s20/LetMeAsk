# LetMeAsk
We specialize in Q's and A's

## Status Update

All data for LetMeAsk is currently stored in Firebase. We leverage the Firebase system for the following three features:
- Database: We organized the database into three collections - Books, Questions, Users - which each have their own models for their documents. So for example, a book ID in the ```Books``` collection will correspond to a document with a list of question ID’s, a title, list of authors, etc.
- Storage: We use the firebase Storage to store the photos of textbook pages with the pins dropped on them.
- Auth: We use the firebase auth console to manage the authentication side of the accounts of our users - i.e. generating unique user ID’s, storing email and encrypted passwords. The authentication in firebase uses the Oauth2 protocol.

Some features to consider implementing:
- Enable push notifications when:
  - Experts answer students’ questions
  - Students ask a question under an expert’s field / textbook 
- Allow students to rate expert responses 
- Add a “moderator” to types of users in the database
  - Moderators can oversee the quality of expert responses, student answers / spam

## Moving Forward
To carry this project forward:
- [Clone](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) this repository (follow directions for **shalow cloning** so you don’t get the commit history of this repository) and create a new repository wherever you want to store the code for this application. Create a private repo if you don’t want this code to remain opensource.
- We use a platform called Firebase, a cloud storage system. When building this app, we used our own personal keys and Firebase set up, however, now that we are handing this off we will provide instructions for your team to set up your own Firebase configuration. We have left our configuration in the ```./shared/firebase.js``` file, but first create your firebase project with the steps below.

### How To Create Firebase Accounts and Link Firebase Project to the App

We use a platform called Firebase, a cloud storage system. When building this app, we used our own personal keys and Firebase set up, however, now that we are handing this off you will need to follow the instructions below to set up your own Firebase configuration.

- You can sign into Firebase with your Google account.

- You will begin by creating a new firebase project. You can follow [this tutorial](https://help.appsheet.com/en/articles/2087255-creating-a-firebase-account) to create the project.

- You will now have to link the Firebase project you created to the app. You can follow [this tutorial](https://courses.cs.northwestern.edu/394/firebase-notes.php#cli).

- Since the app is already connected to another Firebase project you will need it to switch to the one you have created. You can do this by running ```firebase use <project_id>```
 in terminal within the project folder.

- Go to the ```./shared/firebase.js``` file in our project root and update the ```firebaseConfig``` which stores the information that gives you read-write access to the database from the browser. To find the information that’s stored in the firebaseConfig, you will need to go to *Project Settings* in the Firebase web dashboard.

## Information for General Development
You will need to download the Expo client which helps to run the simulators. You can do this with the following command in terminal:

```
npm install -g expo-cli
```

We chose yarn as our package manager. If you do not have yarn installed, you can use [Homebrew](https://brew.sh/) to do that. 

To download dependencies run ```yarn``` after cloning the repository.

Then run ```yarn start``` to open the expo dashboard, which should open at ```localhost:10092```.

## Platform Constraints, Both for Development and Deployment:

Since we are using React Native, sometimes there are discrepancies between functions/packages used for the iOS platform versus the Android platform. This leads to some UI/visual elements changing based on which platform you are using. Keep that in mind as you develop!