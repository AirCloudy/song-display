# Song Display Service

Some description

## Table of Contents

1. [Usage](#usage)
1. [API Documentation](#api-documentation)
1. [Related Projects](#related-projects)

## Usage

Some instructions...

## API Documentation

```GET /query/getSong/:songid```
Returns array with two items. The first is an array with song data, the second is an arary of arrays with comments data.
(May need to break this up into GET /songs/:songid and GET /comments/:songid)

```POST /songs```
Inserts a new song record into the database

```PUT /songs/:songid```
Updates a song record in the database

```DELETE /songs/:songid```
Removes a song record in the database, and removes any related comment records

```POST /comments/```
Inserts a comment record into the database for a specific song

```PUT /comments/[:songid]/:commentid```
Updates a comment record in the database [songid would be removed if picking SQL db]

```DELETE /comments]/[:songid/:commentid```
Removes a comment record from the database [songid would be removed if picking SQL db]

## Related Projects

  - https://github.com/AirCloudy/angelique-proxy
  - Other?
