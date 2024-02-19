import { ContextGlobal } from "../context/Context"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { validatorAnecdote } from "../utils/validations"
import anecdoteService from '../services/anecdote'
import { useField } from "../hooks/index"
import Swal from 'sweetalert2'
const CreateNew = () => {
const [ anecdotes, setAnecdotes ] = useContext(ContextGlobal)
const navigate = useNavigate();
/*Inputs*/
const title = useField('text')
const author = useField('text')
const url = useField('text')


const addAnecdote = (e) => {
  e.preventDefault()
  
  const objectToEvaluated = {
    title: title.value,
    author: author.value,
    url: url.value,
    votes: 0
  }

  if(validatorAnecdote(objectToEvaluated)){
    Swal.fire({
      text: `The anecdote: ${title.value} was added ✅`,
      icon: "success"
    })

    anecdoteService.createAnAnecdote(objectToEvaluated)
      .then(response => setAnecdotes([
        ...anecdotes,
        response
      ]))

    navigate("/")
  }else{
    Swal.fire({
      icon:"error",
      text: "One of the fields is less than 5 characters, please try again."
    })
  }
  e.target.title.value = ''
  e.target.url.value = ''
  e.target.author.value = ''
}

    return(
        <form onSubmit={addAnecdote} id='addAnecdoteForm' className="mb-3">
            <h2>New anecdote ✍🏽</h2>
          <div className="mb-3 row align-items-center infoBlog">
            <div className="col-1">
              <label htmlFor="title" className="form-label">Title:</label>
            </div>
            <div className="col-7">
              <input
                className="form-control"
                id="title"
                name="title"
                {...title}
              />
            </div>
          </div>
          <div className="mb-3 row align-items-center infoBlog">
            <div className="col-1">
              <label htmlFor="author" className="form-label">Author:</label>
            </div>
            <div className="col-5">
              <input
                className="form-control"
                id="author"
                name="author"
                {...author}
              />
            </div>
          </div>
          <div className="mb-2 row align-items-center infoBlog">
            <div className="col-1">
              <label htmlFor="url" className="form-label">Url:</label>
            </div>
            <div className="col-7">
              <input
                className="form-control"
                id="url"
                name="url"
                {...url}
              />
            </div>
          </div>
          <div className="align-self-center">
            <button className="btn btn-outline-success" type='submit' id='btnForm'>Create</button>
          </div>
        </form>
    )
}

export default CreateNew