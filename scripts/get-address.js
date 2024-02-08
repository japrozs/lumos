import fs from "node:fs";
import fetch from "node-fetch";

const data = JSON.parse(
    fs.readFileSync("data-with-complete-profile.json", "utf-8")
);

const main = async () => {
    for (let i = 0; i < data.entities.length; i++) {
        const c = data.entities[i];
        if (!c.content.centroid) {
            continue;
        }
        const lat = c.content.centroid.lat;
        const lon = c.content.centroid.lon;
        console.log(
            `requesting https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`
        );
        let req;
        try {
            req = await fetch(
                ` https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`,
                {
                    headers: {
                        accept: "application/json",
                    },
                    method: "GET",
                }
            );
        } catch (err) {
            console.log("error aaya");
            fs.writeFileSync(
                "data-with-address.json",
                JSON.stringify(data),
                "utf-8"
            );
            break;
        }
        const json = await req.json();
        data.entities[i].content.address = json;
        console.log("index : ", i);
        console.log(data.entities[i].content.address);
        fs.writeFileSync(
            "data-with-address.json",
            JSON.stringify(data),
            "utf-8"
        );
        new Promise((resolve) => setTimeout(resolve, 1000));
    }
    fs.writeFileSync("data-with-address.json", JSON.stringify(data), "utf-8");
};

main();
// (`https://nominatim.openstreetmap.org/reverse?lat=35.048247&lon=-85.299812&format=json&addressdetails=1`)
