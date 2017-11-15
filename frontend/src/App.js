import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import './styles/App.css'
import { connect } from 'react-redux'
import Home from './components/Home'
import PostDetails from './components/PostDetails'
import NewPost from './components/NewPost'
import Category from './components/Category'
import { Route, withRouter, Link, Switch } from 'react-router-dom'
import {fetchCategories, fetchPosts} from './actions'


class App extends Component {
  componentDidMount() {
    const { loadCategories, loadPosts } = this.props
    loadCategories()
    loadPosts()
  }

  render() {
    const { Header, Content, Footer } = Layout;
    const { categories } = this.props
    return (
      <div className="App">
        <Layout className="layout">
          <Header>
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: '64px' }}
            >
            {categories.map(category => (
              <Menu.Item key={category.name}>
                <Link to={`/${category.name}`} style={{textTransform: 'capitalize'}}>{category.name}</Link>
              </Menu.Item>
            ))}
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px', minHeight: '82vh' }}>
            <Route exact path="/" render={() => (
              <Home />
            )}
            />
            <Switch>
              <Route exact path="/new_post" render={({history}) => (
                <NewPost history={history} />
              )}
              />
              <Route exact path="/:category" render={({match, history}) => (
                <Category match={match} history={history} />
              )}
              />
              <Route exact path="/:category/:post_id" render={({match, history}) => (
                <PostDetails match={match} history={history} />
              )}
              />
              <Route path="/:category/:id/edit_post" render={({match, history}) => (
                <NewPost match={match} history={history} />
              )}
              />
            </Switch>
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
  return {
    categories: forum.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadCategories: data => dispatch(fetchCategories(data)),
    loadPosts: data => dispatch(fetchPosts(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
