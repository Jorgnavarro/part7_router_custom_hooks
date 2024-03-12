// import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'


const Notification = () => {

  const message = useSelector(({ notification }) => {
    return notification
  })

  console.log(message)


  if(message === null){
    return null
  }

  const styleNotification = message.includes('Wrong')
    ? 'alert-danger'
    : 'alert-success'

  console.log(styleNotification)

  return (
    <div className={`alert ${styleNotification} text-center`} role="alert" id="container-error">
      <strong>  {message} </strong>
    </div>
  )
}

// Notification.propTypes = {
//   className: PropTypes.string.isRequired
// }

export default Notification