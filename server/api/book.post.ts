import {appendDataToSheet} from "~/googleSheet";
import {User} from "~/types";


export default defineEventHandler(async (event) => {
    const body = await readBody<User>(event)

    return {status: await appendDataToSheet(body)}
})
