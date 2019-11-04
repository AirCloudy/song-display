# Song Display Service

Some description

## Table of Contents

1. [Usage](#usage)
1. [API Documentation](#api-documentation)
1. [Related Projects](#related-projects)

## Usage

Some instructions... link to primary data used for seeding: https://docs.google.com/spreadsheets/d/1hwpB4m7tJ8hPoLTkCoKtxYwlTUDIy23vpFFD99mDMWs/edit#gid=0

## API Documentation

### GET /songs/:songid

Get a specific song. The response returns a JSON object.

**Response**

| Name  | Type | Description |
| ----- | ---- | ----------- |
| `songId` | `integer` | _Required_. Identifier for the song. |
| `artistId` | `integer` | _Required_. Identifier for the song artist. |
| `albumId` | `integer` | _Required_. Identifier for the song album. |
| `songName` | `string` | _Required_. Name of the song. |
| `songDataUrl` | `string` | URL of the song audio file. |
| `songDuration` | `integer` | _Required_. Duration of song in seconds. |
| `songWaveform` | `integer` | JSON object with key `positiveValues` containing array of decimal numbers. |
| `tag` | `string` | Hashtag for song. |
| `datePosted` | `timestamp` | _Required_. Timestamp of when song was posted. |

### POST /songs

Insert a new song record into the database. Data should be sent as a JSON object in the body of the request.

**Body**

| Name  | Type | Description |
| ----- | ---- | ----------- |
| `songId` | `integer` | _Required_. Identifier for the song. |
| `artistId` | `integer` | _Required_. Identifier for the song artist. |
| `albumId` | `integer` | _Required_. Identifier for the song album. |
| `songName` | `string` | _Required_. Name of the song. |
| `songDataUrl` | `string` | _Required_. URL of the song audio file. |
| `songDuration` | `integer` | _Required_. Duration of song in seconds. |
| `songWaveform` | `integer` | JSON object with key `positiveValues` containing array of decimal numbers. |
| `tag` | `string` | Hashtag for song. |
| `datePosted` | `timestamp` | _Required_. Timestamp of when song was posted. |

### PUT /songs

Update a song record in the database. Data should be sent as a JSON object in the body of the request.

**Body**

| Name  | Type | Description |
| ----- | ---- | ----------- |
| `songId` | `integer` | _Required. Cannot be a value to update_. Identifier for the target song to be updated. |
| `artistId` | `integer` | _Required_. Identifier for the song artist. |
| `albumId` | `integer` | _Required_. Identifier for the song album. |
| `songName` | `string` | _Required_. Name of the song. |
| `songDataUrl` | `string` | _Required_. URL of the song audio file. |
| `songDuration` | `integer` | _Required_. Duration of song in seconds. |
| `songWaveform` | `integer` | JSON object with key `positiveValues` containing array of decimal numbers. |
| `tag` | `string` | Hashtag for song. |
| `datePosted` | `timestamp` | _Required. Cannot be a value to update_. Timestamp of when song posted. |

### DELETE /songs/:songid

Removes a song record from the database, and removes any comment records related to the song.

### GET /comments/song/:songid

Get comments for a song. The response returns a JSON array of objects.

**Response**

| Name  | Type | Description |
| ----- | ---- | ----------- |
| `commentID` | `integer` | _Required_. Identifier for the comment. |
| `songId` | `integer` | _Required_. Identifier for the song. |
| `userId` | `integer` | _Required_. Identifier for the user. |
| `comment` | `string` | _Required_. Text of the comment. |
| `secondInSong` | `integer` | Second in the song that comment references. |
| `datePosted` | `timestamp` | _Required_. Timestamp of when comment posted. |

### POST /comments

Insert a comment record into the database for a song. Data should be sent as a JSON object in the body of the request.

**Parameters**

| Name  | Type | Description |
| ----- | ---- | ----------- |
| `songId` | `integer` | _Required_. Identifier for the song. |

**Body**

| Name  | Type | Description |
| ----- | ---- | ----------- |
| `commentID` | `integer` | _Required_. Identifier for the comment. |
| `songId` | `integer` | _Required_. Identifier for the song. |
| `userId` | `integer` | _Required_. Identifier for the user. |
| `comment` | `string` | _Required_. Text of the comment. |
| `secondInSong` | `integer` | Second in the song that comment references. |
| `datePosted` | `timestamp` | _Required_. Timestamp of when comment posted. |

### PUT /comments/:commentid

Updates a comment record in the database for a song. Data should be sent as a JSON object in the body of the request.

**Parameters**

| Name  | Type | Description |
| ----- | ---- | ----------- |
| `songId` | `integer` | _Required_. Identifier for the song. |

**Body**

| Name  | Type | Description |
| ----- | ---- | ----------- |
| `commentID` | `integer` | _Required_. Identifier for the comment. |
| `songId` | `integer` | _Required_. Identifier for the song. |
| `userId` | `integer` | _Required_. Identifier for the user. |
| `comment` | `string` | _Required_. Text of the comment. |
| `secondInSong` | `integer` | Second in the song that comment references. |
| `datePosted` | `timestamp` | _Required_. Timestamp of when comment posted. |


### DELETE /comments/:commentid

Removes a comment record from the database for a song.

**Parameters**

| Name  | Type | Description |
| ----- | ---- | ----------- |
| `songId` | `integer` | _Required_. Identifier for the song. |

## Related Projects

  - https://github.com/AirCloudy/angelique-proxy
  - Other?
