import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {CBadge,CCard,CCardBody,CCardHeader,CCol,CDataTable,CButton,CRow,CDropdownMenu,CDropdownItem,CDropdown,CDropdownToggle} from '@coreui/react'
import { downloadUserData, getAllUsersData } from '../../../redux/actions/manageUsersAction';
import { useDispatch, useSelector } from 'react-redux';
import DataTable, { defaultThemes }from 'react-data-table-component';
import CIcon from '@coreui/icons-react'
import moment from "moment";
// import DeleteRestaurantModalComp from './DeleteRestaurantModalComp';
// import AddRestaurantModalComp from './AddRestaurantModalComp';
import UpdateUserPasswordModalComp from './UpdateUserPasswordModalComp';
import Axios from '../../../redux/actions/axios';




const ManageUsersPage = () => {
    const dispatch=useDispatch();  
    const history = useHistory();
    const [inputValue,setInputValue]=useState("");
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [selectedId,setSelectedId]=useState('')
    const [selectedMail,setSelectedMail]=useState('')
    const [accountType,setAccountType]=useState('')
    const [addRestaurantModalShow, setAddRestaurantModalShow] = useState(false);
    const [updateUserPasswordModalShow, setUpdateUserPasswordModalShow] = useState(false);
    const [perPage, setPerPage] = useState(10);
    const [myPage, setMypage] = useState(1);

    // useEffect(()=>{
    //     dispatch(getAllUsersData({start:0}));
    // },[dispatch]);

    // pagination start
    useEffect(()=>{
      setMypage(1)
      dispatch(getAllUsersData({start:0,length:perPage,search:inputValue}));
    },[dispatch,inputValue,perPage,]);

     
    const handlePerRowsChange = (newPerPage) => {
      setPerPage(newPerPage);
      // dispatch(getAllUsersData({start:0,length:perPage,search:inputValue}));
    };
    const handlePageChange = page=> {
      setMypage(page)
      // console.log(page)
      dispatch(getAllUsersData({start:(page-1)*perPage,length:perPage,search:inputValue}));
    };
    //pagination end

    let allUsers_Data = useSelector((state)=>{
        return state.users
    });

    let {isLoading,users_Data,totalrows}=allUsers_Data;

    

    const columns = [
  
      { selector: 'user_preferenceDetail.name',name: 'Name',  },
      { selector: 'email', name: 'Email', sortable: true},
      // { selector: 'user_preferenceDetail.myPreferences.allergenInformation', name: 'Allergen Info',  cell:(row)=><span>{row.user_preferenceDetail.myPreferences.allergenInformation.map((data,index)=>{return(<div key={index}><p>{data.name}</p></div>)})}</span> },
      // { selector: 'user_preferenceDetail.myPreferences.dietaryPreferences', name: 'Dietary Preferences',  cell:(row)=><span>{row.user_preferenceDetail.myPreferences.dietaryPreferences.map((data,index)=>{return(<div key={index}><p>{data.name}</p></div>)})}</span> },
      // { selector: 'user_preferenceDetail.myPreferences.lifestyleChoice', name: 'Lifestyle Choice',  cell:(row)=><span>{row.user_preferenceDetail.myPreferences.lifestyleChoice.map((data,index)=>{return(<div key={index}><p>{data.name}</p></div>)})}</span> },
      // { selector: 'user_preferenceDetail.myPreferences.restaurantFeatures', name: 'restaurant Features',  cell:(row)=><span>{row.user_preferenceDetail.myPreferences.restaurantFeatures.map((data,index)=>{return(<div key={index}><p>{data.name}</p></div>)})}</span> },
      { selector: 'user_preferenceDetail.phone',name: 'Mobile',  cell:(row)=><span>{row.user_preferenceDetail.phone}</span> },
      { selector: 'updatedAt', name: 'Updated At', cell:(row)=><span>{moment(row.updatedAt).format(" Do MMMM, YYYY")}</span>  },
      { name: 'Action', button: true,
        cell: (row) => 
          <CDropdown className="btn-group">
          <CDropdownToggle className="pinkbdr-btn" size="sm"> Action </CDropdownToggle>
          <CDropdownMenu placement="left">
            <CDropdownItem onClick={() => {setUpdateUserPasswordModalShow(true);setSelectedId(row._id);setSelectedMail(row.user_preferenceDetail.name);setAccountType(row.accountType)}}>Update Password</CDropdownItem>
            {/* <CDropdownItem onClick={() => {setDeleteModalShow(true);setSelectedId(row._id)}}>Delete</CDropdownItem> */}
          </CDropdownMenu>
        </CDropdown>,
            allowOverflow: true,
      },
  
    ];






// Download SCV
const  handleDownloadScv = () => {
  let dataURL = `/super_admin/manage_user/export_user`;
  let responseType='blob'
  Axios
        .post(dataURL,responseType)
        .then(response => {
          console.log(response)
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'file.csv'); //or any other extension
          document.body.appendChild(link);
          link.click();
        })
        .catch(error => console.log(error));
};



  return (
    <>
    <CRow>
      <CCol >
        <CCard>
          <CCardHeader>
                Manage Users
          </CCardHeader>
          <CCardBody>
            <CRow className="justify-content-between align-items-center ">
              <CCol sm="4" className="mb-4">
                <input className="form-control position-relative"  type="text" value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}} placeholder="Search By Name" />
               {inputValue&&
                <CButton onClick={(e)=>{setInputValue("")}} className="position-absolute" style={{top:0,right:7}}>
                  <CIcon name="cil-x" alt="Settings" className="mr-1"/>
                </CButton>
                }
              </CCol>
              <CCol className="mb-4 d-flex justify-content-end" sm="8">
                {/* <CButton className="btn pinkline-btn text-uppercase rounded-pill" disabled onClick={() => {setAddRestaurantModalShow(true);setSelectedId(null);setSelectedMail(null)}}>
                  <span className="add-icon">
                     Add User
                  </span> 
                </CButton> */}
                <CButton className="btn pinkline-btn text-uppercase rounded-pill ml-3" onClick={handleDownloadScv}>
                    <CIcon name="cil-cloud-download" alt="Settings" className="mr-1"/>
                    {/* <span className="edit-icon"> */}
                      Export CSV
                    {/* </span>  */}
                </CButton>
              </CCol>
              <div>
                {/* <AddRestaurantModalComp show={addRestaurantModalShow} onClose={() => setAddRestaurantModalShow(false)} /> */}
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
                            users_Data && users_Data.userList.length>0
                            ?
                            <CCard>
                              <DataTable
                                columns={columns}
                                data={users_Data.userList}
                                highlightOnHover
                                noHeader
                                overflowY
                                striped
                                responsive
                                sortIcon={<CIcon name={"cil-arrow-top"} />}

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
            {/* {JSON.stringify(users_Data.userList&&users_Data.userList.user_preferenceDetail.myPreferences)} */}
            
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <React.Fragment>
        <UpdateUserPasswordModalComp 
          show={updateUserPasswordModalShow} onClose={() => setUpdateUserPasswordModalShow(false)} 
          selectedid={selectedId} selectedmail={selectedMail} accounttype={accountType}
          perpage={perPage} mypage={myPage} inputvalue={inputValue}
        />
    </React.Fragment>
    <React.Fragment>
      {/* <DeleteRestaurantModalComp show={deleteModalShow} onClose={() => setDeleteModalShow(false)} selectedid={selectedId}/> */}
    </React.Fragment>
    </>

  )
}

export default ManageUsersPage

