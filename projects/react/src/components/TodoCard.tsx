import { connect } from 'react-redux'
import { Todo } from '../types/Todo'
import { Icon } from '@ricons/utils'
import { Trash, Pen, CheckCircle, CircleRegular } from '@ricons/fa'

const TodoCard = (payload: { index: number; item: Todo; dispatch: any }) => {
  const { index, item, dispatch } = payload
  return (
    <li
      key={index}
      className="todo-card"
      style={{
        listStyle: 'none',
        width: '100%',
        padding: '1rem',
        backgroundColor: '#fff',
        color: '#000',
        boxShadow: `0 0 0.5rem 0.5rem #eee`,
        borderRadius: '0.5rem',
        display: 'flex',
        gap: '1rem',
        // flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div className="todo-check-area" style={{}}>
        <a
          onClick={(e) => {
            dispatch({
              type: 'updateTodo',
              payload: {
                uuid: item.uuid,
                completedAt: !!item.completedAt ? '' : new Date().toISOString(),
              },
            })
          }}
          style={{
            cursor: 'pointer',
            color: !!item.completedAt ? '#0066cc' : '#ccc',
            fontSize: '2rem',
          }}
        >
          {!!item.completedAt ? (
            <Icon>
              <CheckCircle></CheckCircle>
            </Icon>
          ) : (
            <Icon>
              <CircleRegular></CircleRegular>
            </Icon>
          )}
        </a>
      </div>
      <div
        className="todo-main-area"
        style={{
          flex: 1,
        }}
      >
        <div
          className="todo-title"
          style={{
            fontWeight: 'bold',
            fontSize: '1.25rem',
            textDecoration: !!item.completedAt ? 'line-through' : 'none',
            color: !!item.completedAt ? '#aaa' : '#000',
          }}
        >
          {item.title || 'No title'}
          {/* {!!item.completedAt && (
            <>
              {' '}
              <Icon color="green">
                <Check></Check>
              </Icon>
            </>
          )} */}
        </div>
        <div
          className="todo-content"
          style={{
            textDecoration: !!item.completedAt ? 'line-through' : 'none',
            margin: '1rem 0',
            color: !!item.completedAt ? '#aaa' : '#000',
          }}
        >
          {item.content}
        </div>
        <div
          className="todo-time"
          style={{
            fontSize: '0.8rem',
            fontStyle: 'italic',
            color: '#aaa',
          }}
        >
          <em className="todo-time-created">
            Created at: {new Date(item.createdAt).toLocaleString()}
          </em>
          {item.completedAt && (
            <>
              {' | '}
              <em className="todo-time-completed">
                Completed at: {new Date(item.completedAt).toLocaleString()}
              </em>
            </>
          )}
        </div>
        <div
          className="todo-actions"
          style={{
            display: 'flex',
            width: '100%',
            gap: '1em',
            marginTop: '1rem',
          }}
        >
          <a>
            <Icon>
              <Pen></Pen>
            </Icon>
          </a>
          <a
            onClick={(e) => {
              dispatch({
                type: 'removeTodo',
                payload: item.uuid,
              })
            }}
            style={{
              cursor: 'pointer',
            }}
          >
            <Icon color="darkred">
              <Trash />
            </Icon>
          </a>
        </div>
      </div>
    </li>
  )
}

export default connect()(TodoCard)
