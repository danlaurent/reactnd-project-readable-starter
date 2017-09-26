import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import './styles/App.css'
import * as ReadableAPI from './utils/ReadableAPI'


class App extends Component {

  componentDidMount() {
    ReadableAPI.getCategories().then(categories => (
      console.log(categories)
    ))
    ReadableAPI.getCategoryPosts('redux').then(catPosts => (
      console.log(catPosts)
    ))
    ReadableAPI.getPosts().then(posts => (
      console.log(posts)
    ))
  }
  render() {
    const { Header, Content, Footer } = Layout;
    return (
      <div className="App">
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Readable ©2017 by @danlaurent
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
