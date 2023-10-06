import { rest } from 'msw'
import { setupServer } from 'msw/node'
import {UserData} from '../types/types'
​
export const access_token = "my-access-token"
​
export const handlers = [
    rest.get("https://api.escuelajs.co/api/v1/users", (req, res, ctx) => {
        return res(ctx.json({}))
    }),
    rest.post('https://api.escuelajs.co/api/v1/auth/login', async (req, res, ctx) => {
        const { email, password } = await req.json()
        console.log(email, password)
        const foundUser = [{email:"asd", password:"pass", id:""}].find(u => u.email === email && u.password === password)
        if (foundUser) {
            const token = access_token + '_' + foundUser.id
            return res(ctx.json({ access_token: token }))
        }
        else {
            ctx.status(401)
            return res(ctx.text("Cannot authenticate user"))
        }
    }),
    rest.get('https://api.escuelajs.co/api/v1/auth/profile', (req, res, ctx) => {
        const token = req.headers.get("Authorization")?.split(' ')[1]
        const originalToken = token?.split('_')[0]
        const userId = token?.split('_')[1]
        console.log('token: ', token)
        const user = [{email:"asd", password:"pass", id:1}].find(u => u.id === Number(userId))
        if (originalToken === access_token && user) {
            return res(ctx.json(user))
        }
        else {
            ctx.status(401)
            return res(ctx.text("Cannot authenticate user"))
        }
    })
]
​
const userServer = setupServer(...handlers)
​
export default userServer