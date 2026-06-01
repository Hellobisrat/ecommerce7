import {API} from '../api/axios.js'

export const ProductService = {
  getAll:()=>API.get('/products'),
  getById:(id)=>API.get(`/products/${id}`),
  create:(data,token)=>
   API.post("/products",data,{
    headers:{Authorization:`Bearer ${token}`}
   }),
  update:(id,data,token)=>
    API.put(`/products/${id}`,data,{
      headers:{Authorization:`Bearer ${token}`}
    }),
  remove:(id,token)=>
    API.delete(`/products/${id}`,{
      headers: {Authorization: `Bearer ${token}`}
    })
}