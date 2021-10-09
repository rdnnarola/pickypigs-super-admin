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
import DeleteLifestyleComponent from "./DeleteLifestyleComponent";
import AddLifestyleComponent from "./AddLifestyleComponent";
import UpdateLifestyleComponent from "./UpdateLifestyleComponent";
import {
  getAllLifestyleData,
  showAddLifestyleModal,
  showDeleteLifestyleModal,
  showUpdateLifestyleModal,
} from "../../../redux/actions/manageLifestyleAction";
import { SERVER_URL } from "../../../shared/constant";
import CustomDescription from "../../../reusable/CustomDescription";

const ManageLifestylePage = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  // const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  // const [addLifestyleModalShow, setAddLifestyleModalShow] = useState(false);
  // const [updateLifestyleModalShow, setUpdateLifestyleModalShow] = useState(false);
  const [imagePath, seImagePath] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [myPage, setMypage] = useState(1);

  const addLifestyleModalShow = useSelector(
    (state) => state.lifestyle.showAddLifestyleModalData
  );
  const updateLifestyleModalShow = useSelector(
    (state) => state.lifestyle.showUpdateLifestyleModalData
  );
  const deleteModalShow = useSelector(
    (state) => state.lifestyle.showDeleteLifestyleModalData
  );

  // useEffect(()=>{
  //     dispatch(getAllLifestyleData({start:0,search:inputValue}));
  // },[dispatch,inputValue]);

  // pagination start
  useEffect(() => {
    setMypage(1);
    dispatch(
      getAllLifestyleData({ start: 0, length: perPage, search: inputValue })
    );
  }, [dispatch, inputValue, perPage]);

  const handlePerRowsChange = (newPerPage) => {
    setPerPage(newPerPage);
    // dispatch(getAllLifestyleData({start:0,length:perPage,search:inputValue}));
  };
  const handlePageChange = (page) => {
    setMypage(page);
    // console.log(page)
    dispatch(
      getAllLifestyleData({
        start: (page - 1) * perPage,
        length: perPage,
        search: inputValue,
      })
    );
  };
  //pagination end

  let allLifestyle_data = useSelector((state) => {
    return state.lifestyle;
  });

  let { isLoading, lifestyle_Data, totalrows } = allLifestyle_data;

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
      cell: (row) => <CustomDescription row={row} />,
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
                dispatch(showUpdateLifestyleModal(true));
                setSelectedId(row._id);
                seImagePath(row.image);
              }}
            >
              Update
            </CDropdownItem>
            <CDropdownItem
              onClick={() => {
                dispatch(showDeleteLifestyleModal(true));
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
            <CCardHeader>Manage Lifestyle</CCardHeader>
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
                      dispatch(showAddLifestyleModal(true));
                      setSelectedId(null);
                    }}
                  >
                    <span className="add-icon">Add Lifestyle</span>
                  </CButton>
                </CCol>
                <div>
                  <AddLifestyleComponent
                    show={addLifestyleModalShow}
                    onClose={() => dispatch(showAddLifestyleModal(false))}
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
                  {lifestyle_Data.lifestyleList &&
                  lifestyle_Data.lifestyleList.length > 0 ? (
                    <CCard>
                      <DataTable
                        columns={columns}
                        data={lifestyle_Data.lifestyleList}
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
              {/* {JSON.stringify(lifestyle_Data.lifestyleList)} */}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <React.Fragment>
        <UpdateLifestyleComponent
          show={updateLifestyleModalShow}
          onClose={() => dispatch(showUpdateLifestyleModal(false))}
          imagepath={imagePath}
          selectedid={selectedId}
          perpage={perPage}
          mypage={myPage}
          inputvalue={inputValue}
        />
      </React.Fragment>
      <React.Fragment>
        <DeleteLifestyleComponent
          show={deleteModalShow}
          onClose={() => dispatch(showDeleteLifestyleModal(false))}
          imagepath={imagePath}
          selectedid={selectedId}
          perpage={perPage}
          mypage={myPage}
          inputvalue={inputValue}
        />
      </React.Fragment>
    </>
  );
};

export default ManageLifestylePage;
