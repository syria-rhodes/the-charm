const router = require('express').Router();
const {google} = require('googleapis');
const dotenv = require('dotenv')
dotenv.config();


const sheets = google.sheets('v4');
const keyFile = 'google_key.json';
const scopes = "https://www.googleapis.com/auth/spreadsheets";
const auth = new google.auth.GoogleAuth({
    keyFile,
    scopes
});
const spreadsheetId = process.env.SPREADSHEET_ID;

router.get('/', async (req, res) => {
    const dates = await sheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: 'DaysOff!A1:Z1'
    })
    try {
        console.log('google')
        res.json(dates.data.values[0]);        
    } catch (error) {
        console.log(error)
    }
})

router.post('/append', async (req, res) => {
    const info = req.body.orderInfo
    const orders = await sheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: 'Orders!A1:D3',
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: [info]
        }
    })
    try {
        console.log(orders.data.values);
        res.json('hello')
    } catch (err) {
        console.log(err)
    }
})


module.exports = router;