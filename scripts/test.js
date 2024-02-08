import fetch from "node-fetch";

const data = JSON.parse(fs.readFileSync("data-with-address.json", "utf-8"));

const main = async () => {
    for (let i = 0; i < data.entities.length; i++) {
        const c = data.entities[i];
        if (
            !c.content.centroid &&
            !c.content.centroid.lat &&
            !c.content.centroid.lon
        ) {
            undefined;
        }
        const lat = c.content.centroid.lat;
        const lon = c.content.centroid.lon;

        console.log(i);
        console.log(c.content.address);
    }
};

main();
