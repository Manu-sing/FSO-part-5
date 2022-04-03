import { useState } from 'react'
import './form.css'



const Form = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState('')
  const [newStatus, setNewStatus] = useState('')


  const handleTitle = (e) => {
    setNewTitle(e.target.value)
  }

  const handleAuthor = (e) => {
    setNewAuthor(e.target.value)
  }

  const handleUrl = (e) => {
    setNewUrl(e.target.value)
  }

  const handleLikes = (e) => {
    setNewLikes(e.target.value)
  }

  const handleStatus = (e) => {
    setNewStatus(e.target.value)
  }

  const addBlog = (e) => {
    e.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
      status: newStatus
    })
    resetForm()
  }

  const resetForm = () => {
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setNewLikes('')
    setNewStatus('')
  }

  return (
    <div className='form-container'>
      <div className='form-title'>
        <h2>Here you can add a new article to the list:</h2>
      </div>
      <div className='form-body'>
        <form onSubmit={addBlog}>
          <div>
              TITLE <input id='title' title='title' value={newTitle} onChange={handleTitle}/>
          </div>
          <div>
              AUTHOR <input id='author' value={newAuthor} onChange={handleAuthor}/>
          </div>
          <div>
              LINK <input id='url' value={newUrl} onChange={handleUrl}/>
          </div>
          <div>
              LIKES <input id='likes' value={newLikes} onChange={handleLikes}/>
          </div>
          <div>
              STATUS <select value={newStatus} onChange={handleStatus}>
              <option value data-isdefault="true">-- Select --</option>
              <option value="Read">Read</option>
              <option value="Non Read">Non Read</option>
            </select> <button id='save-button' className="submit-btn" type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}


export default Form