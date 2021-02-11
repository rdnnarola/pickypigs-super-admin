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



const ManageDietaryPage = () => {
    const dispatch=useDispatch();  
    const history = useHistory();
    const [inputValue,setInputValue]=useState("");
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [selectedId,setSelectedId]=useState('')
    const [addDietaryModalShow, setAddDietaryModalShow] = useState(false);
    const [updateDietaryModalShow, setUpdateDietaryModalShow] = useState(false);
    const [perPage, setPerPage] = useState(5);
    const [myPage, setMypage] = useState(1);

    // useEffect(()=>{
    //     dispatch(getAllDietaryData({start:0,search:inputValue}));
    // },[dispatch,inputValue]);

    // pagination start
    useEffect(()=>{
      dispatch(getAllDietaryData({start:0,length:perPage,search:inputValue}));
      setMypage(1)
    },[dispatch,inputValue,perPage,]);

     
    const handlePerRowsChange = (newPerPage) => {
      setPerPage(newPerPage);
      // dispatch(getAllDietaryData({start:0,length:perPage,search:inputValue}));
    };
    const handlePageChange = page=> {
      setMypage(page)
      console.log(page)
      dispatch(getAllDietaryData({start:(page-1)*perPage,length:perPage,search:inputValue}));
    };
    //pagination end

    let allDietary_data = useSelector((state)=>{
        return state.dietary
    });

    let {isLoading,dietary_Data,totalrows}=allDietary_data;


    const columns = [
  
      { selector: 'name',name: 'Name',  },
      // { selector: 'description',name: 'Description', sortable: true},
     { name: 'Action', button: true,
        cell: (row) => 
          <CDropdown className="btn-group">
          <CDropdownToggle className="pinkbdr-btn" size="sm"> Action </CDropdownToggle>
          <CDropdownMenu placement="left">
            <CDropdownItem onClick={() => {setUpdateDietaryModalShow(true);setSelectedId(row._id);}}>Update</CDropdownItem>
            <CDropdownItem onClick={() => {setDeleteModalShow(true);setSelectedId(row._id);}}>Delete</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>,
            allowOverflow: true,
      },
    ];
   
    
  return (
    <>
    <CRow>
      <CCol >
        <CCard>
          <CCardHeader>
                Manage Dietary 
          </CCardHeader>
          <CCardBody>
            <CRow className="justify-content-between align-items-center ">
              <CCol sm="4"  className="mb-4">
                <input className="form-control position-relative"  type="text" value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}} placeholder="Search By Name" />
               {inputValue&&
                <CButton onClick={(e)=>{setInputValue("")}} className="position-absolute" style={{top:0,right:7}}>
                  <CIcon name="cil-x" alt="Settings" className="mr-1"/>
                </CButton>
                }
              </CCol>
              <CCol className="mb-4 d-flex justify-content-end" sm="8">
                <CButton className="btn pinkline-btn text-uppercase rounded-pill" onClick={() => {setAddDietaryModalShow(true);setSelectedId(null)}}>
                  <span className="add-icon">
                     Add Dietary
                  </span>  
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
                                noHeader
                                overflowY
                                striped
                                sortIcon={<CIcon name={"cil-arrow-top"} />}

                                pagination={true}
                                paginationRowsPerPageOptions={[5,10, 15, 20, 25, 30]}
                                paginationPerPage={perPage}
                                paginationServer={true}
                                paginationDefaultPage	={myPage}
                                paginationTotalRows={totalrows}
                                onChangeRowsPerPage={handlePerRowsChange}
                                onChangePage={handlePageChange}
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

