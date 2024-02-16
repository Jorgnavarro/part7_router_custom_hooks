/* eslint-disable react/prop-types */
const AnecdoteDetail = ({anecdote}) => {

    return(
        <div className="containerDetail">
            <h2>{anecdote.title}</h2>
            <h4>Has {anecdote.votes} votes</h4>
            <h4>For more info see: {anecdote.url}</h4>
        </div>
    )
}

export default AnecdoteDetail