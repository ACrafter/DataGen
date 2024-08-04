import { faker } from "@faker-js/faker";
import axios from "axios";
import fs from "fs";

const machineNames = ["Machine 1", "Machine 2", "Machine 3"];
const failedRequestsFile = "failed_requests.json";

for (let index = 0; index < 2000; index++) {
  const record = {
    machineName: machineNames[Math.floor(Math.random() * machineNames.length)],
    lineName: "Line 3",
    production: faker.number.int({ min: 5, max: 15 }),
    good: faker.number.int({ min: 3, max: 12 }),
    bad: faker.number.int({ min: 2, max: 3 }),
    status: true,
    createdAt: new Date(new Date().setDate(new Date().getDate() + index)),
  };

  axios
    .post("http://localhost:3000/machines", record)
    .then((response) => {
      console.log("Response:", response.data);
    })
    .catch((error) => {
      // If the request fails, write the record to a file
      fs.appendFileSync(
        failedRequestsFile,
        JSON.stringify(record) + "\n",
        "utf8"
      );
    });
}
