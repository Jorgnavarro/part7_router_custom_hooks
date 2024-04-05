import PropTypes from 'prop-types'


const Notification = ({ message, className }) => {

  if(message === null){
    return null
  }


  return (
    <div className={`alert ${className} text-center`} role="alert" id="container-error">
      <strong>  {message} </strong>
    </div>
  )
}

Notification.propTypes = {
  className: PropTypes.string.isRequired
}

export default Notification