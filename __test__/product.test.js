const app = require('../app')
const request = require('supertest')
const { User, sequelize } = require('../models')
const { Product } = require('../models')
const queryInterface = sequelize.getQueryInterface();
const data = require("./lib/data.json");
const { createToken } = require('../helpers/bcrypt');

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
    } catch (error) {
        console.log(error)
    }
})

afterAll(async () => {
    await Product.destroy({ truncate: true, restartIdentity: true, cascade: true })
    await queryInterface.bulkDelete('Users', null, { truncate: true, restartIdentity: true, cascade: true })
    sequelize.close()
})

describe("Product /customers/products", () => {
    describe("Fetch product success eith status 200", () => {
        it("Fetch Products response success with status 200", async () => {
            const response = await request(app)
                .get('/customers/products')
                .set({ authorization })
            expect(response.status).toBe(200)
            expect(typeof response.body).toBe("object")
            expect(Array.isArray(response.body.products)).toBe(true)
        })
    })
    describe("Fetch product success with filter", () => {
        it("Fetch Products with filter response success with status 200", async () => {
            const response = await request(app)
                .get('/customers/products?name=Stego')
                .set({ authorization })
            // console.log(response)
            expect(response.status).toBe(200)
            expect(typeof response.body.products).toBe("object")
            expect(Array.isArray(response.body.products)).toBe(true)
            expect(response.body.products[0].name).toBe("Stegosaurus")
        })
    })
    describe("Fetch product success with pagination", () => {
        it("Fetch Products with pagination response success with status 200", async () => {
            const response = await request(app)
                .get('/customers/products?page=1')
                .set({ authorization })
            expect(response.status).toBe(200)
            expect(typeof response.body.products).toBe("object")
            expect(Array.isArray(response.body.products)).toBe(true)
            expect(response.body.products.length).toBe(3)
        })
    })
    describe("Fetch product with detail by id success", () => {
        it("Fetch Products with detail by id response success with status 200", async () => {
            const response = await request(app)
                .get('/customers/products/1')
                .set({ authorization })
            expect(response.status).toBe(200)
            expect(typeof response.body).toBe("object")
            expect(response.body.id).toBe(1)
        })
    })
    describe("Fetch product with detail by id failed", () => {
        it("Fetch Products with detail by id response failed with status 404", async () => {
            const response = await request(app)
                .get('/customers/products/100')
                .set({ authorization })
            expect(response.status).toBe(404)
            expect(response.body.message).toBe("Error: Product not found")
        })
    })
})