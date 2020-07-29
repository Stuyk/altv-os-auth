# Open Source - Auth / Login for alt:V

Created by Stuyk (Trevor Wessel)

❤️ Please support my open source work by donating. I'm here to provide general context for complicated procedures for you new developers. ❤️

https://github.com/sponsors/Stuyk/

❤️ Want direct support for my scripts and tutoring? Check out my Patreon.

https://patreon.com/stuyk

⭐ This repository if you found it useful!

---

![](https://i.imgur.com/taSEyXj.jpg)

# Description

This repository provides an easy way to authenticate users into your database through the alt:V event emitters. Which basically means... put data in get data out in your other resources. This provides a simple decoupled method to authenticate your users and get an identifier through other events.

# Quick Install (alt:V Resource Installer)

```sh
# Install alt:V Installer
npm install -g altv-installer
```

```sh
# Install with alt:V Installer
altv-installer stuyk/altv-os-auth
```

# Setting Up Environment Variables

Create a file in your main directory called `.env`. Edit this file with any notepad program, ide, etc.
Add the following parameters to link up to your Mongo Database.

```
MONGO_URL=mongodb://localhost:27017
MONGO_DB=os-auth
# MONGO_USER=username
# MONGO_PASS=pass
```

**MONGO_URL** is the URL of your MongoDB database. If on windows leave as localhost.
**MONGO_DB** is the name of the database where it will create a collection called `accounts`.
**MONGO_USER** is completely optional. Recommended in a production environment.
**MONGO_PASS** is completely optional. Recommended in a production environment.

## Installing Dependencies / Installation

**I cannot stress this enough. Ensure you have NodeJS 13+ or you will have problems.**

- [NodeJS 13+](https://nodejs.org/en/download/current/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- An Existing or New Gamemode
- General Scripting Knowledge

In your base gamemode directory where your `.exe` or `alt-server` files are. Simply run these commands.

```
npm install chalk
npm install dotenv
npm install pbkdf2
npm install simplymongo
npm install sjcl
```

After simply add the name of this resource to your `server.cfg` resource section.
Then simply clone this repository into your main server resources folder.

```
cd resources
git clone https://github.com/Stuyk/altv-os-auth
```

Ensure your `package.json` includes this property:

```json
"type": "module"
```

# Events & Triggering Authentication

You have to hookup some general events to your gamemode to get things working.
Here's what you have to do.

## Show the Authentication Window

**Server-Side**

```js
alt.on("playerConnect", showAuthWindow);

function showAuthWindow(player) {
  alt.emitClient(player, "auth:Open");
  console.log(`${player.name} has connected!`);
}
```

## Close the Authentication Window after Authenticating

This event specifically comes with some data from the player.
Such as their account database id, username, email, etc.

**Server-Side**

```js
alt.on("auth:Done", exitAuthWindow);

function exitAuthWindow(player, id, username, email) {
  alt.emitClient(player, "auth:Exit");
  console.log(`${player.name} has authenticated!`);
  console.log(`Their Database ID is: ${id}`);
}
```
