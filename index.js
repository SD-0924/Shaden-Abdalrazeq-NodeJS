const fs = require("fs/promises");

async function loadConfig() {
  try {
    const data = await fs.readFile("./config.json", "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading config file:", err);
  }
}




async function readFiles(filePath){
    try{
        const content = await fs.readFile(filePath, "utf-8");
        const wordLst = content.split(/\s+/);

        const filteredWords = wordLst.filter((word) => {
            const noSpecialChars = /[a-zA-Z]/.test(word);
            const notANumber = !/^\d+$/.test(word);

            return noSpecialChars && notANumber;
        });
        const wordCount = filteredWords.length;
        
        //console.log(`${filePath} has ${wordLst}`);
        //console.log(`${filePath} has ${filteredWords}`);
        const formattedFilePath = filePath.replace("./text-files/", "files/");
        console.log(`${formattedFilePath}: ${wordCount} words`);
    }catch(err){
        console.error(`Error reading file ${filePath}`, err);
    }
}
async function main() {
  const config = await loadConfig();
  const filePromises = config.files.map((filePath) => readFiles(filePath));
  await Promise.all(filePromises); 
}

main();



