const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const api = supertest(app)
const Post = require('../models/post')
const helper = require('./testHelper')

let server;