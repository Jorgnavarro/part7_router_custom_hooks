export const validatorAnecdote = ({title, author, url}) =>{
    return title.length >= 5 && author.length >= 5 && url.length >= 5
}

