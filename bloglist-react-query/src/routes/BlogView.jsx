/* eslint-disable react/prop-types */

const BlogView = ({ blogView }) => {

    console.log(blogView)

    return(
        <div>
            <h2>{blogView.title}</h2>
            <a href="">{blogView.url}</a>
            <div>
                
            </div>
        </div>
    )
}


export default BlogView