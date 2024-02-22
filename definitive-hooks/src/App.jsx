import './App.css'
import { useResource } from './hooks/useResource'
import { useField } from './hooks/useField'

function App() {
  const [content, resetInput] = useField('text')
  const [notes, noteService] = useResource('http://localhost:3005/notes')

  const handleNoteSubmit = (e) => {
    e.preventDefault()
    noteService({ content: content.value})
    resetInput("")
  }

  return (
    <div>
      <h2>Notes ✍🏽</h2>
      <form onSubmit={handleNoteSubmit}>
      <div className='row align-items-center'>
        <div className="col-9">
          <input 
            name="content"
            type="text"
            className="form-control"
            placeholder="Write a new note here..."
            {...content}
          />
        </div>
        <div className="col-auto">
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
    {notes.map(n => {
      return <p key={n.id}>{n.content}</p>
    })}
      <h2>Persons 📒</h2>
      <form >
            {/*Input and label name*/}
            <div className='row g-3 align-items-center'>
                <div className='col-auto'>
                    <label htmlFor="inputName" className="col-form-label">Name:</label>
                </div>
                <div className="col-5">
                    <input
                        
                        id='inputName'
                        name='name'
                        type="text"
                        
                        className="form-control m-2" placeholder="Introduce your name..." />
                </div>
            </div>
            {/*Input and label number*/}
            <div className='row g-3 align-items-center'>
                <div className='col-auto'>
                    <label htmlFor="inputNumber" className="col-form-label">Number:</label>
                </div>
                <div className="col-5">
                    <input
                        id='inputNumber'
                        name='number'
                        type="text"
                        className="form-control m-2" placeholder="Introduce your number..." />
                </div>
            </div>
            <div className='col-6'>
                <button type="submit"
                    className="btn btn-primary px-5">
                    Add
                </button>
            </div>
        </form>
    </div>
  )
}

export default App
