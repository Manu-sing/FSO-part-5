import { useState } from 'react'
import './grid.css'
import { FaRegThumbsUp } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa'




const RenderSingle = ({ title, author, likes, status, url, toggleStatus, addALike, handleDelete }) => {
  const [visible, setVisible] = useState(false)

  const label = visible === false ? 'Show Details' : 'Hide Details'

  const handleDetails = () => {
    setVisible(!visible)
  }
  return (
    <div className='grid-item'>
      <div className='item-info'>
        <h2 className='title'>{title}</h2>
        <hr/>
        <p className='article-info'><strong>Author: </strong>{author} <button  onClick={handleDetails}>{label}</button></p>
        {visible ?
          <div>
            <p label='link' className='article-info'><strong>Link:</strong> <a href={url}>{url}</a></p>
            <p id='like' className='article-info'><strong>Likes:</strong> {likes} <button id='like-button' className="status-btn" title="ciao" onClick={addALike}>< FaRegThumbsUp /></button></p>
            <p className='article-info'><strong>Status:</strong> {status} <button className="status-btn" onClick={toggleStatus}>{status === 'Read' ? 'Mark "Non Read"' : 'Mark "Read"'}</button></p>
          </div> :
          ''
        }
      </div>
      <button id='delete-button' className="delete-btn" onClick={handleDelete}>< FaTrash /></button>
    </div>
  )
}

export default RenderSingle