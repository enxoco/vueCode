<template>
<div>
  <h1 class="title">vueCode</h1>
  <div class="container">
      <div class="sidebar">
        <input v-model="path" @keyup="getList" placeholder="Enter file/folder path" class="search" />
        <ul v-if="dir" class="fileList">
          <li v-if="!file && !dir">No file/directory found at {{ path }}</li>
          <li v-for="(i, index) in dir">
            <button @click="addToPath(i)">{{ i }}</button>
          </li>
        </ul>
      </div>
      <div class="editor">
        <img v-if="fileStatus.base64"  :src="fileStatus.base64" />
        <textarea v-if="file" @keydown.tab.prevent="insertTab($event)" v-model="file" v-text="file"></textarea>
      
        <div class="links">
          <a @click="deleteFile" class="button--green">Delete file</a>
          <a @click="saveFile" class="button--grey">Save file</a>
        </div>
      </div>

  </div><!-- /container -->
  </div>
</template>

<script>
  import Logo from "~/components/Logo.vue";
  const axios = require("axios");
  export default {
    components: {
      Logo
    },
    data: function() {
      return {
        dir: null,
        file: null,
        path: "",
        searchString: [''],
        filteredList: '',
        fileStatus: {open: false, file: null, fileType: null}
      };
    },
    created: function() {
      axios
        .get(`http://localhost:3333/`)
        .then(response => (this.dir = response.data));
    },
    methods: {
      clearSearch() {
        this.searchString = ['']
      },
      addToPath(str) {
        if (this.fileStatus.open) {
          this.path = this.path.replace(this.fileStatus.file, '')
          this.path = this.path.replace(/\/\//, '')
        }
    // if (this.dir.includes(str)) {
    //   var breadcrumb = this.path.split('/')
    //   breadcrumb.pop()
    //   breadcrumb.join('/')
    //   console.log('breadcrumb ' + breadcrumb)
    //   breadcrumb += '/'
    //   breadcrumb += str

    //   this.path = breadcrumb
    // } else {
	        this.path = this.path + "/" + str;

	// }
        this.getList();
      },
      insertTab(event) {
        let text = this.file,
          originalSelectionStart = event.target.selectionStart,
          textStart = text.slice(0, originalSelectionStart),
          textEnd = text.slice(originalSelectionStart);
        this.file = `${textStart}\t${textEnd}`
        event.target.value = this.file // required to make the cursor stay in place.
        event.target.selectionEnd = event.target.selectionStart = originalSelectionStart + 1
      },
      getList() {
      
        axios
          .post("http://localhost:3333/", {
            path: this.path
          })
          .then(response => {
            console.log(response.data);
            if (response.data.dir) {
              this.file = null;
              this.dir = null;
              return (this.dir = response.data.dir);
            }
            if (response.data.file) {
              //this.dir = null;
              this.file = null;
              var filename = this.path
              this.fileStatus = {
                open: true,
                file: this.path.split('/').pop()
              }
              if (this.fileStatus.file.match(/.png|.jpg/)){
                this.fileStatus.base64 = 'data:image/'+this.fileStatus.file.split('.')[1]+';base64,' + response.data.file
              }
  
              return (this.file = response.data.file);
            } else {
              //this.dir = null
              this.file = null
            }
          });
      },
      deleteFile() {
        axios.delete('http://localhost:3333/', {
            data: {
              file: this.path
            }
          })
          .then(this.getList())
      },
      saveFile() {
        axios.put('http://localhost:3333/', {
            data: {
              file: this.file,
              path: this.path
            }
          })
          .then(response => {
            if (response.status === 'Updated') {
              this.file = this.file
              this.path = this.path
            }
          })
      }
    }
  };
</script>

<style>
  body {
    background: #00241b;
    color: #e9c46a;
  }

  input,
  textarea,
  button {
    background: #264653;
    color: #bcffdb;
    border: none;
    outline: none;
    padding: 10px 10px;
  }
button {
    width: 17vw;
    text-align: left;
}
.container {
    margin: 0 auto;
    height: 80vh;
    text-align: center;
    max-width: 100vw;
    width: 80vw;
    border: 10px solid white;
    display: flex;
    justify-content: space-between;
}
  ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    list-style: none;
    padding: 20px;
    min-height: 40vh;
  }
  .title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: white;
    letter-spacing: 1px;
    text-align: center;
  }
  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }

  input.search,
  textarea {
    width: 20vw;
  }
  input.search {
    border-bottom: 1px solid gainsboro;
    font-size: 16px;
    color: white;
    border-right: 1px solid gainsboro;
  }

  button {
    border-radius: 0px;
  }

  ul.fileList {
    height: 96%;
    overflow-y: scroll;
    width: 20vw;
    background: #264653;
  }

  .fileList li {
    border-bottom: 1px solid #f5f5f5;
  }
textarea {
width: 59vw;
height: 78vh;
color: white;
font-size: 20px;
}
.hidden {
  display: none;
}
</style>