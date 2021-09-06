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
import {
  enableRestaurant,
  getAllRestaurantData,
  showAddRestaurantModal,
  showDeleteRestaurantModal,
  showUpdateRestaurantModal,
} from "../../../redux/actions/manageRestaurantAction";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import CIcon from "@coreui/icons-react";
import DeleteRestaurantModalComp from "./DeleteRestaurantModalComp";
import AddRestaurantModalComp from "./AddRestaurantModalComp";
import UpdatePasswordModalComp from "./UpdatePasswordModalComp";
import "./ManageRestaurantPage.scss";

const ManageRestaurantPage = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  // const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  // const [addRestaurantModalShow, setAddRestaurantModalShow] = useState(false);
  // const [updateRestaurantModalShow, setUpdateRestaurantModalShow] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [myPage, setMypage] = useState(1);

  const addRestaurantModalShow = useSelector(
    (state) => state.restaurant.showAddRestaurantModalData
  );
  const updateRestaurantModalShow = useSelector(
    (state) => state.restaurant.showUpdateRestaurantModalData
  );
  const deleteModalShow = useSelector(
    (state) => state.restaurant.showDeleteRestaurantModalData
  );

  // useEffect(()=>{
  //     dispatch(getAllRestaurantData({start:0}));
  // },[dispatch]);

  // pagination start
  useEffect(() => {
    setMypage(1);
    dispatch(
      getAllRestaurantData({ start: 0, length: perPage, search: inputValue })
    );
  }, [dispatch, inputValue, perPage]);

  const handlePerRowsChange = (newPerPage) => {
    setPerPage(newPerPage);
    // dispatch(getAllRestaurantData({start:0,length:perPage,search:inputValue}));
  };
  const handlePageChange = (page) => {
    setMypage(page);
    // console.log(page)
    dispatch(
      getAllRestaurantData({
        start: (page - 1) * perPage,
        length: perPage,
        search: inputValue,
      })
    );
  };
  //pagination end

  let allRestaurant_data = useSelector((state) => {
    return state.restaurant;
  });

  let { isLoading, restaurant_Data, totalrows } = allRestaurant_data;

  // const search=(datas)=>{
  //     return datas.filter(
  //         (data)=>data.email.toLowerCase().indexOf(inputValue)>-1
  //         );
  //     // const columns=datas[0]&&Object.keys(datas[0]);
  //     // return datas.filter((data)=>columns.some((column)=>data[column].toString().toLowerCase().indexOf(inputValue.toLowerCase())>-1));
  // }

  const columns = [
    { selector: "restaurants.name", name: "Name", sortable: true },
    { selector: "email", name: "Email", sortable: true },
    { selector: "restaurants.company", name: "Company", sortable: true },
    { selector: "restaurants.package", name: "Package", sortable: true },
    {
      selector: "restaurants.phoneNumber",
      name: "Mobile",
      sortable: true,
      cell: (row) => <span>{row.restaurants.phoneNumber}</span>,
    },
    // {
    //   selector: "updatedAt",
    //   name: "Updated At",
    //   sortable: true,
    //   cell: (row) => (
    //     <span>{moment(row.updatedAt).format(" Do MMMM, YYYY")}</span>
    //   ),
    // },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <CDropdown className="btn d-inline-block">
          <CDropdownToggle className="pinkbdr-btn" size="sm">
            Action
          </CDropdownToggle>
          <CDropdownMenu placement="left">
            <CDropdownItem
              onClick={() => {
                const payload = {
                  id: row.restaurants._id,
                  isActive: !row.isActive,
                };
                dispatch(enableRestaurant(payload));
              }}
            >
              <label class="c-switch c-switch-pill c-switch-danger">
                <input
                  type="checkbox"
                  class="c-switch-input"
                  checked={row.isActive}
                />
                <span class="c-switch-slider"></span>
              </label>
            </CDropdownItem>

            <CDropdownItem
              onClick={() => {
                dispatch(showUpdateRestaurantModal(true));
                setSelectedId(row._id);
              }}
            >
              Update Password
            </CDropdownItem>
            <CDropdownItem
              onClick={() => {
                dispatch(showDeleteRestaurantModal(true));
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
            <CCardHeader>Manager Restaurant</CCardHeader>
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
                      dispatch(showAddRestaurantModal(true));
                      setSelectedId(null);
                    }}
                  >
                    <span className="add-icon">Add Restaurant</span>
                  </CButton>
                </CCol>
                <div>
                  <AddRestaurantModalComp
                    show={addRestaurantModalShow}
                    onClose={() => dispatch(showAddRestaurantModal(false))}
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
                  {restaurant_Data.restaurantList &&
                  restaurant_Data.restaurantList.length > 0 ? (
                    <CCard>
                      <DataTable
                        columns={columns}
                        data={restaurant_Data.restaurantList}
                        highlightOnHover
                        overflowY
                        noHeader
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
              {/* {JSON.stringify(restaurant_Data.restaurantList)} */}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <React.Fragment>
        <UpdatePasswordModalComp
          show={updateRestaurantModalShow}
          onClose={() => dispatch(showUpdateRestaurantModal(false))}
          selectedid={selectedId}
          perpage={perPage}
          mypage={myPage}
          inputvalue={inputValue}
        />
      </React.Fragment>
      <React.Fragment>
        <DeleteRestaurantModalComp
          show={deleteModalShow}
          onClose={() => dispatch(showDeleteRestaurantModal(false))}
          selectedid={selectedId}
          perpage={perPage}
          mypage={myPage}
          inputvalue={inputValue}
        />
      </React.Fragment>
    </>
  );
};

export default ManageRestaurantPage;
