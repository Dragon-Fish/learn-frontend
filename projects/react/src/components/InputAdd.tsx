import { Plus, Trash } from '@ricons/fa'
import { Icon } from '@ricons/utils'
import { useState } from 'react'
import { connect } from 'react-redux'

const InputAdd = ({ dispatch }: any) => {
  let [editMode, setEditMode] = useState(false)
  let [title, setTitle] = useState('')
  let [content, setContent] = useState('')
  const [error, setError] = useState('')

  return (
    <form
      id="input-add-container"
      onSubmit={(e) => {
        e.preventDefault()
        if (!title.trim()) {
          setError('Please at least input a title')
          return
        }
        dispatch({
          type: 'addTodo',
          payload: {
            title,
            content,
          },
        })
        setTitle('')
        setContent('')
      }}
      onChange={(e) => {
        setError('')
      }}
      style={{
        backgroundColor: '#fff',
        boxShadow: '0 0 0.5rem 0.5rem #eee',
        padding: '1rem',
      }}
    >
      <label htmlFor="title">
        Title<sup>*</sup>
        {error && (
          <>
            {' '}
            <em
              style={{
                color: 'red',
              }}
            >
              {error}
            </em>
          </>
        )}
      </label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value as string)}
        style={{
          width: '100%',
          display: 'block',
        }}
      />
      <label htmlFor="content">Content</label>
      <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          width: '100%',
          minHeight: '6em',
          display: 'block',
          resize: 'vertical',
        }}
      />
      <div
        className="btn-area"
        style={{
          marginTop: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          textAlign: 'center',
        }}
      >
        {/* <div className="clear-btn">
          <a
            style={{
              color: title.trim() || content.trim() ? 'darkred' : '#aaa',
              cursor: 'pointer',
            }}
            onClick={(e) => {
              setTitle('')
              setContent('')
            }}
          >
            <Icon>
              <Trash></Trash>
            </Icon>{' '}
            clear input
          </a>
        </div> */}
        <div
          className="add-btn"
          style={{
            textAlign: 'center',
          }}
        >
          <button
            type="submit"
            style={{
              padding: '1rem',
              lineHeight: '1',
              fontSize: '1.5rem',
              borderRadius: '50%',
            }}
          >
            <Icon>
              <Plus
                style={{
                  width: '1em',
                  height: '1em',
                }}
              ></Plus>
            </Icon>
          </button>
        </div>
      </div>
    </form>
  )
}

export default connect()(InputAdd)
