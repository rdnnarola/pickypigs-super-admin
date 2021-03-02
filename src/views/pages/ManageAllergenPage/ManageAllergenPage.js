import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {CBadge,CCard,CCardBody,CCardHeader,CCol,CDataTable,CButton,CRow,CDropdownMenu,CDropdownItem,CDropdown,CDropdownToggle} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import DataTable, { defaultThemes }from 'react-data-table-component';
import CIcon from '@coreui/icons-react'
import moment from "moment";
import DeleteAllergyComponent from './DeleteAllergyComponent';
import AddAllergyComponent from './AddAllergyComponent';
import UpdateAllergyComponent from './UpdateAllergyComponent';
import { getAllAllergyData } from '../../../redux/actions/manageAllergyAction';


const CustomDesc = ({ row }) => (
  <div>
    {}
    <div>
      <div data-tag="allowRowEvents" style={{ overflow: 'hidden', whiteSpace: 'wrap', textOverflow: 'ellipses' }}>
        {}
        {row.description}
      </div>
    </div>
  </div>
);

const ManageAllergenPage = () => {
    const dispatch=useDispatch();  
    const history = useHistory();
    const [inputValue,setInputValue]=useState("");
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [selectedId,setSelectedId]=useState('')
    const [addAllergyModalShow, setAddAllergyModalShow] = useState(false);
    const [updateAllergyModalShow, setUpdateAllergyModalShow] = useState(false);
    const [imagePath, seImagePath] = useState("");
    const [perPage, setPerPage] = useState(10);
    const [myPage, setMypage] = useState(1);

    // const imagelink="http://192.168.100.39:8000/"
    const imagelink="https://pickypigsapi.herokuapp.com/"


    // pagination start
    useEffect(()=>{
      setMypage(1)
      dispatch(getAllAllergyData({start:0,length:perPage,search:inputValue}));
    },[dispatch,inputValue,perPage,]);

     
    const handlePerRowsChange = (newPerPage) => {
      setPerPage(newPerPage);
      // dispatch(getAllAllergyData({start:0,length:perPage,search:inputValue}));
    };
    const handlePageChange = page=> {
      setMypage(page)
      console.log(page)
      dispatch(getAllAllergyData({start:(page-1)*perPage,length:perPage,search:inputValue}));
    };
    //pagination end

    let allAllergy_data = useSelector((state)=>{
        return state.allergy
    });

    let {isLoading,allergy_Data,totalrows}=allAllergy_data;


    const columns = [
      { selector: 'name',name: 'Name',  },
      {
        name: 'Thumbnail',
        cell: row => <img height="40px" className="border m-2" width="40px" alt={row.name} src={`${imagelink}${row.image}`} />,
      },
      { selector: 'description',name: 'Description', allowOverflow:false,cell: row => <CustomDesc row={row} />,},
      // { selector: 'updatedAt', name: 'Updated At', cell:(row)=><span>{moment(row.updatedAt).format(" Do MMMM, YYYY")}</span>  },
      { name: 'Action', button: true,
          cell: (row) => 
            <CDropdown className="btn-group">
            <CDropdownToggle className="pinkbg-btn" size="sm"> Action </CDropdownToggle>
            <CDropdownMenu placement="left" >
              <CDropdownItem onClick={() => {setUpdateAllergyModalShow(true);setSelectedId(row._id);seImagePath(row.image)}}>Update</CDropdownItem>
              <CDropdownItem onClick={() => {setDeleteModalShow(true);setSelectedId(row._id);seImagePath(row.image)}}>Delete</CDropdownItem>
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
                Manage Allergy
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
                <CButton className="btn pinkline-btn text-uppercase rounded-pill" onClick={() => {setAddAllergyModalShow(true);setSelectedId(null)}}>
                  <span className="add-icon">
                     Add Allergy
                  </span>  
                </CButton>
              </CCol>
              <div>
                <AddAllergyComponent 
                  show={addAllergyModalShow} 
                  onClose={() => setAddAllergyModalShow(false)} 
                  perPage={perPage} 
                  myPage={myPage}
                  inputValue={inputValue}
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
                            allergy_Data.allergenList && allergy_Data.allergenList.length>0
                            ?
                            <CCard>
                              <DataTable
                                columns={columns}
                                data={allergy_Data.allergenList}
                                highlightOnHover
                                noHeader
                                striped
                                sortIcon={<CIcon name={"cil-arrow-top"} />}
                                overflowY

                                pagination={true}
                                paginationRowsPerPageOptions={[10, 15, 20, 25, 30]}
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
            {/* {JSON.stringify(allergy_Data.allergenList)} */}
            
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <React.Fragment>
        <UpdateAllergyComponent show={updateAllergyModalShow} 
          onClose={() => setUpdateAllergyModalShow(false)} 
          selectedid={selectedId} imagelink={imagelink}
          imagepath={imagePath} perPage={perPage} 
          myPage={myPage} inputValue={inputValue}
        />
    </React.Fragment>
    <React.Fragment>
      <DeleteAllergyComponent show={deleteModalShow} 
        onClose={() => setDeleteModalShow(false)} 
        selectedid={selectedId} imagepath={imagePath} 
        perPage={perPage} myPage={myPage} 
        inputValue={inputValue}
      />
    </React.Fragment>
    </>

  )
}

export default ManageAllergenPage

