import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CButton,
  CRow,
  CDropdownMenu,
  CDropdownItem,
  CDropdown,
  CDropdownToggle,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import CIcon from "@coreui/icons-react";
import DeleteCuisineComponent from "./DeleteCuisineComponent";
import AddCuisineComponent from "./AddCuisineComponent";
import UpdateCuisineComponent from "./UpdateCuisineComponent";
import {
  getAllCuisineData,
  showAddCuisineModal,
  showDeleteCuisineModal,
  showUpdateCuisineModal,
} from "../../../redux/actions/manageCuisineAction";

const ManageCuisinePage = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  // const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  // const [addCuisineModalShow, setAddCuisineModalShow] = useState(false);
  // const [updateCuisineModalShow, setUpdateCuisineModalShow] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [myPage, setMypage] = useState(1);

  const addCuisineModalShow = useSelector(
    (state) => state.cuisine.showAddCuisineModalData
  );
  const updateCuisineModalShow = useSelector(
    (state) => state.cuisine.showUpdateCuisineModalData
  );
  const deleteModalShow = useSelector(
    (state) => state.cuisine.showDeleteCuisineModalData
  );

  // useEffect(()=>{
  //     dispatch(getAllCuisineData({start:0,search:inputValue}));
  // },[dispatch,inputValue]);

  // pagination start
  useEffect(() => {
    dispatch(
      getAllCuisineData({ start: 0, length: perPage, search: inputValue })
    );
    setMypage(1);
  }, [dispatch, inputValue, perPage]);

  const handlePerRowsChange = (newPerPage) => {
    setPerPage(newPerPage);
    // dispatch(getAllCuisineData({start:0,length:perPage,search:inputValue}));
  };
  const handlePageChange = (page) => {
    setMypage(page);
    // console.log(page)
    dispatch(
      getAllCuisineData({
        start: (page - 1) * perPage,
        length: perPage,
        search: inputValue,
      })
    );
  };
  //pagination end

  let allCuisine_data = useSelector((state) => {
    return state.cuisine;
  });
  let { isLoading, cuisine_Data, totalrows } = allCuisine_data;

  const columns = [
    { selector: "name", name: "Name" },
    // { selector: 'description',name: 'Description', sortable: true},
    // { selector: 'updatedAt', name: 'Updated At', cell:(row)=><span>{moment(row.updatedAt).format(" Do MMMM, YYYY")}</span>  },

    {
      name: "Action",
      button: true,
      cell: (row) => (
        <CDropdown className="btn-group">
          <CDropdownToggle className="pinkbdr-btn" size="sm">
            {" "}
            Action{" "}
          </CDropdownToggle>
          <CDropdownMenu placement="left">
            <CDropdownItem
              onClick={() => {
                dispatch(showUpdateCuisineModal(true));
                setSelectedId(row._id);
              }}
            >
              Update
            </CDropdownItem>
            <CDropdownItem
              onClick={() => {
                dispatch(showDeleteCuisineModal(true));
                setSelectedId(row._id);
              }}
            >
              Delete
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      ),
      allowOverflow: true,
    },
  ];

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Manage Cuisine</CCardHeader>
            <CCardBody>
              <CRow className="justify-content-between align-items-center ">
                <CCol sm="4" className="mb-4">
                  <input
                    className="form-control position-relative"
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                    }}
                    placeholder="Search By Name"
                  />
                  {inputValue && (
                    <CButton
                      onClick={(e) => {
                        setInputValue("");
                      }}
                      className="position-absolute"
                      style={{ top: 0, right: 7 }}
                    >
                      <CIcon name="cil-x" alt="Settings" className="mr-1" />
                    </CButton>
                  )}
                </CCol>
                <CCol className="mb-4 d-flex justify-content-end" sm="8">
                  <CButton
                    className="btn pinkline-btn text-uppercase rounded-pill"
                    onClick={() => {
                      dispatch(showAddCuisineModal(true));
                      setSelectedId(null);
                    }}
                  >
                    <span className="add-icon">Add Cuisine</span>
                  </CButton>
                </CCol>
                <div>
                  <AddCuisineComponent
                    show={addCuisineModalShow}
                    onClose={() => dispatch(showAddCuisineModal(false))}
                    perpage={perPage}
                    mypage={myPage}
                    inputvalue={inputValue}
                  />
                </div>
              </CRow>
              {isLoading ? (
                <div className="text-center">
                  <div className="spinner-border m-3" role="status"></div>
                  <div className="visually-hidden">Please Wait Loading...</div>
                </div>
              ) : (
                <React.Fragment>
                  {cuisine_Data.cuisineTypeList &&
                  cuisine_Data.cuisineTypeList.length > 0 ? (
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
                        paginationRowsPerPageOptions={[10, 15, 20, 25, 30]}
                        paginationPerPage={perPage}
                        paginationServer={true}
                        paginationDefaultPage={myPage}
                        paginationTotalRows={totalrows}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePageChange}
                      />
                    </CCard>
                  ) : (
                    <div className="visually-hidden text-center m-4">
                      No Data Available
                    </div>
                  )}
                </React.Fragment>
              )}
              {/* {JSON.stringify(cuisine_Data.cuisineTypeList)} */}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <React.Fragment>
        <UpdateCuisineComponent
          show={updateCuisineModalShow}
          onClose={() => dispatch(showUpdateCuisineModal(false))}
          selectedid={selectedId}
          perpage={perPage}
          mypage={myPage}
          inputvalue={inputValue}
        />
      </React.Fragment>
      <React.Fragment>
        <DeleteCuisineComponent
          show={deleteModalShow}
          onClose={() => dispatch(showDeleteCuisineModal(false))}
          selectedid={selectedId}
          perpage={perPage}
          mypage={myPage}
          inputvalue={inputValue}
        />
      </React.Fragment>
    </>
  );
};

export default ManageCuisinePage;
