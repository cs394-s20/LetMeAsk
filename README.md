# LetMeAsk
We specialize in Q's and A's

## Status Update

All data for LetMeAsk is currently stored in Firebase. We leverage the Firebase system for the following three features:
- Database: We organized the database into three collections - Books, Questions, Users - which each have their own models for their documents. So for example, a book ID would correspond to a document with a list of question ID’s, a list of 
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
- Clone this repository (follow directions for **shalow cloning** so you don’t get the commit history of this repository) and create a new repository wherever you want to store the code for this application. Create a private repo if you don’t want this code to remain opensource.
- Create a new Firebase project and name it LetMeAsk. Go to the ```./shared/firebase.js``` file and update the ```firebaseConfig``` which stores the information that gives you read-write access to the database from the browser. To find the information that’s stored in the firebaseConfig, you will need to go to *Project Settings*.

## Information for General Development
We chose yarn as our package manager. If you do not have yarn installed, you can use [Homebrew](https://brew.sh/) to do that. 

To download dependencies run ```yarn``` after cloning the repository.

Then run ```yarn start``` to open the expo dashboard, which should open at ```localhost:10092```.