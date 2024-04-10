import {getDataFromSheet} from "~/googleSheet";

export default defineEventHandler(async () => {
   return await getDataFromSheet()
})
