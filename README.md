# config-editor


This project started out as a simple way to view/edit text configuration files on my server.  I have since added some limited image viewing support as well as syntax highlighting for Javascript files.  
Basically this is my attempt at learning Vue.js while also rolling my own code editor.  The frontend VUE framework is Nuxt.JS and the backend api is written in AdonisJS.  Currently it has very basic support for browsing the filesystem it is running on (currently only developed for Linux but should work on MacOS as well.)
This code is buggy as I am still learning Vue.js.  In the near future I plan on adding:


* More languages for syntax highlighting (probably with a dropdown above the editor to choose).
* Basic image editing functionality including cropping and resizing.
* Support for Word Wrap in the editor.
* Support for remote filesystems (probably over sshfs)
* General bugfixes and cleanup.
* Ability to create files/folders.
 
*** This README was edited in the browser using this very tool.

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
