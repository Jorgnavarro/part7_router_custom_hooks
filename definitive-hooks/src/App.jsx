import './App.css'

function App() {
  

  return (
    <div>
      <h2>Notes ✍🏽</h2>
      <form>
      <div className='row align-items-center'>
        <div className="col-9">
          <input type="text"
            className="form-control"
            placeholder="Write a new note here..."
          />
        </div>
        <div className="col-auto">
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
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
