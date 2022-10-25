<template>
  <div class="">
    <h1>{{ msg }}</h1>
    <p>Insert Email to check posts</p> 
    <input type="email" placeholder="Insert email here" v-model="email" required>
    <div>
      <button @click="getpostsByUser">{{searchButton}}</button>
    </div>

    <div v-if="this.actualUserPosts.length > 0" class="container">
      <h3 class="">{{this.actualUser.name}}'s List of Posts</h3>
       <!-- put this as a Table Component -->
      <table class="">
          <thead>
              <tr>
                  <th>Id</th>
                  <th>UserId</th>
                  <th>Title</th>
                  <th>Body</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="post in this.actualUserPosts" :key="post.id">
                  <td>{{post.id}}</td>
                  <td>{{post.userId}}</td>
                  <td>{{post.title}}</td>
                  <td>{{post.body}}</td>
              </tr>
          </tbody>
      </table>
    </div>

    <div v-if="this.emailError">
      <p>{{this.emailError}}</p>
    </div>
    <div v-if="this.apiError">
      <p>{{this.apiError}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  props: {
    msg: String
  },
  data(){
    return{
      email:'',
      searchButton:"Search",

      actualUser:null,
      actualUserPosts:[],
      
      apiError:"",
      emailError:""
    }
  },
  methods: {
    async getpostsByUser(){
      this.searchButton = "Searching...";
      this.actualUser = null;
      this.actualUserPosts = [];
      this.apiError = "";

      if(this.validateEmail()){
        try {
          const baseApiURL = "https://jsonplaceholder.typicode.com";

          //Get User for given email (interest in id)
          const response = await fetch(`${baseApiURL}/users?email=${this.email}`)
          const result = await response.json();
          
          if(result && result.length > 0){

            const user = result[0];
            this.actualUser = user;
            
            //Get Posts with user id
            const userPostsResponse = await fetch(`${baseApiURL}/posts?userId=${user.id}`)
            const userPostsResult = await userPostsResponse.json();

            this.actualUserPosts = userPostsResult;
            this.apiError = "";
          }
          else if(result.length ==0){
            this.apiError = "No posts for your email."
          }

          this.searchButton = "Search";
        } 
        catch (error) {
          this.apiError = 'Error! Could not reach the API. ' + error;
          this.searchButton = "Search";
        }
      }
    },
    validateEmail(){
      if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        this.emailError = "";
        return true;
      } else {
          this.emailError = "Please, insert a valid email.";
          this.searchButton = "Search";  
          return false;
      }
    }
  },
  mounted() {
    if (localStorage.email) {
      this.email = localStorage.email;
    }
  },
  watch:{
    email(newEmail){
      localStorage.email = newEmail;
    }
  }
}
</script>

<!-- Style  -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
