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
    const [addRestaurantModalShow, setAddRestaurantModalShow] = useState(false);
    const [updateUserPasswordModalShow, setUpdateUserPasswordModalShow] = useState(false);

    useEffect(()=>{
        dispatch(getAllUsersData({start:0}));
    },[dispatch]);

    let allUsers_Data = useSelector((state)=>{
        return state.users
    });

    let {isLoading,users_Data}=allUsers_Data;

    const search=(datas)=>{
        return datas.filter(
            (data)=>data.email.toLowerCase().indexOf(inputValue)>-1
            );
        // const columns=datas[0]&&Object.keys(datas[0]);
        // return datas.filter((data)=>columns.some((column)=>data[column].toString().toLowerCase().indexOf(inputValue.toLowerCase())>-1));
    }

    const columns = [
  
      { selector: 'user_preferenceDetail.name',name: 'Name', sortable: true, },
      { selector: 'email', name: 'Email', sortable: true},
      // { selector: 'user_preferenceDetail.myPreferences.allergenInformation', name: 'Allergen Info', sortable: true, cell:(row)=><span>{row.user_preferenceDetail.myPreferences.allergenInformation.map((data,index)=>{return(<div key={index}><p>{data.name}</p></div>)})}</span> },
      // { selector: 'user_preferenceDetail.myPreferences.dietaryPreferences', name: 'Dietary Preferences', sortable: true, cell:(row)=><span>{row.user_preferenceDetail.myPreferences.dietaryPreferences.map((data,index)=>{return(<div key={index}><p>{data.name}</p></div>)})}</span> },
      // { selector: 'user_preferenceDetail.myPreferences.lifestyleChoice', name: 'Lifestyle Choice', sortable: true, cell:(row)=><span>{row.user_preferenceDetail.myPreferences.lifestyleChoice.map((data,index)=>{return(<div key={index}><p>{data.name}</p></div>)})}</span> },
      // { selector: 'user_preferenceDetail.myPreferences.restaurantFeatures', name: 'restaurant Features', sortable: true, cell:(row)=><span>{row.user_preferenceDetail.myPreferences.restaurantFeatures.map((data,index)=>{return(<div key={index}><p>{data.name}</p></div>)})}</span> },
      { selector: 'user_preferenceDetail.phone',name: 'Mobile', sortable: true, cell:(row)=><span>{row.user_preferenceDetail.phone}</span> },
      { selector: 'updatedAt', name: 'Updated At', sortable: true,cell:(row)=><span>{moment(row.updatedAt).format(" Do MMMM, YYYY")}</span>  },
      { name: 'Action', button: true,
        cell: (row) => 
          <CDropdown className="btn-group">
          <CDropdownToggle color="primary"> Action </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => {setUpdateUserPasswordModalShow(true);setSelectedId(row._id);setSelectedMail(row.email)}}>Update Password</CDropdownItem>
            {/* <CDropdownItem onClick={() => {setDeleteModalShow(true);setSelectedId(row._id)}}>Delete</CDropdownItem> */}
          </CDropdownMenu>
        </CDropdown>
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
                Manager Users
          </CCardHeader>
          <CCardBody>
            <CRow className="justify-content-between align-items-center ">
              <CCol md="4" className="mb-4">
                <input className="form-control" type="text" onChange={(e)=>{setInputValue(e.target.value)}} placeholder="Search" />
              </CCol>
              <CCol className="mb-4 d-flex justify-content-end" md="8">
                <CButton color="primary" disabled onClick={() => {setAddRestaurantModalShow(true);setSelectedId(null);setSelectedMail(null)}}>
                  + Add User
                </CButton>
                <CButton onClick={handleDownloadScv} color="primary" className="ml-3">
                    <CIcon name="cil-cloud-download" alt="Settings" className="mr-1"/>
                    Export CSV
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
                                data={search(users_Data.userList)}
                                highlightOnHover
                                pagination
                                noHeader
                                striped
                                responsive
                                sortIcon={<CIcon name={"cil-arrow-top"} />}
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
        <UpdateUserPasswordModalComp show={updateUserPasswordModalShow} onClose={() => setUpdateUserPasswordModalShow(false)} selectedid={selectedId} selectedmail={selectedMail} />
    </React.Fragment>
    <React.Fragment>
      {/* <DeleteRestaurantModalComp show={deleteModalShow} onClose={() => setDeleteModalShow(false)} selectedid={selectedId}/> */}
    </React.Fragment>
    </>

  )
}

export default ManageUsersPage

