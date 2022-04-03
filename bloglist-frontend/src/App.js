import React, { useState, useEffect, useRef } from 'react'
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
import RegistrationForm from './components/RegistrationForm'
import registrationService from './services/registration'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameForRegistration, setUsernameForRegistration] = useState('')
  const [nameForRegistration, setNameForRegistration] = useState('')
  const [passwordForRegistration, setPasswordForRegistration] = useState('')
  const [message, setMessage] = useState('')
  const [loginErrorMessage, setLoginErrorMessage] = useState('')
  const [registrationErrorMessage, setRegistrationErrorMessage] = useState('')
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
      alert('THE FIELDS "TITLE", "AUTHOR" AND "URL"MUST BE PROVIDED.')
    } else {
      blogFormRef.current.toggleVisibility()
      blogService
        .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setMessage('THE ARTICLE WAS SUCCESFULLY ADDED TO THE LIST.')
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
      resetLoginForm()
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      resetLoginForm()
      setLoginErrorMessage('USERNAME AND PASSWORD MUST BE PROVIDED AND MUST BE AT LEAST 3 CHARACTERS LONG. USERNAME MUST BE UNIQUE.')
      setTimeout(() => {
        setLoginErrorMessage(null)
      }, 5000)
    }

  }

  const resetLoginForm = () => {
    setUsername('')
    setPassword('')
  }

  const blogsToShow = showAll
    ? blogs
    : blogs.filter(blog => blog.status === 'Non Read')



  const loginForm = () => (
    <Togglable buttonLabel='Login' ref={blogFormRef}>
      <LoginForm
        handleLogin={handleLogin}
        password={password}
        handlePassword={handlePassword}
        username={username}
        handleUsername={handleUsername}
      />
    </Togglable>
  )

  const handleUsernameForRegistration = (e) => {
    setUsernameForRegistration(e.target.value)
  }

  const handleNameForRegistration = (e) => {
    setNameForRegistration(e.target.value)
  }

  const handlePasswordForRegistration = (e) => {
    setPasswordForRegistration(e.target.value)
  }

  const handleRegistration = async (e) => {
    e.preventDefault()
    const newUser = {
      username: usernameForRegistration,
      name: nameForRegistration,
      password: passwordForRegistration
    }

    registrationService
      .registration(newUser)
      .then(() => {
        alert('YOU HAVE SUCCESSFULLY SIGNED-IN. CLICK LOGIN, ENTER YOUR CREDENTIALS AND ENJOY USING THE APP!')
        setTimeout(() => {
          setMessage(null)
        }, 4000)
        resetRegistrationForm()
        blogFormRef.current.toggleVisibility()
      })
      .catch(() => {
        resetRegistrationForm()
        setRegistrationErrorMessage('USERNAME AND PASSWORD MUST BE PROVIDED AND BE AT LEAST 3 CHARACTERS LONG.')
        setTimeout(() => {
          setRegistrationErrorMessage(null)
        }, 4000)
      })
  }

  const resetRegistrationForm = () => {
    setUsernameForRegistration('')
    setNameForRegistration('')
    setPasswordForRegistration('')
  }

  const registrationForm = () => (
    <Togglable buttonLabel='Sign-in' ref={blogFormRef}>
      <RegistrationForm
        handleRegistration={handleRegistration}
        usernameForRegistration={usernameForRegistration}
        handleUsernameForRegistration={handleUsernameForRegistration}
        nameForRegistration={nameForRegistration}
        handleNameForRegistration={handleNameForRegistration}
        passwordForRegistration={passwordForRegistration}
        handlePasswordForRegistration={handlePasswordForRegistration}
      />
    </Togglable>
  )

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='Add New Blog' ref={blogFormRef}>
      <Form createBlog={addBlog}/>
    </Togglable>
  )


  const handleLogout = async () => {
    await window.localStorage.clear()
    setUser(null)
    setTimeout(() => {
      alert('YOU HAVE SUCCESSFULLY LOGOUT.')
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
        setMessage('THE STATUS OF THE ARTICLE WAS SUCCESFULLY UPDATED.')
        setTimeout(() => {
          setMessage(null)
        }, 4000)
      })
  }

  const addALike = (id) => {
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
          setMessage(`The article "${blogToDelete.title}" was succesfully deleted from the list.`)
          setTimeout(() => {
            setMessage(null)
          }, 4000)
        })
        .catch(() => {
          alert('YOU CAN ONLY DELETE AN ENTRY IF YOU CREATED IT.')
        })
    }
  }


  return (
    <div>
      <div className='header-container'>
        <Header
          text='BLOG APP'
          user={user}
          handleLogout={handleLogout}
        />
      </div>
      <div>
        {user === null ?
          <div>
            {loginForm()}
            <ErrorMessage errorMessage={loginErrorMessage}/>
            {registrationForm()}
            <ErrorMessage errorMessage={registrationErrorMessage}/>
          </div> :
          <div>
            {blogForm()}
            <hr/>
            <div className='body-title'>
              <div>
                <h1>LIST OF YOUR FAVORITE ARTICLES</h1>
              </div>
              <div>
                <p><strong>(from most to least liked)</strong></p>
              </div>
            </div>
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

