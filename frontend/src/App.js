import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import './styles/App.css'
import { connect } from 'react-redux'
import Home from './components/Home'
import PostDetails from './components/PostDetails'
import NewPost from './components/NewPost'
import { Route, withRouter } from 'react-router-dom'
import {fetchCategories, fetchPosts} from './actions'


class App extends Component {
  componentDidMount() {
    const { loadCategories, loadPosts } = this.props
    loadCategories()
    loadPosts()
  }
  render() {
    const { Header, Content, Footer } = Layout;
    const { forum } = this.props;
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
            {forum && forum.categories.map((category, index) => (
              <Menu.Item key={index} style={{textTransform: 'capitalize'}}>{category.name}</Menu.Item>
            ))}
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Route exact path="/" render={() => (
              <Home />
            )}
            />
            <Route exact path="/post/:id" render={({match, history}) => (
              <PostDetails match={match} history={history} />
            )}
            />
            <Route path="/new_post" render={() => (
              <NewPost />
            )}
            />
            <Route path="/post/:id/edit_post" render={({match, history}) => (
              <NewPost match={match} history={history} />
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

function mapStateToProps({forum}) {
  return {forum}
}

function mapDispatchToProps(dispatch) {
  return {
    loadCategories: data => dispatch(fetchCategories(data)),
    loadPosts: data => dispatch(fetchPosts(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
