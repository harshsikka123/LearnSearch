

Vue.component('submission',{

  props: ['refreshData', 'showForm', 'userState'],

  data:function() {
    return {
      title: '',
      link: '',
      topic: '',
      possibleTopics: [
        'Computer Science',
        'Business',
        'Design',
        'Physics',
        'Chemistry'
      ]
    }
  },

  methods: {
      submitPost: function() {
        console.log(this.topic)
        if(this.title === '' || this.url === '' || this.topic === ''){
          return alert('Please fill out all fields before submitting!');
        }
        addPost({
          title: this.title,
          url: this.link,
          topic: this.topic,
          upvotes: 1,
          user: this.userState,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        this.title = '';
        this.link = '';
        this.topic = '';
        this.refreshData();
        this.showForm.status = !this.showForm.status;
        
      },
      cancelPost: function() {
        this.title = '';
        this.link = '';
        this.topic = '';
        this.showForm.status = !this.showForm.status;
      }
  },
  

  template:`
  <div>
    <v-container fluid grid-list-md text-xs-center>
      
      <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-form offset-xs3>
        
          
          <v-flex xs12 sm6 offset-sm1>
            <v-text-field indigo label="Title" v-model="title"></v-text-field>
            <v-text-field indigo label="Link" v-model="link"></v-text-field>
            <v-flex xs4>
            <v-select
              v-bind:items="possibleTopics"
              v-model="topic"
              label="Pick a Topic"
              single-line
              bottom
            ></v-select>
          </v-flex>
          </v-flex>
        
        </v-form>

        <v-btn color="white--text light-blue accent-3" @click.native='submitPost'>
          submit
        </v-btn>
        <v-btn error  @click.native="cancelPost">
        <v-icon >cancel</v-icon>
       </v-btn>
      </v-card>
      </v-flex>
    </v-container>
  </div>
    `
  
});