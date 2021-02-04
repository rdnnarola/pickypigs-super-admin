import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {CCard,CCardBody,CCardHeader,CCol,CButton,CRow,CDropdownMenu,CDropdownItem,CDropdown,CDropdownToggle} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import CIcon from '@coreui/icons-react'
import DeleteDietaryComponent from './DeleteDietaryComponent';
import AddDietaryComponent from './AddDietaryComponent';
import UpdateDietaryComponent from './UpdateDietaryComponent';
import { getAllDietaryData } from '../../../redux/actions/manageDietaryAction';

const customStyles = {
  headRow: {
    style: {
      minHeight: '65px',
    },
  },
  cells: {
    style: {
      '&:not(:last-of-type)': {
        minHeight: '90px',
      },
    },
  },
}
const customStyles2 = {
  headRow: {
    style: {
      minHeight: '65px',
    },
  },
  cells: {
    style: {
      '&:not(:last-of-type)': {
        minHeight: '65px',
      },
    },
  },
}

const ManageDietaryPage = () => {
    const dispatch=useDispatch();  
    const history = useHistory();
    const [inputValue,setInputValue]=useState("");
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [selectedId,setSelectedId]=useState('')
    const [addDietaryModalShow, setAddDietaryModalShow] = useState(false);
    const [updateDietaryModalShow, setUpdateDietaryModalShow] = useState(false);
    const [perPage, setPerPage] = useState(10);


    useEffect(()=>{
        dispatch(getAllDietaryData({start:0,search:inputValue}));
    },[dispatch,inputValue]);

    let allDietary_data = useSelector((state)=>{
        return state.dietary
    });

    let {isLoading,dietary_Data,totalrows}=allDietary_data;


    const columns = [
  
      { selector: 'name',name: 'Name', sortable: true, },
      // { selector: 'description',name: 'Description', sortable: true},
     { name: 'Action', button: true,
        cell: (row) => 
          <CDropdown className="btn-group">
          <CDropdownToggle color="primary"> Action </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => {setUpdateDietaryModalShow(true);setSelectedId(row._id);}}>Update</CDropdownItem>
            <CDropdownItem onClick={() => {setDeleteModalShow(true);setSelectedId(row._id);}}>Delete</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      },
    ];
    const handlePerRowsChange = async (newPerPage) => {
      setPerPage(newPerPage);
    };
    const handlePageChange = page => {
      console.log(page)
      dispatch(getAllDietaryData({start:perPage+page-2,length:perPage,search:inputValue}));
    };
    
  return (
    <>
    <CRow>
      <CCol >
        <CCard>
          <CCardHeader>
                Manager Dietary 
          </CCardHeader>
          <CCardBody>
            <CRow className="justify-content-between align-items-center ">
              <CCol md="4" className="mb-4">
                <input className="form-control" type="text" onChange={(e)=>{setInputValue(e.target.value)}} placeholder="Search By Name" />
              </CCol>
              <CCol className="mb-4 d-flex justify-content-end" md="8">
                <CButton color="primary" onClick={() => {setAddDietaryModalShow(true);setSelectedId(null)}}>
                  + Add Dietary
                </CButton>
              </CCol>
              <div>
                <AddDietaryComponent show={addDietaryModalShow} onClose={() => setAddDietaryModalShow(false)} />
              </div>
            </CRow>
              {
                  isLoading
                  ?
                  <div className="text-center">
                      <div className="spinner-border m-3" role="status"></div>
                        <div className="visually-hidden">Please Wait Loading...</div>
                  </div>
                  :
                  <React.Fragment>
                        {
                            dietary_Data.dietaryList && dietary_Data.dietaryList.length>0
                            ?
                            <CCard>
                              <DataTable
                                columns={columns}
                                data={dietary_Data.dietaryList}
                                highlightOnHover
                                pagination
                                // paginationServer
                                // paginationTotalRows={totalrows}
                                // onChangeRowsPerPage={handlePerRowsChange}
                                // onChangePage={handlePageChange}
                                noHeader
                                striped
                                sortIcon={<CIcon name={"cil-arrow-top"} />}
                                customStyles={dietary_Data.dietaryList && dietary_Data.dietaryList.length===1?customStyles:customStyles2}
                              />
                            </CCard>
                            
                            :
                            <div className="visually-hidden text-center m-4">No Data Available</div>
                      }
                  </React.Fragment>
              }
            {/* {JSON.stringify(dietary_Data.dietaryList)} */}
            
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <React.Fragment>
        <UpdateDietaryComponent show={updateDietaryModalShow} onClose={() => setUpdateDietaryModalShow(false)} selectedid={selectedId} />
    </React.Fragment>
    <React.Fragment>
      <DeleteDietaryComponent show={deleteModalShow} onClose={() => setDeleteModalShow(false)} selectedid={selectedId} />
    </React.Fragment>
    </>

  )
}

export default ManageDietaryPage

