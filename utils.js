const querystring = require("querystring");
<<<<<<< HEAD
const formidable = require('formidable')
=======
>>>>>>> 28aa799d4f4ddc65b44b7a882585457894f93f84

function parseIncomingBodyData(req) {
    return new Promise((resolve, reject) => {
        let data = "";

        req.on("data", (value) => {
            data += value;
        });

        req.on("end", () => {
            try {
                const parsedData = querystring.parse(data);
                resolve(parsedData);
            } catch (error) {
                console.error("Error parsing incoming body data:", error);
                reject(error);
            }
        });

        req.on("error", (err) => {
            console.error("Error reading request data:", err);
            reject(err);
        });
    });
}

<<<<<<< HEAD
function parseFormData(req) {
    return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error("Error parsing form data:", err);
                reject(err);
            } else {
                // console.log("Parsed form data:", { fields, files });
                resolve({ fields, files });
            }
        });
    });
}

module.exports = {
    parseIncomingBodyData, parseFormData
=======
module.exports = {
    parseIncomingBodyData,
>>>>>>> 28aa799d4f4ddc65b44b7a882585457894f93f84
};
