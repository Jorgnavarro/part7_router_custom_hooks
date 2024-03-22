
import { useSelector } from 'react-redux'


const Notification = () => {

  const message = useSelector(({ notification }) => {
    return notification
  })

  if(message === null){
    return null
  }

  let messageRegex = /Wrong|expired|invalid|401/

  let resultNotification = messageRegex.test(message)


  const styleNotification = resultNotification
    ? 'alert-danger'
    : 'alert-success'

  return (
    <div className={`alert ${styleNotification} text-center`} role="alert" id="container-error">
      <strong>  {message} </strong>
    </div>
  )
}


export default Notification