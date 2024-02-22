import './App.css'
import { useResource } from './hooks/useResource'
import { useField } from './hooks/useField'

function App() {
  const [content, resetInput] = useField('text')
  const [name, resetNameInput] = useField('text')
  const [number, resetNumberInput] = useField('text')
  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personsService] = useResource('http://localhost:3005/persons')



  const handleNoteSubmit = (e) => {
    e.preventDefault()
    noteService({ content: content.value})
    resetInput("")
  }

  const handlePersonsSubmit = (e) => {
    e.preventDefault()
    personsService({
      name: name.value,
      number: number.value
    })
    resetNameInput("")
    resetNumberInput("")
  }

  return (
    <div className='containerForms'>
      <h2>Notes ✍🏽</h2>
      <form id='formNotes' onSubmit={handleNoteSubmit}>
      <div className='row align-items-center justify-content-center'>
        <div className="col-4">
          <input
            id="content"
            name="content"
            type="text"
            className="form-control"
            placeholder="Write a new note here..."
            {...content}
          />
        </div>
        <div className="col-auto">
          <button type="submit">Create</button>
        </div>
      </div>
    </form>
     <div className='containerNotes'>
     {notes.map(n => {
      return <h4 key={n.id}>{n.content}</h4>
     })}
     </div>
     <hr className='divisionLine' />
      <h2>Persons 📒</h2>
      <form id="formPersons" onSubmit={handlePersonsSubmit} >
            {/*Input and label name*/}
            <div className='row g-3 align-items-center justify-content-center'>
                <div className='col-auto'>
                    <label htmlFor="inputName" className="col-form-label">Name:</label>
                </div>
                <div className="col-5">
                    <input
                        {...name}
                        id='inputName'
                        name='name'
                        type="text"
                        
                        className="form-control m-2" placeholder="Introduce your name..." />
                </div>
            </div>
            {/*Input and label number*/}
            <div className='row g-3 align-items-center justify-content-center'>
                <div className='col-auto'>
                    <label htmlFor="inputNumber" className="col-form-label">Number:</label>
                </div>
                <div className="col-5">
                    <input
                        {...number}
                        id='inputNumber'
                        name='number'
                        type="text"
                        className="form-control m-2" placeholder="Introduce your number..." />
                </div>
            </div>
            <div className='justify-content-center'>
                <button type="submit"
                    className="btn btn-primary px-5">
                    Create
                </button>
            </div>
        </form>
        <div className='containerPersons'>
          {persons.map(p => {
            return <h4 key={p.id}>{p.name} - {p.number}</h4>
          })}
        </div>
    </div>
  )
}

export default App
