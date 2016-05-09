# Trailblazer "Wash"

Trailblazer is a Chrome extension built to track a user's browsing activity and
build up a map, helping them make sense of the places they visit.

## Prerequisites

### Node

If you have a modern version of node, excellent - you're good to go. This has
been tested on 5.x so far so if you run into problems create an issue and we
can address it.

### EditorConfig 

You also should have the [EditorConfig plugin](http://editorconfig.org/)
installed for your editor before editing any of the source.

## Setup

    $ git clone git://github.com/twingl/trailblazer-wash.git

    $ cd trailblazer-wash

    $ npm install

At this point you should open Chrome and load the unpacked extension. Don't
worry that it hasn't been built yet; we just need to get the ID that is
assigned to it by Chrome.

Visit chrome://extensions, check developer mode, and tap "Load unpacked
extension..."

When the file picker opens, navigate to the root of the git repo and tap "OK"

You should see the extension in the list now, and take note of the ID that
Chrome has assigned to it (referred to as CHROME_ID from now on)

Generate your API credentials:

Visit https://app.trailblazer.io/oauth/applications and create a new
application; it will ask for a name (choose anything), and a callback URL which
is based on the ID we got from loading the extension in Chrome.

Add this as a callback URL:

    https://CHROME_ID.chromiumapp.org/

Noting that CHROME_ID is what is displayed in the list of extensions.

When the app is created, you'll have an application ID.

Now we can set up the environment configuration based on the example

    $ cp .env-example .env

    $ vim .env # and insert your API credentials, configuration

## Building for Development

From the root directory

    $ npm run build

will build the application, ready to be loaded into Chrome.

**If you change any dependencies (i.e. install any local npm packages), ensure
you run `npm shrinkwrap --dev` and commit the changes**

### Loading into Chrome

- Visit [chrome://extensions](chrome://extensions) and check "Developer mode" if
  not already checked.
- Tap "Load unpacked extension..." which will open a file browser
- Navigate to this repository and click OK

You won't be able to sign in with it yet as we haven't whitelisted the
Extension's ID.

On [chrome://extensions](chrome://extensions), note that Trailblazer will have
"Loaded from: /path/to/your/repo", as well as "ID: dahsodahniwuheihxamalwa..."
Let us know your ID and we will whitelist your ID on the staging or production
API, depending on your preference.

## API

Documentation for the API that backs the extension can be found here:

- [Authentication](http://docs.trailblazerauthentication.apiary.io/)
- [Resource API](http://docs.trailblazerapiv1.apiary.io/)

## Domain Concepts

### Map / Trail

This is what the user sees when they view an assignment using Trailblazer's UI,
i.e. it's the sum of an Assignment and all of its Nodes rendered in the graph
layout.

### Assignment

This is the container to which browsing activity (Nodes) is attached.

As far as vernacular is concerned, it should be noted here that Assignment and
Map essentially refer to the same construct, but from different contexts (and
subsequently different boundaries regarding what they encompass).

When referring to it as an Assignment, this is usually from a context where the
data model is being considered in some detail (e.g. interacting with the API).
In these kinds of contexts it is often important to make the distinction
between the Map as a whole (which encompasses the Assignment, its Nodes and
often the User), and the Assignment component which acts as a container object
for Nodes and a join model between a Project and a User. In the case where it
is being referred to as a Map, it's less important to consider the intricacies
of the data model, considering it as a 'sum of its parts' - often in the
context of design and UI/UX.

### Node

This is the 'smallest' item in the data model, encompassing a visit to some web
address in the context of an Assignment. It houses information about the site,
as well as meta-data such as when the address was first visited. In future it
may also house information such as return visits and time spent viewing/idle.

## Workflow

Git, GitHub workflow for this Chrome Extension

1. Pull from GitHub so the local copy of `master` is up to date.
2. Start a feature branch, named appropriate to the story (e.g. the story may
   be called "Assignment list", so the branch is named `assignment-list`).
3. \[Do work things\].
4. When the feature is finished and is ready to go for code review, **prefix the
   branch with "[needs review]", open a new Pull Request**.
5. Someone else reviews the changes and either **closes the PR, merges the
   branch**, or gives **feedback to action before it can be
   closed/merged/delivered**.
