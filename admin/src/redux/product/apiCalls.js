import { userRequest } from 'src/requestMethod'
import { getProductFailure, getProductStart, getProductSuccess } from './redux'

export const getProduct = async (dispatch, filter) => {
  dispatch(getProductStart())
  try {
    const res = await userRequest.get('/products', filter)
    console.log(res.data.result)
    dispatch(getProductSuccess(res.data.result))
  } catch (err) {
    dispatch(getProductFailure())
  }
}
