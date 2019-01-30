This page describes how the authentication module can be integrated into a server side application that provides services which need authentication and authorization to be executed.

There are three components designed to support this:

* AuthenticatedServerManager
* AuthorizationHelper
* AuthenticatedServiceProcessor

# Authentication

Every time a user wants to execute an authenticated service he has to send his ticket with his request. The server that provides this service needs to be able to evaluate this ticket. The `AuthenticatedServerManager` is there to help with this. It logs in with a special account at the AuthenticatorController which is allowed to request a key that is needed to evaluate a ticket. This is automatically done when you create an instance. Important to note is that the AuthenticatorController creates this account on its first start and will save the private key needed to login with this account in a credentials folder only accessible by the user who started it. As long as the server application you are running has access to this file it will be able to login with the special account.
After creation you can call a method which evaluates the ticket as seen below. It will throw an exception when the evaluation fails and else returns a wrapper containing the id of the user who requested the execution and an updated ticket which the server needs to return in a response.

    // evaluate a ticket send with a request
    TicketEvaluationWrapper wrapper = AuthenticatedServerManager.getInstance().evaluateClientServerTicket(ticket)
    // get the ticket which has to be returned to the user after execution of the service
    wrapper.getTicketAuthenticatorWrapper()
    // get the id of the user who requested the execution of the service
    wrapper.getUserId()

# Authorization

This is everything that needs to be done for the authentication process on the server side. To use authorization as well you can use the `AuthorizationHelper`. This class provides methods to test if a user has specific permissions for a unit configuration. An example for access permissions could look like this:

    // test if a user with userId has access permissions on the unit with unitConfig
    canAccess = AuthorizationHelper.canAccess(unitConfig, userId, groups, locations)

The locations and groups need to be retrieved from the registry like this:

    locations = Registries.getUnitRegistry().getLocationUnitConfigRemoteRegistry().getEntryMap()
    groups    = Registries.getUnitRegistry().getAuthorizationGroupUnitConfigRemoteRegistry().getEntryMap()

# Additional Information

Another helper class which can do both authorization and authentication for server as well as remote side is the `AuthenticatedServiceProcessor`. However, this is only possible if the service is configured to receive an AuthenticatedValue as its sole parameter. The authenticated value contains the ticket of a user and an additional value encrypted with the session key of the user. The AuthenticatedValueProcessor automatically decrypts the additional value into a configured class which you can perform any action with. For a more specific explanation it is useful to have a look at the [JavaDoc](https://openbase.github.io/bco.authentication/apidocs/).