# Song Display Service

Some description

## Table of Contents

1. [Usage](#usage)
1. [API Documentation](#api-documentation)
1. [Related Projects](#related-projects)

## Usage

Some instructions... link to primary data used for seeding: https://docs.google.com/spreadsheets/d/1hwpB4m7tJ8hPoLTkCoKtxYwlTUDIy23vpFFD99mDMWs/edit#gid=0

## API Documentation

** GET /query/getSong/:songid **
Gets song and comments data for a song with the specified songid. The response returns a JSON array with two elements. The first is an object containing song data, the second is an array of objects containing comments data.

Example response:
```
[
  {
    song_id: 55,
    song_name: 'sometime somewhere',
    artist_name: 'shakira wannabe',
    date_posted: '06/04/2014',
    tag: '# Pop',
    song_art_url: 'www.artsy.com/something',
    song_data_url: 'wwww.aws.com/somesome',
    background_light: '(292, 23, 33)', // rgb value
    background_dark: '(292, 23, 33)', // rgb value
    waveform_data: {positiveValues: [0, 0.29, 0.59]},
    song_duration: 136 // duration in seconds
  },
  [
    {
      comment_id: 1,
      user_name: 'angeliquemari',
      time_stamp: 99, // reference to second in song
      comment: 'some comment'
    },
    {
      comment_id: 2,
      user_name: 'bobthebuilder',
      time_stamp: 88, // reference to second in song
      comment: 'another comment'
    }
  ]
]
```

** POST /songs **
Inserts a new song record into the database. Song data should be sent in the body of the request, as a JSON object with the following keys:
  - song_id
  - song_name (string)
  - artist_name (string)
  - date_posted (date)
  - tag (string)
  - song_art_url (string)
  - song_data_url (string)
  - background_light (string, rgb value with format '(#, #, #)')
  - background_dark (string, rgb value with format '(#, #, #)')
  - waveform_data (JSON object with key `positiveValues` containing array of decimal numbers)
  - song_duration (integer, duration in seconds)
}

** PUT /songs/:songid **
Updates a song record in the database for the specified songid. The updated version of the data should be a JSON object in the body of the request (key options listed in POST method to /songs).

** DELETE /songs/:songid **
Removes a song record in the database, for the specified songid, and removes any comment records related to the song.

** POST /comments?songid=:songid **
Inserts a comment record into the database for a specific song (specified in query parameter). Comment data should be sent in the body of the request, as a JSON object with the following keys:
  - user_name (string)
  - time_stamp (integer, reference to second in song)
  - comment (string)

** PUT /comments/:commentid?songid=:songid **
Updates a comment record in the database for a specific song (specified in query parameter). The updated version of the data should be a JSON object in the body of the request (key options listed in POST method to /comments).

** DELETE /comments/:commentid?songid=:songid **
Removes a comment record from the database for a specific song (specified in query parameter).

## Related Projects

  - https://github.com/AirCloudy/angelique-proxy
  - Other?
