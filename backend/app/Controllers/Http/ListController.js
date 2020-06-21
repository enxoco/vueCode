'use strict'
const fs = require('fs').promises;
const dirread = require('fs')
const shell = require('shelljs')
class ListController {
    async Index ({ request, response }) {

        let rootDir = dirread.readdirSync('/');
        return await rootDir;
    }
    async PathIndex ({ request }) {
        const { path } = request.all();

                let result = (async() => {
                    const stat = await fs.lstat(path);
                    if (stat.isFile()){
			if (path.match(/.png|.jpg/)) {
			    return {file: await fs.readFile(path, 'base64')}
			}
                        return {file: await fs.readFile(path, 'utf-8')}
                        return fs.readFile(path)
                    }
                    if (stat.isDirectory()){
                        return {dir: await fs.readdir(path)}
                        return fs.readdir(path)
                    }
                    console.log(stat.isFile());
                    console.log(stat.isDirectory())
                })().catch(console.error)

        return await result

    }
    
    async DeleteFile ({ request }) {
        const { file } = request.all()
        let result = shell.rm(file)
        return await result 
    }

    async UpdateFile ({ request }) {
        const { file, data } = request.all()
        let result = fs.writeFile(data.path, data.file)
        if (result) {
            return {status: 'Updated'}
        }
    }
}

module.exports = ListController
