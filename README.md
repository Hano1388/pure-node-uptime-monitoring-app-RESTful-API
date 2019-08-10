# Uptime Monitor

This app allows users to enter URLs they want monitored, and receive alerts when those resources `go down` or `come back up`
The app is useable, it has sign-up and sign-in. Also it includes functionality to get uptime alerts by SMS rather than by email.

### Backend Spec
> 1. The API listens on a PORT and accepts incoming HTTP requests for POST, GET, PUT, DELETE, and HEAD

> 2. The API allows a client to connect, then create a new user, then edit and delete that user.
> 3. The API allows a user to `sign in` which gives them a token that they can use for subsequent authenticated requests.
> 4. The API allows the user to `sign out` which invalidates their token
> 5. The API allows a signed-in user to use their token to create a new `check` by check we mean to give a task to the system to check a URL to see if it is up or down. And also gives ability to users to define what up or down is for example for some websites up might mean that you received a 200 statusCode while for other websites up might mean anything that is not 500
> 6. The API allows a sign-in user to edit or delete any of their checks. And it limits their checks to 5
> 7. In the background, workers perform all the `checks` at the appropriate times, and send alerts to the users when a check changes its state from `up` to `down`, or vis versa.

For the majority the app uses Node.js API but, to send alerts via SMS it uses Twilio API but, this doesn't mean it uses a 3rd-party library to connect to Twilio, We are crafting the HTTP request by hand.
