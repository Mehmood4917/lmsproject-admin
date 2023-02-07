import React, { lazy } from 'react'
import PrivateRoute from '../../components/PrivateRoute'

const AddBatchComponent =lazy(()=>import('../CourseBatches/AddBatch'))
const AllBatchesComponent =lazy(()=>import('../CourseBatches/AllBatches'))
const CompletedBatchesComponent =lazy(()=>import('../CourseBatches/CompletedBatches'))

const batchdetails=lazy(()=>import('../CourseBatches/batchdetails'))

const CourseBatches=()=> {
    return (
        <>
            <PrivateRoute path="/admin/coursebatches/add-batch" exact component={AddBatchComponent}/>
             <PrivateRoute path="/admin/coursebatches/add-batch/:id" component={AddBatchComponent}/>
            <PrivateRoute path="/admin/coursebatches/all-batches" component={AllBatchesComponent}/>
            <PrivateRoute path="/admin/coursebatches/completed-batch" component={CompletedBatchesComponent}/>
          
          <PrivateRoute path="/admin/coursebatches/batchdetails" component={batchdetails} />
    </>

    )
}

export default CourseBatches
