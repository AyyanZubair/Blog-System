const querystring = require("querystring");

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

module.exports = {
    parseIncomingBodyData,
};
