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
import moment from "moment";


const ManageCuisinePage = () => {
    const dispatch=useDispatch();  
    const history = useHistory();
    const [inputValue,setInputValue]=useState("");
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [selectedId,setSelectedId]=useState('')
    const [addCuisineModalShow, setAddCuisineModalShow] = useState(false);
    const [updateCuisineModalShow, setUpdateCuisineModalShow] = useState(false);
    const [perPage, setPerPage] = useState(5);
    const [myPage, setMypage] = useState(1);

    // useEffect(()=>{
    //     dispatch(getAllCuisineData({start:0,search:inputValue}));
    // },[dispatch,inputValue]);

    // pagination start
    useEffect(()=>{
      dispatch(getAllCuisineData({start:0,length:perPage,search:inputValue}));
      setMypage(1)
    },[dispatch,inputValue,perPage,]);

     
    const handlePerRowsChange = (newPerPage) => {
      setPerPage(newPerPage);
      // dispatch(getAllCuisineData({start:0,length:perPage,search:inputValue}));
    };
    const handlePageChange = page=> {
      setMypage(page)
      console.log(page)
      dispatch(getAllCuisineData({start:(page-1)*perPage,length:perPage,search:inputValue}));
    };
    //pagination end

    let allCuisine_data = useSelector((state)=>{
        return state.cuisine
    });
    let {isLoading,cuisine_Data,totalrows}=allCuisine_data;


    const columns = [
  
      { selector: 'name',name: 'Name',  },
      // { selector: 'description',name: 'Description', sortable: true},
      // { selector: 'updatedAt', name: 'Updated At', cell:(row)=><span>{moment(row.updatedAt).format(" Do MMMM, YYYY")}</span>  },

     { name: 'Action', button: true,
        cell: (row) => 
          <CDropdown className="btn-group">
          <CDropdownToggle className="pinkbdr-btn" size="sm"> Action </CDropdownToggle>
          <CDropdownMenu placement="left">
            <CDropdownItem onClick={() => {setUpdateCuisineModalShow(true);setSelectedId(row._id);}}>Update</CDropdownItem>
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
                Manage Cuisine 
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
                <CButton className="btn pinkline-btn text-uppercase rounded-pill" onClick={() => {setAddCuisineModalShow(true);setSelectedId(null)}}>
                  <span className="add-icon">
                     Add Cuisine
                  </span>   
                </CButton>
              </CCol>
              <div>
                <AddCuisineComponent 
                  show={addCuisineModalShow} onClose={() => setAddCuisineModalShow(false)} 
                  perPage={perPage} myPage={myPage} inputValue={inputValue}
                />
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
            {/* {JSON.stringify(cuisine_Data.cuisineTypeList)} */}
            
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <React.Fragment>
        <UpdateCuisineComponent 
          show={updateCuisineModalShow} onClose={() => setUpdateCuisineModalShow(false)} 
          selectedid={selectedId} 
          perPage={perPage} myPage={myPage} inputValue={inputValue}
        />
    </React.Fragment>
    <React.Fragment>
      <DeleteCuisineComponent 
        show={deleteModalShow} onClose={() => setDeleteModalShow(false)} 
        selectedid={selectedId}
        perPage={perPage} myPage={myPage} inputValue={inputValue}
      />
    </React.Fragment>
    </>

  )
}

export default ManageCuisinePage

