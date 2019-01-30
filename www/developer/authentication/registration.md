For the system it is necessary to have at least one user to operate it. Therefore the system will register a default administrator on its first start. This default administrator is able to add new user to the system. This page will explain how this is done. But before that an important differentiation between users and clients is amplified.

# Users and Clients

BCO serves the requests of a user. Imagine a user wants to turn on a light bulb. To do this he sends a request to BCO which in turn checks his permissions and turns on the light if his permissions qualify him to do so. To BCO there is no difference between a user and a client. But the client side of the system differentiates between those two. 

Users are specified as physical users like you and me. We can login and perform actions that we have the right permissions for. The permissions of a user are managed by the system administrators.
   
Among those users are also clients that are identified as the hosts of client-side-software-applications like the machine running bcozy or bcomfy. This can be a touch display hanging on a wall with which everybody can control your apartment. A system administrator can give a client as many permissions as he can give a user, although this is not recommended, as normally everybody can control a client.

# The Registration Process

Upon the first start of BCO an initial user with administrator rights is automatically registered by the system. Its credentials are as follows:

    username: admin
    password: admin

This account can be used to register new users and appoint regular users administrators. These regular users can be his family, friends, flat mates and so on. Any administrator can appoint a regular user an administrator.

## The SessionManager

Before explaining how the actual registration works, you need to know what a `SessionManager` is. It is a class that offers all kinds of methods that allow to:

- register a user/client
- login and logout
- delete a user/client
- change the password of a user
- appoint a user an administrator or do the opposite

**The `SessionManager` will not be instantiated by yourself.** You will have to call `SessionManager.getInstance()` to get an instance of it. The instance is shared on the client application. The `SessionManager` will help you keep your session variables so that you do not have to bother about that.

We mentioned before that when performing an action, like turning on a light bulb, a user must have the right permissions to do so. The `SessionManager` ensures that all necessary user information is transferred to BCO automatically so that authentication and authorization can be performed. To make this working the overall system needs to have at least one registered user e.g. the default administrator account.

## Registration

**A user or a client cannot register itself.** Either can only be registered by an administrator. In the case of user registration an administrator has to log in and access a formula where he can input both a userId and a preliminary password for the user. Afterwards the user can login and perform actions that he has permissions for. The registration process of a user and a client slightly differ. How they differ is clarified in both the following sections.

**Note**: Registration of new users can only be done by an administrator because this way user data like the password can be encrypted. Therefore it is always necessary to have at least one administrator in the system.

### Registration of a user

As mentioned above an administrator has to login and access some kind of formula to input the `userId`, `password` and `isAdmin` flag. While the first two inputs are self explanatory the third `isAdmin` determines if the user should be appointed an administrator. To register the user simply call the method `registerUser(userId, password, isAdmin)` on your `SessionManager`-instance. The following code block gives a rough understanding of the procedure.

    // retrieve the SessionManager
    SessionManager sessionManager = SessionManager.getInstance();

    // login the administrator
    sessionManager.login(adminId, adminPassword); // omit if already logged in

    // register the user
    sessionManager.registerUser(userId, userPassword, isAdmin);

The registration of a user can be performed by any administrator on any client-application offering a suitable GUI. Upon registration the password of the user is hashed and sent to the server while being encrypted within the session of the administrator to make sure no third party can listen and acquire the password. Then the server saves the `userId` and `password hash` in its credential store. Saving the `userId` and `password hash` on the client-application side is left to the application because saving techniques differ across different platforms (Android, Linux, iOS, etc).

### Registration of a client

The registration of a client has to be performed on the client that is to be registered. So the administrator has to be logged in on the machine running the client-application. This is because upon registration a `private/public key pair` is automatically generated by the client. The `private key` is saved in the client-application's credential store along the `clientId`. The `public key` is sent to the server which saves it in the its credential store along the `clientId`. The following code block should give a rough understanding of the procedure.

    // --- on the client that is to be registered ---

    // retrieve the SessionManager
    SessionManager sessionManager = SessionManager.getInstance();

    // login the administrator
    sessionManager.login(adminId, adminPassword); // omit if already logged in

    // register the client
    sessionManager.registerClient(clientId);

Note that you do not provide a password for the client. This is because for communication between a client and the server private/public key pair encryption is used.

The following figure shows the creation a user or client:
![Sequence Diagram of User Registration](https://rawgithub.com/openbase/bco.authentication/master/docs/res/figures/create_user.svg)
