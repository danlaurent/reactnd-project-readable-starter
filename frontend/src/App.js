import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import './styles/App.css'
import * as ReadableAPI from './utils/ReadableAPI'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      categoriesList: [],
      posts: []
    }
  }

  componentDidMount() {
    ReadableAPI.getCategories().then(categories => (
      this.setState({
        categoriesList: categories
      })
    ))
    ReadableAPI.getPosts().then(posts => (
      this.setState({ posts })
    ))
    ReadableAPI.getPostComments({id: "8xf0y6ziyjabvozdd253nd"}).then(comments => (
      console.log(comments)
    ))
  }

  convertTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const day = date.getDate()
    const month = date.getMonth()
    const formattedMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    const year = date.getFullYear()
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    return `${year}/${formattedMonths[month]}/${day} - ${hours}:${minutes}`
  }

  commentsCount = (post) => {
    ReadableAPI.getPostComments(post).then(comments => (
      comments.length
    ))
  }

  render() {
    const { Header, Content, Footer } = Layout;
    const { categoriesList, posts } = this.state;
    console.log(posts)
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
            {categoriesList.map((category, index) => (
              <Menu.Item key={index} style={{textTransform: 'capitalize'}}>{category.name}</Menu.Item>
            ))}
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            {posts.map(post => (
              <div key={post.id} style={{ background: '#fff', padding: 24, minHeight: 80, marginTop: 24, display: 'flex' }}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <Icon type="up" style={{ fontSize: 24, color: '#bbb' }}/>
                  <span>{post.voteScore}</span>
                  <Icon type="down" style={{ fontSize: 24, color: '#bbb' }}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', margin: '0 2em'}}>
                  <h2>{post.title}</h2>
                  <small style={{textAlign: 'left'}}>Submitted {this.convertTimestamp(post.timestamp)} by {post.author}</small>
                  <span style={{textAlign: 'left'}}>{this.commentsCount(post)} comments</span>
                </div>
              </div>
            ))}

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
