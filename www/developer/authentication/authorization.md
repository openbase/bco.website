This page describes what different permissions are for, whose permissions are checked and how permissions for units can be evaluated indirectly.

# Permission Types and Their Meaning

This section describes the differences of read, write, and access permissions and their implications on the user's or client's actions. The implications of the permissions are oriented towards and thus very similar to those of the standard Unix permissions. 

**Location Permissions**

|   | Unix Directories | BCO Locations  |
| - |:------------:| :-----:|
| R | read content | read internal unit configs |
| W | write        | change configuration of the location |
| X | access       | change status/apply actions & see internal unit ids |

**Unit Permissions**

|   | Unix Files | BCO Units                        |
| - |:-------:| :-------------------------: |
| R | read    | read status                 |
| W | write   | change configuration of the unit       |
| X | execute | change status/apply actions |

## Read

Read permission allows the user or client to see the status of a unit e.g. if a light is turned on. If a user has write or access permission he should also have read permission.
Everyone always has read permissions on the root location.

## Write

Write permission grants a user write access on a given unit. This means the user is allowed to change the configuration of a unit like its label or accessibility. Having write permission does not imply automatic access permission.

## Access

Access permission grants the user the ability to use units. For example, with access permission for a light bulb a user can switch it on and off. Having access permission does not imply automatic write permission.

# Whose Permissions Are Checked

There are four different cases:

1. The application is not authenticated as a client and no user is logged in
2. The application is not authenticated as a client and a user is logged in
3. The application is authenticated as a client and no user is logged in
4. The application is authenticated as a client and a user is logged in

In each of these states the system has to determine which permissions need to be checked when the application sends a request to perform an action. 

In the first case *other* permissions are assumed. This is because neither a user nor a client are logged in so there is none to refer to. *Other* permissions are specifically set for this case.

Obviously, in the second and third case the permissions of the client or the user are assumed.

In the fourth case if both a client and a user are logged in, both their permissions are checked. This means that its enough if either the user or the client has permissions to perform the action. Only if neither has necessary permissions the execution of the action is refused.

# Indirect Permissions

If a system provides a lot of units it can be a tedious task to set the permissions for every unit individually.
Therefore it is possible to leave the permission configuration of a unit empty. Whenever an action should be performed and the according unit does not have a permission configuration the permission configuration is evaluated indirectly. This is done by using the location hierarchy of the BCO system. If the unit does not have a permission configuration the permission configuration of the location where the unit is placed is used. If again the location does not provide a permission configuration its parent location is checked. Thus for a working system only the root location needs to have a permission configuration. Furthermore this makes it easy to define permissions for a whole room.
