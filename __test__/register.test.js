const app = require('../app')
const request = require('supertest')
const { User, sequelize } = require('../models')
const queryInterface = sequelize.getQueryInterface();


beforeAll(() => {
    User.create({
        username: "jun",
        email: "jun@kambing.com",
        password: "jun123",
        addres: "jahanam",
        phoneNumber: "08123345567"
    })
})

afterAll(() => {
    queryInterface.bulkDelete('Users', null, { truncate: true, restartIdentity: true, cascade: true })
    sequelize.close()
})

describe("/customers/register POST", () => {
    it("Register response success with status 201", async () => {
        const registerBody = {
            username: "jun",
            email: "junxx@kambing.com",
            password: "jun123",
            addres: "jahanam",
            phoneNumber: "08123345567"
        }
        const response = await request(app)
            .post('/customers/register')
            .send(registerBody)
        expect(response.status).toBe(201)
        expect(typeof response.body).toBe("object")
        expect(response.body.message).toBe("User with username jun successfully created")
        expect(typeof response.body.data).toBe("object")
    })
    describe("Erorr Email empty or zero length", () => {
        it("Register response error with status 400 email empty", async () => {
            const registerBody = {
                username: "jun",
                password: "jun123",
                addres: "jahanam",
                phoneNumber: "08123345567"
            }
            const response = await request(app)
                .post('/customers/register')
                .send(registerBody)
            expect(response.status).toBe(400)
            expect(typeof response.body).toBe("object")
            expect(response.body.message).toBe("Email cannot empty")
        })

        it("Register response error with status 400 email length = 0", async () => {
            const registerBody = {
                username: "jun",
                email: "",
                password: "jun123",
                addres: "jahanam",
                phoneNumber: "08123345567"
            }
            const response = await request(app)
                .post('/customers/register')
                .send(registerBody)
            expect(response.status).toBe(400)
            expect(typeof response.body).toBe("object")
            expect(response.body.message).toBe("Email cannot empty")
        })

        it("Register response error with status 400 email format is wrong", async () => {
            const registerBody = {
                username: "jun",
                email: "lkjguabgvhrhvuhbaf",
                password: "jun123",
                addres: "jahanam",
                phoneNumber: "08123345567"
            }
            const response = await request(app)
                .post('/customers/register')
                .send(registerBody)
            expect(response.status).toBe(400)
            expect(typeof response.body).toBe("object")
            expect(response.body.message).toBe("Email format wrong")
        })

        it("Register response error with status 400 email unique", async () => {
            const registerBody = {
                username: "jun",
                email: "jun@kambing.com",
                password: "jun123",
                addres: "jahanam",
                phoneNumber: "08123345567"
            }
            const response = await request(app)
                .post('/customers/register')
                .send(registerBody)
            expect(response.status).toBe(400)
            expect(typeof response.body).toBe("object")
            expect(response.body.message).toBe("This email has taken")
        })
    })

    describe("Error Username empty or zero length", () => {
        it("Register response error with status 400 username empty", async () => {
            const registerBody = {
                email: "jun@kambing.com",
                password: "jun123",
                addres: "jahanam",
                phoneNumber: "08123345567"
            }
            const response = await request(app)
                .post('/customers/register')
                .send(registerBody)
            expect(response.status).toBe(400)
            expect(typeof response.body).toBe("object")
            expect(response.body.message).toBe("Username cannot empty")
        })

        it("Register response error with status 400 username length = 0", async () => {
            const registerBody = {
                username: "",
                email: "jun@kambing.com",
                password: "jun123",
                addres: "jahanam",
                phoneNumber: "08123345567"
            }
            const response = await request(app)
                .post('/customers/register')
                .send(registerBody)
            expect(response.status).toBe(400)
            expect(typeof response.body).toBe("object")
            expect(response.body.message).toBe("Username cannot empty")
        })
    })

    describe("Error Password empty or zero length", () => {
        it("Register response error with status 400 email empty", async () => {
            const registerBody = {
                username: "jun",
                email: "jun@kambing.com",
                addres: "jahanam",
                phoneNumber: "08123345567"
            }
            const response = await request(app)
                .post('/customers/register')
                .send(registerBody)
            expect(response.status).toBe(400)
            expect(typeof response.body).toBe("object")
            expect(response.body.message).toBe("Password cannot empty")
        })

        it("Register response error with status 400 email empty", async () => {
            const registerBody = {
                username: "jun",
                email: "jun@kambing.com",
                password: "",
                addres: "jahanam",
                phoneNumber: "08123345567"
            }
            const response = await request(app)
                .post('/customers/register')
                .send(registerBody)
            expect(response.status).toBe(400)
            expect(typeof response.body).toBe("object")
            expect(response.body.message).toBe("Password cannot empty")
        })

        it("Register response error with status 400 password length lower than 5", async () => {
            const registerBody = {
                username: "jun",
                email: "jun@kambing.com",
                password: "jun",
                addres: "jahanam",
                phoneNumber: "08123345567"
            }
            const response = await request(app)
                .post('/customers/register')
                .send(registerBody)
            expect(response.status).toBe(400)
            expect(typeof response.body).toBe("object")
            expect(response.body.message).toBe("Minimum Password Characters is 5")
        })
    })
})