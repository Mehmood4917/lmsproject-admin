import React,{lazy} from 'react'
import PrivateRoute from '../../components/PrivateRoute'

const AddAssessmentComponent=lazy(()=>import('./AddAssessment'))
const AllAssessmentsComponent =lazy(()=>import('./AllAssessment'))

const Assessments=()=> {
    return (
        <>
            <PrivateRoute path="/admin/assessments/add-assessment" exact component={AddAssessmentComponent}/>
            <PrivateRoute path="/admin/assessments/add-assessment/:id" component={AddAssessmentComponent}/>
            <PrivateRoute path="/admin/assessments/all-assessment" component={AllAssessmentsComponent}/>
            
        </>
    )
}

export default Assessments
