import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {CCard,CCardBody,CCardHeader,CCol,CButton,CRow,CDropdownMenu,CDropdownItem,CDropdown,CDropdownToggle} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import CIcon from '@coreui/icons-react'
import DeleteCuisineComponent from './DeleteCuisineComponent';
import AddCuisineComponent from './AddCuisineComponent';
import UpdateCuisineComponent from './UpdateCuisineComponent';
import { getAllCuisineData } from '../../../redux/actions/manageCuisineAction';

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

const ManageCuisinePage = () => {
    const dispatch=useDispatch();  
    const history = useHistory();
    const [inputValue,setInputValue]=useState("");
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [selectedId,setSelectedId]=useState('')
    const [addCuisineModalShow, setAddCuisineModalShow] = useState(false);
    const [updateCuisineModalShow, setUpdateCuisineModalShow] = useState(false);
    const [perPage, setPerPage] = useState(10);


    useEffect(()=>{
        dispatch(getAllCuisineData({start:0,search:inputValue}));
    },[dispatch,inputValue]);

    let allCuisine_data = useSelector((state)=>{
        return state.cuisine
    });
    let {isLoading,cuisine_Data,totalrows}=allCuisine_data;


    const columns = [
  
      { selector: 'name',name: 'Name', sortable: true, },
      // { selector: 'description',name: 'Description', sortable: true},
     { name: 'Action', button: true,
        cell: (row) => 
          <CDropdown className="btn-group">
          <CDropdownToggle color="primary"> Action </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => {setUpdateCuisineModalShow(true);setSelectedId(row._id);}}>Update</CDropdownItem>
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
      dispatch(getAllCuisineData({start:perPage+page-2,length:perPage,search:inputValue}));
    };
    
  return (
    <>
    <CRow>
      <CCol >
        <CCard>
          <CCardHeader>
                Manager Cuisine 
          </CCardHeader>
          <CCardBody>
            <CRow className="justify-content-between align-items-center ">
              <CCol md="4" className="mb-4">
                <input className="form-control" type="text" onChange={(e)=>{setInputValue(e.target.value)}} placeholder="Search By Name" />
              </CCol>
              <CCol className="mb-4 d-flex justify-content-end" md="8">
                <CButton color="primary" onClick={() => {setAddCuisineModalShow(true);setSelectedId(null)}}>
                  + Add Cuisine
                </CButton>
              </CCol>
              <div>
                <AddCuisineComponent show={addCuisineModalShow} onClose={() => setAddCuisineModalShow(false)} />
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
                            cuisine_Data.cuisineTypeList && cuisine_Data.cuisineTypeList.length>0
                            ?
                            <CCard>
                              <DataTable
                                columns={columns}
                                data={cuisine_Data.cuisineTypeList}
                                highlightOnHover
                                pagination
                                // paginationServer
                                // paginationTotalRows={totalrows}
                                // onChangeRowsPerPage={handlePerRowsChange}
                                // onChangePage={handlePageChange}
                                noHeader
                                striped
                                sortIcon={<CIcon name={"cil-arrow-top"} />}
                                customStyles={cuisine_Data.cuisineTypeList && cuisine_Data.cuisineTypeList.length===1?customStyles:customStyles2}
                              />
                            </CCard>
                            
                            :
                            <div className="visually-hidden text-center m-4">No Data Available</div>
                      }
                  </React.Fragment>
              }
            {/* {JSON.stringify(cuisine_Data.cuisineTypeList)} */}
            
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <React.Fragment>
        <UpdateCuisineComponent show={updateCuisineModalShow} onClose={() => setUpdateCuisineModalShow(false)} selectedid={selectedId} />
    </React.Fragment>
    <React.Fragment>
      <DeleteCuisineComponent show={deleteModalShow} onClose={() => setDeleteModalShow(false)} selectedid={selectedId} />
    </React.Fragment>
    </>

  )
}

export default ManageCuisinePage

