import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {CBadge,CCard,CCardBody,CCardHeader,CCol,CDataTable,CButton,CRow,CDropdownMenu,CDropdownItem,CDropdown,CDropdownToggle} from '@coreui/react'
import { getAllRestaurantData } from '../../../redux/actions/manageRestaurantAction';
import { useDispatch, useSelector } from 'react-redux';
import DataTable, { defaultThemes }from 'react-data-table-component';
import CIcon from '@coreui/icons-react'
import moment from "moment";
import DeleteRestaurantModalComp from './DeleteRestaurantModalComp';
import AddRestaurantModalComp from './AddRestaurantModalComp';
import UpdatePasswordModalComp from './UpdatePasswordModalComp';
import './ManageRestaurantPage.scss'

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

const ManageRestaurantPage = () => {
    const dispatch=useDispatch();  
    const history = useHistory();
    const [inputValue,setInputValue]=useState("");
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [selectedId,setSelectedId]=useState('')
    const [addRestaurantModalShow, setAddRestaurantModalShow] = useState(false);
    const [updateRestaurantModalShow, setUpdateRestaurantModalShow] = useState(false);

    useEffect(()=>{
        dispatch(getAllRestaurantData({start:0}));
    },[dispatch]);

    let allRestaurant_data = useSelector((state)=>{
        return state.restaurant
    });

    let {isLoading,restaurant_Data}=allRestaurant_data;

    const search=(datas)=>{
        return datas.filter(
            (data)=>data.email.toLowerCase().indexOf(inputValue)>-1
            );
        // const columns=datas[0]&&Object.keys(datas[0]);
        // return datas.filter((data)=>columns.some((column)=>data[column].toString().toLowerCase().indexOf(inputValue.toLowerCase())>-1));
    }

    const columns = [
  
      { selector: 'restaurants.name',name: 'Name', sortable: true, },
      { selector: 'email', name: 'Email', sortable: true},
      { selector: 'restaurants.company',name: 'Company', sortable: true},
      { selector: 'restaurants.package', name: 'Package', sortable: true },
      { selector: 'restaurants.phoneNumber',name: 'Mobile', sortable: true, cell:(row)=><span>{row.restaurants.phoneNumber}</span> },
      { selector: 'updatedAt', name: 'Updated At', sortable: true,cell:(row)=><span>{moment(row.updatedAt).format(" Do MMMM, YYYY")}</span>  },
      { name: 'Action', button: true,
        cell: (row) => 
          <CDropdown className="btn-group">
          <CDropdownToggle color="primary"> Action </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => {setUpdateRestaurantModalShow(true);setSelectedId(row._id)}}>Update Password</CDropdownItem>
            <CDropdownItem onClick={() => {setDeleteModalShow(true);setSelectedId(row._id)}}>Delete</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      },
  
    ];


  return (
    <>
    <CRow>
      <CCol >
        <CCard>
          <CCardHeader>
                Manager Restaurant
          </CCardHeader>
          <CCardBody>
            <CRow className="justify-content-between align-items-center ">
              <CCol md="4" className="mb-4">
                <input className="form-control" type="text" onChange={(e)=>{setInputValue(e.target.value)}} placeholder="Search" />
              </CCol>
              <CCol className="mb-4 d-flex justify-content-end" md="8">
                <CButton color="primary" onClick={() => {setAddRestaurantModalShow(true);setSelectedId(null)}}>
                  + Add Restaurant
                </CButton>
              </CCol>
              <div>
                <AddRestaurantModalComp show={addRestaurantModalShow} onClose={() => setAddRestaurantModalShow(false)} />
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
                            restaurant_Data.restaurantList && restaurant_Data.restaurantList.length>0
                            ?
                            <CCard>
                              <DataTable
                                columns={columns}
                                data={search(restaurant_Data.restaurantList)}
                                highlightOnHover
                                pagination
                                noHeader
                                striped
                                className="managerestaurant-table"
                                sortIcon={<CIcon name={"cil-arrow-top"} />}
                                customStyles={restaurant_Data.restaurantList && restaurant_Data.restaurantList.length===1?customStyles:customStyles2}

                              />
                            </CCard>
                            
                            :
                            <div className="visually-hidden text-center m-4">No Data Available</div>
                      }
                  </React.Fragment>
              }
            {/* {JSON.stringify(restaurant_Data.restaurantList)} */}
            
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <React.Fragment>
        <UpdatePasswordModalComp show={updateRestaurantModalShow} onClose={() => setUpdateRestaurantModalShow(false)} selectedid={selectedId}/>
    </React.Fragment>
    <React.Fragment>
      <DeleteRestaurantModalComp show={deleteModalShow} onClose={() => setDeleteModalShow(false)} selectedid={selectedId}/>
    </React.Fragment>
    </>

  )
}

export default ManageRestaurantPage

