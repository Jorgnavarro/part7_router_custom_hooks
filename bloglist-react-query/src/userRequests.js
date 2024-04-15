import userService from './services/user'



export const getUsers = () => userService.getAllUsers().then(response => response)