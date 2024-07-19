const https = require('https');

async function email_chick(email) {
    const encodedEmail = encodeURIComponent(email);
    const options = {
        method: 'GET',
        hostname: 'valid-email2.p.rapidapi.com',
        path: '/free-validation?email=' + encodedEmail,
        headers: {
            'x-rapidapi-key': process.env.EMAILE_API_KEY,
            'x-rapidapi-host': 'valid-email2.p.rapidapi.com'
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, function (res) {
            const chunks = [];

            res.on('data', function (chunk) {
                chunks.push(chunk);
            });

            res.on('end', function () {
                const body = Buffer.concat(chunks);
                const ans = JSON.parse(body.toString());
                resolve(ans.is_valid);
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.end();
    });
}
function check(a)
{
    return true;
}
module.exports={
    email_chick :email_chick,
    check:check
}
