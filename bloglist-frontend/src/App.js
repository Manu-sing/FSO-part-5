import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorMessage from './components/ErrorMessage'
import Header from './components/Header'
import RenderAll from './components/RenderAll'
import './App.css'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Form from './components/Form'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState(null)
  const [showAll, setShowAll] = useState(true)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {

    if(blogObject.title === '' || blogObject.author === '' || blogObject.url === '') {
      alert('The fields "title", "author" and "url" must be provided.')
    } else {
      blogService
        .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setMessage('The article was succesfully added to the list.')
          setTimeout(() => {
            setMessage(null)
          }, 4000)
        })
        .catch(() => {
          console.log('Could not save the new article')
        })
    }
  }

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogsToShow = showAll
    ? blogs
    : blogs.filter(blog => blog.status === 'Non Read')

  const loginForm = () => (
    <div>
      <LoginForm
        handleLogin={handleLogin}
        password={password}
        handlePassword={handlePassword}
        username={username}
        handleUsername={handleUsername}
      />
    </div>
  )

  const blogForm = () => (
    <Togglable buttonLabel='Add New blog'>
      <Form createBlog={addBlog}/>
    </Togglable>
  )

  const handleLogout = async () => {
    await window.localStorage.clear()
    setUser(null)
    setTimeout(() => {
      alert(`'${user.name}' has successfully logged out.`)
    }, 100)
  }

  const toggleStatus = (id) => {
    const blogToToggle = blogs.find(n => n.id === id)
    const changedStatus = blogToToggle.status === 'Read' ? 'Non Read' : 'Read'
    const toggledBlog = { ...blogToToggle, status: changedStatus }

    blogService
      .update(id,toggledBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
        setMessage('The status of the article was succesfully updated.')
        setTimeout(() => {
          setMessage(null)
        }, 4000)
      })
  }

  const addALike = (id) => {
    console.log(`We need to add a like to the blog with id ${id}`)
    const blogToAddaLikeTo = blogs.find(n => n.id === id)
    const editedBlog = { ...blogToAddaLikeTo, likes: blogToAddaLikeTo.likes + 1 }

    blogService
      .update(id, editedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
  }

  const handleDelete = (id) => {
    const blogToDelete = blogs.find(n => n.id === id)

    if(window.confirm(`Are you sure you want to delete the article "${blogToDelete.title}" from the list?`)) {
      blogService
        .removeBlog(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id))
          setMessage(`The article "${blogToDelete.title}" was succesfully deleted.`)
          setTimeout(() => {
            setMessage(null)
          }, 4000)
        })
        .catch(() => {
          console.log('Deletion failed')
        })
    }
  }


  return (
    <div>
      <div className='header-container'>
        <Header
          text='MY FAVORITE BLOGS'
          user={user}
          handleLogout={handleLogout}
        />
      </div>
      <div>
        {user === null ?
          <div>
            {loginForm()}
            <ErrorMessage errorMessage={errorMessage}/>
          </div> :
          <div>
            {blogForm()}
            <hr/>
            <div className='filter'>
              {!blogs.length ?
                null :
                <button className="filter-btn" onClick={() => setShowAll(!showAll)}>
                Show {showAll ? 'only "Non Read"' : 'All' }
                </button>
              }
            </div>
            <Notification message={message}/>
            <RenderAll
              blogs={blogsToShow}
              toggleStatus={toggleStatus}
              addALike={addALike}
              handleDelete={handleDelete}
            />
          </div>
        }
      </div>
    </div>
  )
}

export default App

