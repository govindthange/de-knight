import IpfsApi from "ipfs-api";
import fs from "fs";

const ipfs = IpfsApi({
  host: "ipfs",
  port: 5001,
  protocol: "http",
  headers: {
    // Use this to send custom header
    // authorization: 'Bearer ' + TOKEN
  },
});

export function pushSampleDataToIpfs() {
  return new Promise((resolve, reject) => {
    let sampleFile = fs.readFileSync("./assets/sample-ipfs-data.txt"); // Reading a sample file to test ipfs upload
    let fileBuffer = new Buffer(sampleFile); // Creating buffer for ipfs function to add file to the system
    ipfs.files.add(fileBuffer, function (err, file) {
      if (err) {
        console.log(err);
        resolve(err);
      }
      console.log(`Added file: ${JSON.stringify(file)}`);
      resolve(file);
    });
  });
}

export default { pushSampleDataToIpfs };
