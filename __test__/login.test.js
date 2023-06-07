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

describe("customers/login Login POST", () => {
    describe("Success Login", () => {
        it("Login response success with status 200", async () => {
            const registerBody = {
                email: "jun@kambing.com",
                password: "jun123",
            }
            const response = await request(app)
                .post('/customers/login')
                .send(registerBody)
            expect(response.status).toBe(200)
            expect(typeof response.body).toBe("object")
            expect(response.body.message).toBe("Success Login")
            expect(typeof response.body.token).toBe("string")
            expect(typeof response.body.id).toBe("number")
            expect(typeof response.body.username).toBe("string")
            expect(typeof response.body.role).toBe("string")
        })
    })

    describe("Login Failed", () => {
        it("Login response error with status 400 password wrong", async () => {
            const registerBody = {
                email: "jun@kambing.com",
                password: "jun1234",
            }
            const response = await request(app)
                .post('/customers/login')
                .send(registerBody)
            expect(response.status).toBe(401)
            expect(typeof response.body).toBe("object")
            expect(response.body.message).toBe("Email or password is wrong")
        })

        it("Login response error with status 400 email not define in database", async () => {
            const registerBody = {
                email: "junn@kambing.com",
                password: "jun123",
            }
            const response = await request(app)
                .post('/customers/login')
                .send(registerBody)
            expect(response.status).toBe(401)
            expect(typeof response.body).toBe("object")
            expect(response.body.message).toBe("Email or password is wrong")
        })
    })
})