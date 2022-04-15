import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from 'src/redux/product/apiCalls'
import { Title, useGetList, Datagrid } from 'react-admin'
import {
  Card,
  TextField,
  Button,
  Toolbar,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@mui/material'

const List = () => {
  const { data, count, totalCount } = useSelector((state) => state.product.data)
  const dispatch = useDispatch()

  useEffect(() => {
    getProduct(dispatch, '')
  }, [])

  const [filter, setFilter] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 10
  // const { data, total, isLoading } = useGetList('books', {
  //   filter: { q: filter },
  //   pagination: { page, perPage },
  //   sort: { field: 'id', order: 'ASC' },
  // })
  if (!data) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <Datagrid data={data}>
        <TextField source="_id" />
        <TextField source="name" />
        {/* <TextField source="author" /> */}
        {/* <TextField source="year" /> */}
      </Datagrid>
    </div>
  )

  // return (
  //   <>
  //     <CCard>
  //       <CCardHeader>Header</CCardHeader>
  //       <CCardBody>
  //         <CTable borderless hover>
  //           <CTableHead>
  //             <CTableRow>
  //               <CTableHeaderCell scope="col">Name</CTableHeaderCell>
  //               <CTableHeaderCell scope="col">Category</CTableHeaderCell>
  //               <CTableHeaderCell scope="col">Price</CTableHeaderCell>
  //             </CTableRow>
  //           </CTableHead>
  //           <CTableBody>
  //             {products?.map((item) => (
  //               <CTableRow key={item._id}>
  //                 <CTableDataCell>Mark</CTableDataCell>
  //                 <CTableDataCell>Otto</CTableDataCell>
  //                 <CTableDataCell>@mdo</CTableDataCell>
  //               </CTableRow>
  //             ))}
  //           </CTableBody>
  //         </CTable>
  //       </CCardBody>
  //     </CCard>
  //   </>
  // )
}

export default List
