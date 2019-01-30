*Note*: On this page a user and a client are both referenced to as a user. When we write about the client in specific it will be made explicit.

Authentication allows a user to access the BCO system with permissions explicitly specified for the given user. However, not every actions requires that a user is logged in. Some actions, as specified by the system administrators, can be executed with so called *other permissions*. Such actions can be performed by anyone and without being logged in. More on that on the [authorization page](https://github.com/openbase/bco.authentication/wiki/Authorization).

# How to login a user

Logging in a user requires nothing more than calling the according method on an instance of the [SessionManager](https://github.com/openbase/bco.authentication/wiki/registration#the-sessionmanager).
There are two different methods for logging in depending on if you want to login as a user or as a client.

    // retrieve the SessionManager
    SessionManager sessionManager = SessionManager.getInstance();

    // login a user
    sessionManager.login(userId, password, stayLoggedIn);

    // or login a client
    sessionManager.login(clientId);

Where `stayLoggedIn` is a boolean that tells the system if the user wants to stay logged in during the current session. More on that later.

There is nothing else the application on the client machine has to do after the login. The user can now perform actions for which he has permissions.

*Note*: Since a client and user can be logged in from the same application it is not necessary to log out a client prior to logging in a user.

Following diagram illustrates what happens during the login process in the background.
![](https://rawgithub.com/openbase/bco.authentication/master/docs/res/figures/login.svg)

Following diagram illustrates the login process and a subsequent request to performing an action on the system.
![](https://rawgithub.com/openbase/bco.authentication/master/docs/res/figures/authentication.svg)

Following diagram illustrates the Kerberos algorithm that is used to authenticate / login a user.
![](https://rawgithub.com/openbase/bco.authentication/master/docs/res/figures/kerberos.svg)

# How to keep a user logged in over long time

Keeping a user logged in over time is preferential but gives rise to a security issue. An *open connection* could be misused by a third party to perform unauthorized actions on the system. However, it provides the comfort of not having to login again and again after longer period of inactivity. Therefore the implementation allows a user or client to login again automatically once their session expired and thus to stay logged in.

How does a session expire? The Kerberos authentication algorithm is not discussed in detail here. For a more detailed explanation you can have a look [here](https://en.wikipedia.org/wiki/Kerberos_(protocol)). During authorization every user gets a ticket that he has to present to the server on every action he wants to perform. This is similar to an Id-card in real life that is shown to authorities when they ask you to verify yourself. This ticket, however, has a specified period in which it is valid. Once this period expires the ticket cannot be used anymore and the user has to login again. But this validity period is updated on every action by the server. So as long as the user keeps performing actions in the specified period his session does not expire. This means that when a user does not perform an action for a longer period of time his session expires.

## Keep a user logged in

Keeping a user logged in is in general more risky than keeping a client logged in. Often a user has more sensible permissions on the system than a client. Due to this circumstance we implemented the option to keep the user logged in by his own choice during the login process. This option is set with the `stayLoggedIn` flag in `SessionManager.login(userId, password, stayLoggedIn)`. If `stayLoggedIn` is specified as `true`, the `userId` and `password` will be saved by the `SessionManager` but they stay inaccessible from the outside of the class. Should the current session expire the user will be automatically logged in again. **Note**: Once the application is restarted the session variables will be reset as well and the user will most definitely have to login manually again.

## Keep a client logged in

There's nothing for the client application to do to keep a client logged in. This happens automatically by default.

Following diagram illustrates the relogging process.
![](https://rawgithub.com/openbase/bco.authentication/master/docs/res/figures/action.svg)
