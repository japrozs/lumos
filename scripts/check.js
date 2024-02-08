import fs from "node:fs";

const data = JSON.parse(fs.readFileSync("data-with-address.json", "utf-8"));
const dataComplete = JSON.parse(
    fs.readFileSync("colleges-data-complete.json", "utf-8")
);

let undef = 0;
let def = 0;

const main = async () => {
    for (let i = 0; i < data.entities.length; i++) {
        const c = data.entities[i];

        const dataCompleteIndexed = dataComplete[c.content.entity.name];
        if (dataCompleteIndexed === undefined) {
            undef++;
        } else {
            def++;
            data.entities[i].content.complete_profile = dataCompleteIndexed;
        }
        console.log(dataComplete[c.content.entity.name]);

        // console.log(c.content.featuredReview);
    }
    console.log(undef, def);
    fs.writeFileSync(
        "data-with-complete-profile.json",
        JSON.stringify(data),
        "utf-8"
    );
};

main();
