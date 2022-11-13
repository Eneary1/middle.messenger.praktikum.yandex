const fs = require("fs")
const path = require("path")

const getAllFiles = function(dirPath, arrayOfFiles = []) {
	const files = fs.readdirSync(dirPath)
	files.forEach((file) => {
		const tempPath = dirPath + "/" + file 
		if (fs.statSync(tempPath).isDirectory()) {
			if (file !== "node_modules" && file !== ".git" && file !== ".github" && file !== ".parcel-cache" && file !== "dist")
				arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
		} else {
			const filePath = path.join(__dirname, dirPath, "/", file)
			if (path.extname(filePath) !== ".png") arrayOfFiles.push(filePath)
		}
	})
	return arrayOfFiles
}

const files = getAllFiles(".")

files.forEach((file) => {
	const text = fs.readFileSync(file).toLocaleString()
	if (text[text.length - 1] !== "\n") {
		fs.appendFileSync(`${file}`, "\n")
	}
})
