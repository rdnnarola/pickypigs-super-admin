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
import DeleteCookingComponent from "./DeleteCookingComponent";
import AddCookingComponent from "./AddCookingComponent";
import UpdateCookingComponent from "./UpdateCookingComponent";
import {
  getAllCookingData,
  showAddCookingModal,
  showDeleteCookingModal,
  showUpdateCookingModal,
} from "../../../redux/actions/manageCookingAction";
import { SERVER_URL } from "../../../shared/constant";
import CustomDescription from "../../../reusable/CustomDescription";

const ManageAllergenPage = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  // const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  // const [addCookingModalShow, setAddCookingModalShow] = useState(false);
  // const [updateCookingModalShow, setUpdateCookingModalShow] = useState(false);
  const [imagePath, seImagePath] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [myPage, setMypage] = useState(1);

  const addCookingModalShow = useSelector(
    (state) => state.cooking.showAddCookingModalData
  );
  const updateCookingModalShow = useSelector(
    (state) => state.cooking.showUpdateCookingModalData
  );
  const deleteModalShow = useSelector(
    (state) => state.cooking.showDeleteCookingModalData
  );

  // useEffect(()=>{
  //     dispatch(getAllCookingData({start:0,search:inputValue}));
  // },[dispatch,inputValue]);

  // pagination start
  useEffect(() => {
    setMypage(1);
    dispatch(
      getAllCookingData({ start: 0, length: perPage, search: inputValue })
    );
  }, [dispatch, inputValue, perPage]);

  const handlePerRowsChange = (newPerPage) => {
    setPerPage(newPerPage);
    // dispatch(getAllCookingData({start:0,length:perPage,search:inputValue}));
  };
  const handlePageChange = (page) => {
    setMypage(page);
    // console.log(page)
    dispatch(
      getAllCookingData({
        start: (page - 1) * perPage,
        length: perPage,
        search: inputValue,
      })
    );
  };
  //pagination end

  let allCooking_data = useSelector((state) => {
    return state.cooking;
  });

  let { isLoading, cooking_Data, totalrows } = allCooking_data;

  const columns = [
    { selector: "name", name: "Name" },
    {
      name: "Thumbnail",
      cell: (row) => (
        <img
          height="40px"
          className="border m-2"
          width="40px"
          alt={row.name}
          src={`${SERVER_URL}/${row.image}`}
        />
      ),
    },
    {
      selector: "description",
      name: "Description",
      allowOverflow: false,
      cell: (row) => (<CustomDescription row={row}/>),
    },
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
                dispatch(showUpdateCookingModal(true));
                setSelectedId(row._id);
                seImagePath(row.image);
              }}
            >
              Update
            </CDropdownItem>
            <CDropdownItem
              onClick={() => {
                dispatch(showDeleteCookingModal(true));
                setSelectedId(row._id);
                seImagePath(row.image);
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
            <CCardHeader>Manage Cooking Method</CCardHeader>
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
                      dispatch(showAddCookingModal(true));
                      setSelectedId(null);
                    }}
                  >
                    <span className="add-icon">Add Cooking Method</span>
                  </CButton>
                </CCol>
                <div>
                  <AddCookingComponent
                    show={addCookingModalShow}
                    onClose={() => dispatch(showAddCookingModal(false))}
                    perpage={perPage}
                    mypage={myPage}
                    inputvalue={inputValue}
                    loading={isLoading}
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
                  {cooking_Data.cooking_methodList &&
                  cooking_Data.cooking_methodList.length > 0 ? (
                    <CCard>
                      <DataTable
                        columns={columns}
                        data={cooking_Data.cooking_methodList}
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
              {/* {JSON.stringify(cooking_Data.cooking_methodList)} */}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <React.Fragment>
        <UpdateCookingComponent
          show={updateCookingModalShow}
          onClose={() => dispatch(showUpdateCookingModal(false))}
          selectedid={selectedId}
          imagepath={imagePath}
          perpage={perPage}
          mypage={myPage}
          inputvalue={inputValue}
          loading={isLoading}
        />
      </React.Fragment>
      <React.Fragment>
        <DeleteCookingComponent
          show={deleteModalShow}
          onClose={() => dispatch(showDeleteCookingModal(false))}
          selectedid={selectedId}
          imagepath={imagePath}
          perPage={perPage}
          myPage={myPage}
          inputValue={inputValue}
          loading={isLoading}
        />
      </React.Fragment>
    </>
  );
};

export default ManageAllergenPage;
