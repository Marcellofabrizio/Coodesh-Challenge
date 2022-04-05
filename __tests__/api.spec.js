const {
    expect,
    describe,
    test
} = require('@jest/globals');

const superTest = require('supertest')
const { mongoose } = require('mongoose')

const { app } = require('../server/index.js')
const Article = require('../models/Article.js');

const request = superTest(app)

describe("Articles API Test Suite", () => {

    beforeAll(async () => {
        await mongoose.connect("mongodb+srv://MarcelloFabrizio:EspacialMongo@cluster0.gwwrw.mongodb.net/testDatabase?retryWrites=true&w=majority")
    })

    afterAll(async () => {
        Article.deleteMany()
        mongoose.connection.close()
    })

    // Closing the DB connection allows Jest to exit successfully.
    afterAll(async () => {
        await mongoose.connection.close()
    })

    test("GET / - it should respond with the Coodesh Challange Text", async () => {
        const expected = "Back-end Challenge 2021 🏅 - Space Flight News"
        const response = await request.get('/')

        expect(response.text).toBe(expected)
    })

    test("GET /articles/count - it should return a number of registered articles", async () => {
        const response = await request.get('/articles/count')

        expect(response.body.count).toBeGreaterThanOrEqual(0)
    })

    test("GET /articles - it should return an array of size given by count", async () => {
        const expected = await request.get('/articles/count')
        const response = await request.get('/articles')

        expect(response.body.length).toBeGreaterThanOrEqual(expected.body.count)
    })

    test("POST /articles - it should return the created article", async () => {
        const expected = await request.get('/articles/count')

        const newArticle =
        {
            "featured": false,
            "title": "York Space to triple satellite production to meet military and commercial demand",
            "url": "https://spacenews.com/york-space-to-triple-satellite-production-to-meet-military-and-commercial-demand/",
            "imageUrl": "https://spacenews.com/wp-content/uploads/2022/04/MG_8616.jpg",
            "newsSite": "SpaceNews",
            "summary": "",
            "publishedAt": "2022-04-05T13:09:40.000Z",
            "launches": [],
            "events": []
        }

        await request.post("/articles").send(newArticle)

        const response = await request.get('/articles/count')

        expect(response.body.count).toBeGreaterThan(expected.body.count);

    })

    test("GET /articles/{id} - it should return an article by its id", async () => {

        const newArticle =
        {
            "featured": false,
            "title": "York Space to triple satellite production to meet military and commercial demand",
            "url": "https://spacenews.com/york-space-to-triple-satellite-production-to-meet-military-and-commercial-demand/",
            "imageUrl": "https://spacenews.com/wp-content/uploads/2022/04/MG_8616.jpg",
            "newsSite": "SpaceNews",
            "summary": "",
            "publishedAt": "2022-04-05T13:09:40.000Z",
            "launches": [],
            "events": []
        }

        const expected = await request.post("/articles").send(newArticle)

        const response = await request.get(`/articles/${expected._id}`)

        expect(response.body._id).toBe(expected._id);

    })

    test("GET /articles/{id} - it should return status 400 if article is not found", async () => {
        const expectedStatus = 400

        const mockId = mongoose.Types.ObjectId().toString()

        const response = await request.get(`/articles/${mockId}`)

        expect(response.status).toBe(expectedStatus);
    })

    test("PUT /articles - it should return the edited article", async () => {
        const newArticle =
        {
            "featured": false,
            "title": "York Space to triple satellite production to meet military and commercial demand",
            "url": "https://spacenews.com/york-space-to-triple-satellite-production-to-meet-military-and-commercial-demand/",
            "imageUrl": "https://spacenews.com/wp-content/uploads/2022/04/MG_8616.jpg",
            "newsSite": "SpaceNews",
            "summary": "",
            "publishedAt": "2022-04-05T13:09:40.000Z",
            "launches": [],
            "events": []
        }

        const postResponse = await request.post("/articles").send(newArticle)

        const editedArticle =
        {
            "_id": postResponse.body._id,
            "featured": true,
            "title": "York Space to triple satellite production to meet military and commercial demand",
            "url": "https://spacenews.com/york-space-to-triple-satellite-production-to-meet-military-and-commercial-demand/",
            "imageUrl": "https://spacenews.com/wp-content/uploads/2022/04/MG_8616.jpg",
            "newsSite": "SpaceNews",
            "summary": "This is an edited summary",
            "publishedAt": "2022-04-05T13:09:40.000Z",
            "launches": [],
            "events": []
        }

        const response = await request.put("/articles").send(editedArticle)

        expect(response.body.summary).toEqual(editedArticle.summary)

    })

    test("PUT /articles - it should return status 400 if article to edit is not found", async () => {

        const expectedStatus = 400

        const newArticle =
        {
            "featured": false,
            "title": "York Space to triple satellite production to meet military and commercial demand",
            "url": "https://spacenews.com/york-space-to-triple-satellite-production-to-meet-military-and-commercial-demand/",
            "imageUrl": "https://spacenews.com/wp-content/uploads/2022/04/MG_8616.jpg",
            "newsSite": "SpaceNews",
            "summary": "",
            "publishedAt": "2022-04-05T13:09:40.000Z",
            "launches": [],
            "events": []
        }

        await request.post("/articles").send(newArticle)

        const editedArticle =
        {
            "featured": true,
            "title": "York Space to triple satellite production to meet military and commercial demand",
            "url": "https://spacenews.com/york-space-to-triple-satellite-production-to-meet-military-and-commercial-demand/",
            "imageUrl": "https://spacenews.com/wp-content/uploads/2022/04/MG_8616.jpg",
            "newsSite": "SpaceNews",
            "summary": "This is an edited summary",
            "publishedAt": "2022-04-05T13:09:40.000Z",
            "launches": [],
            "events": []
        }

        const response = await request.put("/articles").send(editedArticle)

        expect(response.status).toEqual(expectedStatus)

    })

})