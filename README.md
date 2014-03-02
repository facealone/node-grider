# Grider

REST uploader for MongoDB's GridFS

[![Build Status](https://travis-ci.org/konteck/node-grider.png)](https://travis-ci.org/konteck/node-grider)

## Installation

    $ npm install grider -g

## Features

  * Upload any file to GridFS via HTTP POST request
  * Support additional fields storing together with file object itself

## Usage

Run as standalone server

    grider --server --port=8888 --mongodb_uri=mongodb://127.0.0.1:27017/test

## Request params

You can send additional fields to store with file, except 'file' everything is optional:

* `file`          - `multipart/form-data` encoded file
* `_id`           - MongoDB ObjectID `(optional)`
* `filename`      - Filename that used to store file in GridFS `(optional)`
* `mode`          - Default value: w, possible options: w, w+ or r, see [GridStore] `(optional)`
* `chunkSize`     - Size for the chunk. Defaults to 1024 `(optional)`
* `metadata`      - Arbitrary data to store. String encoded JSON `(optional)`
* `content_type`  - Mime type of the file `(optional)`
* `root`          - Root collection to use `(optional)`

## License 

(The MIT License)

Copyright (c) 2014 Alex Movsisyan

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
