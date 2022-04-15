import { publicRequest } from 'src/requestMethod'
import { loginFailure, loginStart, loginSuccess } from '../user/redux'

export const login = async (dispatch, user) => {
  dispatch(loginStart())
  try {
    const res = await publicRequest.post('/auth/login', user)
    console.log(res.data)
    dispatch(loginSuccess(res.data))
  } catch (err) {
    dispatch(loginFailure())
  }
}
