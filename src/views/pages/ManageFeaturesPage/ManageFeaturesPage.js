import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {CBadge,CCard,CCardBody,CCardHeader,CCol,CDataTable,CButton,CRow,CDropdownMenu,CDropdownItem,CDropdown,CDropdownToggle} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import DataTable, { defaultThemes }from 'react-data-table-component';
import CIcon from '@coreui/icons-react'
import moment from "moment";
import DeleteFeaturesComponent from './DeleteFeaturesComponent';
import AddFeaturesComponent from './AddFeaturesComponent';
import UpdateFeaturesComponent from './UpdateFeaturesComponent';
import { getAllFeaturesData } from '../../../redux/actions/manageFeaturesAction';

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

const ManageAllergenPage = () => {
    const dispatch=useDispatch();  
    const history = useHistory();
    const [inputValue,setInputValue]=useState("");
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [selectedId,setSelectedId]=useState('')
    const [addFeaturesModalShow, setAddFeaturesModalShow] = useState(false);
    const [updateFeaturesModalShow, setUpdateFeaturesModalShow] = useState(false);
    const [imagePath, seImagePath] = useState("");
    const [perPage, setPerPage] = useState(10);

    // const imagelink="http://192.168.100.39:8000/"
    
    const imagelink="https://pickypigsapi.herokuapp.com/"

    useEffect(()=>{
        dispatch(getAllFeaturesData({start:0,search:inputValue}));
    },[dispatch,inputValue]);

    let allFeatures_data = useSelector((state)=>{
        return state.features
    });

    let {isLoading,features_Data,totalrows}=allFeatures_data;


    const columns = [
  
      { selector: 'name',name: 'Name', sortable: true, },
      {
        name: 'Thumbnail',
        cell: row => <img height="60px" className="border m-2" width="56px" alt={row.name} src={`${imagelink}${row.image}`} />,
      },
      { selector: 'description',name: 'Description', sortable: true},
     { name: 'Action', button: true,
        cell: (row) => 
          <CDropdown className="btn-group">
          <CDropdownToggle color="primary"> Action </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => {setUpdateFeaturesModalShow(true);setSelectedId(row._id);seImagePath(row.image)}}>Update</CDropdownItem>
            <CDropdownItem onClick={() => {setDeleteModalShow(true);setSelectedId(row._id);seImagePath(row.image)}}>Delete</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      },
    ];

    const handlePerRowsChange = async (newPerPage) => {
      setPerPage(newPerPage);
    };
    const handlePageChange = page => {
      console.log(page)
      dispatch(getAllFeaturesData({start:perPage+page-2,length:perPage,search:inputValue}));
    };
    
  return (
    <>
    <CRow>
      <CCol >
        <CCard>
          <CCardHeader>
                Manager Features  || {perPage}
          </CCardHeader>
          <CCardBody>
            <CRow className="justify-content-between align-items-center ">
              <CCol md="4" className="mb-4">
                <input className="form-control" type="text" onChange={(e)=>{setInputValue(e.target.value)}} placeholder="Search By Name" />
              </CCol>
              <CCol className="mb-4 d-flex justify-content-end" md="8">
                <CButton color="primary" onClick={() => {setAddFeaturesModalShow(true);setSelectedId(null)}}>
                  + Add Features
                </CButton>
              </CCol>
              <div>
                <AddFeaturesComponent show={addFeaturesModalShow} onClose={() => setAddFeaturesModalShow(false)} imagelink={imagelink} />
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
                            features_Data.restaurantFeatureList && features_Data.restaurantFeatureList.length>0
                            ?
                            <CCard>
                              <DataTable
                                columns={columns}
                                data={features_Data.restaurantFeatureList}
                                highlightOnHover
                                pagination
                                // paginationServer
                                // paginationTotalRows={totalrows}
                                // onChangeRowsPerPage={handlePerRowsChange}
                                // onChangePage={handlePageChange}
                                noHeader
                                striped
                                sortIcon={<CIcon name={"cil-arrow-top"} />}
                                customStyles={features_Data.restaurantFeatureList && features_Data.restaurantFeatureList.length===1?customStyles:customStyles2}
                              />
                            </CCard>
                            
                            :
                            <div className="visually-hidden text-center m-4">No Data Available</div>
                      }
                  </React.Fragment>
              }
            {/* {JSON.stringify(features_Data.restaurantFeatureList)} */}
            
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <React.Fragment>
        <UpdateFeaturesComponent show={updateFeaturesModalShow} onClose={() => setUpdateFeaturesModalShow(false)} selectedid={selectedId} imagelink={imagelink} imagepath={imagePath}/>
    </React.Fragment>
    <React.Fragment>
      <DeleteFeaturesComponent show={deleteModalShow} onClose={() => setDeleteModalShow(false)} selectedid={selectedId} imagepath={imagePath} />
    </React.Fragment>
    </>

  )
}

export default ManageAllergenPage

