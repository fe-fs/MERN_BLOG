//creating page
import React from 'react';
import axios from 'axios'; //http calls
import './App.css';

class App extends React.Component {

   state = {
    title: '',
    body: '',
    posts: []
   };

   componentDidMount = () => {
    this.getBlogPost(); 
   }

//getting the content back to client from the database
   getBlogPost = () => {
    axios.get('/api')
    //in case we cannot get the data
    .then((response) => {
      const data = response.data;
      this.setState({posts:data});
      console.log('Data Received!');
    })
    .catch(() =>{
      alert('Error retrieving data!');
    });
   }


   //function to update the state, when the user add content // the target is the event

   handleChange = ({target}) => {
    const {name, value} = target;
    
    //use this values and update my states with it
    //dinamically passes what happens in title and body
    this.setState({
      [name]: value
    });
   };

   //defining submit function
   submit = (event) => {
    event.preventDefault(); //stop te browser from refreshing

    //this contains the data I want to send to my server
    const payload = {
      title: this.state.title,
      body: this.state.body
    };

    //send the data to the server / saving the post
    //about the proxy in package.json client >> it will search all the unknown requests to the port 3000 and if there is not any, will change the proxy to go to the server at 8080
    axios({
      url: '/api/save', //where to send this data (needs to create a route POST for that)>>proxy to be 3000
      method: 'POST', //type of request that we are sending
      data: payload //type of data that we are sending
    })
    //check to see if data was send sucessfully with promisses
    .then(()=>{
      console.log('Data has been sent to the server');
      this.resetUserInputs();
      this.getBlogPost(); // will automatically show the new posts after submit 
    })
    .catch(()=>{
      console.log('Data has NOT been sent to the server');
    });

   };

   //after a post is submited, reset the boxes so it is clean for the next post >> call it after the last post was sucessfully saved
   resetUserInputs = () => {
    this.setState({
      title:'',
      body:''
    });
   }; 

   //function to display the posts at the front page
   displayBlogPost = (posts) => {
    if (!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index} className="blog-post_display">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
   }

  render() {
    //testing what happens to the form 
    //console.log('State: ', this.state);


    //JSX
    return(
      <div className="app">
      <title>MERN Blog by fefs</title>
      <h2>Welcome to my Blog</h2>
      <h4>Now autorefresh changes from github repo to heroku :D</h4>
      <form onSubmit={this.submit} /*attach on submit event funtion to make able to the user to send the post */>
        <div className="form-input">
          <input
            type="text"
            name="title"
            placeholder="Enter Title"
            value={this.state.title} //every time this gets updated it will update the state
            onChange={this.handleChange}
            />
        </div>
        <div className="form-input">
          <textarea 
            name="body" 
            placeholder='Write here' 
            cols="30" 
            rows="10" 
            value={this.state.body} 
            onChange={this.handleChange}
            >
            </textarea>
        </div>
      <div className='center'>
      <button>Submit</button>
      </div>
      
      </form>

      <div className='blog-post'>
        {this.displayBlogPost(this.state.posts)}
      </div>

      </div>

    );
  }
}

export default App;