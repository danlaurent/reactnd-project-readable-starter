import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import './styles/App.css'
import { fetchCategories, fetchPosts, fetchComments } from './actions'
import { connect } from 'react-redux'
import Home from './components/Home'
import PostDetails from './components/PostDetails'
import NewPost from './components/NewPost'
import { Route, withRouter } from 'react-router-dom'


class App extends Component {

  componentDidMount() {
    this.props.loadCategories()
    this.props.loadPosts()
  }

  render() {
    const { Header, Content, Footer } = Layout;
    const { posts } = this.props;
    return (
      <div className="App">
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: '64px' }}
            >
            {posts.categories.map((category, index) => (
              <Menu.Item key={index} style={{textTransform: 'capitalize'}}>{category.name}</Menu.Item>
            ))}
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Route exact path="/" render={() => (
              <Home />
            )}
            />
            <Route path="/post/:id" render={({match}) => (
              <PostDetails match={match} />
            )}
            />
            <Route path="/new_post" render={() => (
              <NewPost />
            )}
            />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Readable ©2017 by @danlaurent
          </Footer>
        </Layout>
      </div>
    );
  }
}

function mapStateToProps({posts}) {
  return {posts}
}

function mapDispatchToProps(dispatch) {
  return {
    loadCategories: data => dispatch(fetchCategories(data)),
    loadPosts: data => dispatch(fetchPosts(data)),
    loadComments: data => dispatch(fetchComments(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
