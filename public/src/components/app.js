

Vue.component('app',{
  

  // storing data from db
  data: function() {
    

    return {
      postData: [],
      showForm: {
        status: false,
      },
      showUserMessage: {
        status: true
      },
      userState: 'not logged in',
    };

  },

  methods: {
    refreshData: function(){
      //wipe current data
      this.postData = [];
      postData = this.postData;
      getTopPosts((dbResult)=>{
        dbResult.forEach(function(doc) {
          postData.push(doc.data());
        });
        // sort the feeds by maximum upvotes
        console.log('request');
        postData.sort(function(a, b){return b.upvotes - a.upvotes})
        
      });
    },

    renderAllTimeFeed: function(){
      //wipe current data
      this.postData = [];
      postData = this.postData;
      getPosts((dbResult)=>{
        dbResult.forEach(function(doc) {
          postData.push(doc.data());
        });
        // sort the feeds by maximum upvotes
        console.log('request');
        postData.sort(function(a, b){return b.upvotes - a.upvotes})
        
      });
    },

    renderTopicFeed: function(topic){
      // this.postData = [];
      // postData = this.postData;
      // dbRef = db.collection("Posts").where("topic", "==", topic).get().then(function(querySnapshot) {
      //   querySnapshot.forEach(function(doc) {
      //     postData.push(doc.data());
      //   })
      // });

      console.log(this.postData);
      this.postData = [];
      postData = this.postData;
      
      getPosts((dbResult)=>{
        dbResult.forEach(function(doc) {
          postData.push(doc.data());
        });
        // sort the feeds by maximum upvotes
        postData.sort(function(a, b){return b.upvotes - a.upvotes})
        console.log('request');
        for( var i = 0; i < postData.length; i++) {
          if (postData[i].topic !== topic){
            postData.splice(i,1)
            i = i - 1;
          }
        }

      });
      
    }, 

    renderNewFeed: function(topic){
      this.postData = [];
      postData = this.postData;
      getPosts((dbResult)=>{
        dbResult.forEach(function(doc) {
          postData.push(doc.data());
        });
        // sort the feeds by maximum upvotes
        postData.sort(function(a, b){return b.timestamp - a.timestamp})
        
      });

    }
  },


  // using the getPosts function in main.js
  created: function(){
    // this.userState = firebase.auth().currentUser.displayName;
    postData = this.postData;
    getTopPosts((dbResult)=>{
      dbResult.forEach(function(doc) {
        postData.push(doc.data());
      });
      this.userState = firebase.auth().currentUser.displayName;
      // sort the feeds by maximum upvotes
      postData.sort(function(a, b){return b.upvotes - a.upvotes})
    });
  },

  

  template:`
  <div>
    <bar :show-form='showForm' :user-state='userState' :refresh-data='refreshData.bind(this)' :render-new-feed='renderNewFeed.bind(this)' :render-topic-feed='renderTopicFeed.bind(this)' :render-all-time-feed='renderAllTimeFeed.bind(this)'></bar>
    <br>
    <announcement :show-user-message='showUserMessage'></announcement>
    <br>
    
    <submission v-show='showForm.status' v-bind:post-data='postData' v-bind:show-form='showForm' v-bind:refresh-data='refreshData.bind(this)' :user-state='userState'></submission>
      <posts v-bind:post-data='postData' v-show='!showForm.status'></posts>
  </div>`
  
// for submission, turn the posts v-show to false
  
});

var vueApp = new Vue({
  el: '#app',
  data: {
    userState: firebase.auth().currentUser,
    hello: 'goodbye'
  }

});






