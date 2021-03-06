import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBlogs } from '../actions/index';
import { Link } from 'react-router';
import LoginButton from './login_button';

class Home extends Component {
    constructor(props) {
        super(props);

        this.getBlogList = this.getBlogList.bind(this);
    }

    componentWillMount() {
        this.props.fetchBlogs();
    }

    getBlogList() {
        var blogs = [];

        if(this.props.blogs){
            var blogsNames = [];
            var blogsArr = Object.keys(this.props.blogs).map(key => this.props.blogs[key]);
            for(var i=0; i<blogsArr.length; i++){
                blogsNames.push(blogsArr[i].name);
            }
            return blogsNames.map((blog) => {
                if (blog != null && blog != undefined)
                {
                    return (
                        <div className="blogHolder" key={blog}>
                            <Link to={blog + "/posts"} className="btn btn-primary blogButton">
                                <strong>{blog}</strong>
                            </Link>
                        </div>
                    );
                }
                else {
                    return;
                }
            });
        }
        else {
            return (
                <div>
                    <h3>No blogs yet... </h3>
                </div>
            )
        }
    }

    newBlogButton() {
        if(firebase.auth().currentUser && firebase.auth().currentUser.uid == "KQZ3vqQwgBdCmLF2uelBumotcWG2"){
            return (
                <div className="text-xs-right buttonHolder">
                    <Link to={"new"} className="btn btn-primary">
                        Add a Blog
                    </Link>
                </div>
            );
        }
        else {
            return;
        }
    }

    render() {
        return (
            <div>
                <LoginButton />
                {this.newBlogButton()}
                <div className="blogs">         
                    {this.getBlogList()}
                </div>
            </div>      
        )
    }
}

function mapStateToProps(state) {
    return { blogs: state.posts.blogs };
};


export default connect(mapStateToProps, { fetchBlogs })(Home);