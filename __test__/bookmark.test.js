const app = require('../app')
const request = require('supertest')
const { Bookmark, sequelize } = require('../models')
const { Product, User } = require('../models')
const queryInterface = sequelize.getQueryInterface();
const data = require("./lib/data.json");
const { createToken } = require('../helpers/bcrypt');
const invalidToken = "nhgvraywt4823yrfe78u4y7weRF8HIUGVBNFDKCXFVY84GR4"


const newData = data.map((el) => {
    el.createdAt = new Date()
    el.updatedAt = new Date()
    return el
})
const payload = {
    id: 1,
    email: "jun@kambing.com"
}
const authorization = createToken(payload)

beforeAll(async () => {
    try {
        await User.create({
            username: "jun",
            email: "jun@kambing.com",
            password: "jun123",
            addres: "jahanam",
            phoneNumber: "08123345567"
        })
        await queryInterface.bulkInsert("Products", newData, {})
        await Bookmark.create({ UserId: 1, ProductId: 1 })
    } catch (error) {
        console.log(error)
    }
})

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, { truncate: true, restartIdentity: true, cascade: true })
    await Product.destroy({ truncate: true, restartIdentity: true, cascade: true })
    await Bookmark.destroy({ truncate: true, restartIdentity: true, cascade: true })
    sequelize.close()
})

describe("Bookmarks /customers/bookmarks", () => {
    describe("Fetch Bookmark success with status 200", () => {
        it("Fetch Bookmark response success with status 200", async () => {
            const response = await request(app)
                .get('/customers/bookmarks')
                .set({ authorization })
            expect(response.status).toBe(200)
            expect(typeof response.body).toBe("object")
        })
        it("Fetch Bookmark response failed with status 401", async () => {
            const response = await request(app)
                .get('/customers/bookmarks')
            expect(response.status).toBe(401)
            expect(response.body.message).toBe("Invalid or Expired Token !!!")
        })
        it("Fetch Bookmark response failed with status 401", async () => {
            const response = await request(app)
                .get('/customers/bookmarks')
                .set({ authorization: invalidToken })
            expect(response.status).toBe(401)
            expect(response.body.message).toBe("Invalid Token")
        })
    })
    describe("Add Bookmark success with status 201", () => {
        it("Add Bookmark response success with status 201", async () => {
            const response = await request(app)
                .post('/customers/bookmarks/1')
                .set({ authorization })
            expect(response.status).toBe(201)
            expect(typeof response.body.data).toBe("object")
            expect(response.body.message).toBe("Success add bookmark")
        })
    })
    describe("Add Bookmark failed with status 404", () => {
        it("Add Bookmark response failed because no product in database with status 404", async () => {
            const response = await request(app)
                .post('/customers/bookmarks/100')
                .set({ authorization })
            console.log(response.body, ">>>>")
            expect(response.status).toBe(404)
            expect(response.body.message).toBe("Error: Product not found")
        })
    })
})
