import process from "process";
import {google} from "googleapis";
import type {UserWithBook} from "./types";


async function getAuth() {
    try {
        return google.auth.fromJSON({
            "type": "authorized_user",
            "client_id": process.env.GSHEET_CLIENT_ID,
            "client_secret": process.env.GSHEET_CLIENT_SECRET,
            "refresh_token": process.env.GSHEET_REFRESH_TOKEN,
        });
    } catch (err) {
        return null;
    }
}

async function appendDataToSheet(user: UserWithBook) {

    const auth = await getAuth();
    if (auth) {
        // @ts-expect-error
        const sheets = google.sheets({version: 'v4', auth});
        try {

            await sheets.spreadsheets.values.append({
                spreadsheetId: process.env.GSHEET_ID,
                includeValuesInResponse: false,
                valueInputOption: 'USER_ENTERED',
                range: process.env.GSHEET_RANGE,
                requestBody: {
                    values: [[user.name, user.phone, user.facebook, user.date, user.book, new Date().toLocaleDateString()]]
                }
            })
        } catch (e) {
            return false
        }
    }

    return false

}

async function getDataFromSheet() {
    const auth = await getAuth();
    if (auth) {
        // @ts-expect-error
        const sheets = google.sheets({version: 'v4', auth});
        try {

            const {data} = await  sheets.spreadsheets.values.get({
                range:process.env.GSHEET_LIST_RANGE,
                spreadsheetId:process.env.GSHEET_ID,
            })

            const rows = data.values;

            if (!rows || rows.length === 0) {
                return {
                    status: false,
                    message: "No data found."
                }
            }

            return rows.map((book) => {
                return {
                    id: book[0],
                    name: book[1],
                    image: book[2],
                    description: book[3],
                    author: book[4],
                }
            })
        } catch (e) {
            return []
        }
    }

    return []
}

export {appendDataToSheet, getDataFromSheet}
