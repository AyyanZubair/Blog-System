const querystring = require("querystring");
const formidable = require('formidable')

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
};
