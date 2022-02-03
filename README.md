# Weatherer Social Application
A full-stack MERN application loosely based on Twitter

### Access
- The project is hosted on Heroku, and can be accessed by visiting this link [Weatherer Social App](https://sleepy-bastion-10961.herokuapp.com)
- User is able to create a new permanent account, or sign in with a temporary guest account, which authentication will expire in 60minutes.

### Motivation
This project contains many newly learnt technologies and implementations. Some of them are:
- Redux for global state management
- Authentication with JSONWebToken for backend
- Protected routing for React Router
- Multiple Schemas in a database

I felt that this project has a good use case of those technologies that I've ventured into, and that it would be a good platform to put them in practice.

### Features
#### This application features a home page where:
- Users are able to see all posts, and only posts that are not replies to other posts.
- Users are able to navigate to different pages using the side navigation bar, such as looking at their own profiles, a post search bar, and navigate back to the home page. A logout button is also implemented for users.
- Users are able to comment and like any posts, or create or delete their own posts. The delete icon will only appear on their own created posts and replies.

#### Posts
- Users are able to like, or comment on a post. They will be able to see how long ago the post was created.
- Users are able to navigate to the post's author's profile page, and a single post page featuring that particular post.

#### When a user clicks on a post, they will be navigated to:
- A single post page, where the post's replies will be shown. Users are also able to click on these replies. In this page, a parent post will be shown if a post is replying to another post.
- If a parent post is deleted and it's reply is clicked on, the parent post component will show 'Post has been deleted'.

#### Profile page
- Users are able to see when a user profile was created, and the users' posts, including post replies.

### Challenges
There were a few challenges while developing this application. Two particular ones are:
#### Guest logins for user testing
- At first, I thought that it would be nice to implement a global public account, where testers are able to log in and experiment on a single shared account. It was eventually deemed a dangerous solution, and the idea of multiple users using one account at the same time was not a smart one.
- I implement a random number generator, where accounts are created based on that number. A password generator was also implemented. Therefore, these test accounts are only valid for an hour, before users lose access to them.

#### Backend handling of side effects from users' actions
- I did not account for the changes the backend needed to make when a user deletes a post reply, or deletes a post with replies. These postIds will remain in other users' data even after being deleted. It had the potential to cause unecessary data to be stored in the backend, and might cause slower performance.
- I added the necessary server action handler calls to make sure all related parties to a post is updated, when a particular post has been deleted.

### Future implementations
#### Weather
- I plan to implement an API, to show a users' local weather on their profile page. Users will be able to select their own location in their profile, and an animation of the weather of that area will be shown as a profile background.
- I plan to show a random animation of a season or weather condition on the application's login page, to a similar style of the twitter's login page.
