This page lists methods that return or change user account specific settings. In this case user account specific settings mean relevant information for the authorization process which are the password and the admin flag of a user. For other data like the email address or username have a look at the [Registry Wiki](https://github.com/openbase/bco.registry/wiki).

For all methods listed below it is always necessary that a user or client is logged in. Furthermore some methods require the currently logged in user to be an administrator. Therefore in the beginning of each section it is mentioned if it is necessary to be logged in as an administrator.

Additionally all methods listed are always performed on an instance of the SessionManager on the client side. For obtaining an instance remember:

    SessionManager sessionManager = SessionManager.getInstance();

## Check if a user has administrator permissions

> A user has to be logged in

    boolean isAdmin = sessionManager.isAdmin()

This method checks if the currently logged in user is an administrator or not. Note that you cannot check if a client is an administrator. Clients can never be administrators for security reasons.

## Change a user's password

> A user or an administrator has to be logged in

    sessionManager.changeCredentials(String userId, String oldPassword, String newPassword)

This method allows a logged in user to change his own password. If you set `id = null` the id will be set automatically to the currently logged in user.
As an administrator you can also change the password of other users. For that, simply plug in the id of the user whose password should be changed.  

## Appoint a user an admin (or the opposite way)

> An administrator has to be logged in

    sessionManager.setAdministrator(String userId, boolean isAdmin)

Appoints a regular user with `userId` an administrator or revokes the status. That depends on the boolean `isAdmin`. Note that an administrator cannot revoke his own rights. This ensures that there is always at least one administrator active in the whole system.

## How does all of this work in detail? 

The following diagram shows how changing the password of a user works in detail. This also illustrates the background processes of all the other methods.

1. The `SessionManager` checks if the entity performing the request is logged in and forwards the request to the `AuthenticationController`
2. The `AuthenticationController` verifies that the entity performing the request has the necessary permissions
3. (In this case it also checks if the old password was correct)
4. Then the `AuthenticationController` updates its internal representations of the user in its own credential store
5. In the end it returns an updated ticket that is necessary for keeping the current session active

![](https://rawgithub.com/openbase/bco.authentication/master/docs/res/figures/change_credentials.svg)
