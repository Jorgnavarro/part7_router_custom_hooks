import { ContextGlobal } from "../context/Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { validatorAnecdote } from "../utils/validations"
import anecdoteService from '../services/anecdote'
import Swal from 'sweetalert2'
const CreateNew = () => {
const [ anecdotes, setAnecdotes ] = useContext(ContextGlobal)
const navigate = useNavigate();

const addAnecdote = (e) => {
  e.preventDefault()
  const title = e.target.title.value
  const author = e.target.author.value
  const url = e.target.url.value

  const objectToEvaluated = {
    title,
    author,
    url,
    votes: 0
  }

  if(validatorAnecdote(objectToEvaluated)){
    Swal.fire({
      text: `The anecdote: ${title} was added ✅`,
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
                type="text"
                className="form-control"
                id="title"
                name="title"
              />
            </div>
          </div>
          <div className="mb-3 row align-items-center infoBlog">
            <div className="col-1">
              <label htmlFor="author" className="form-label">Author:</label>
            </div>
            <div className="col-5">
              <input
                type='text'
                className="form-control"
                id="author"
                name="author"
              />
            </div>
          </div>
          <div className="mb-2 row align-items-center infoBlog">
            <div className="col-1">
              <label htmlFor="url" className="form-label">Url:</label>
            </div>
            <div className="col-7">
              <input
                type='text'
                className="form-control"
                id="url"
                name="url"
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