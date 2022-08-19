import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import {
  deleteEmployee,
  getAllEmployee,
  getAllInitialEmployees,
  resetDetails,
  singleEmployeeData,
} from "../slices/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AddUserModal from "./AddUserModal";
import { toast } from "react-toastify";
import { Circles } from "react-loader-spinner";
import { Audio } from "react-loader-spinner";
import Pagination from "react-responsive-pagination";
import Form from "react-bootstrap/Form";
import { useDebounce } from "use-debounce";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [addModal, setAddModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [sortBtn, setSortBtn] = useState(false);

  const pageSize = 7;
  const [text] = useDebounce(searchInput, 1000);

  useEffect(() => {
    dispatch(
      getAllEmployee(
        sortBtn
          ? {
              initialEntry: 0,
              finalEntry: pageSize,
              searchValue: searchInput,
              sortData: "id",
              orderType: "desc",
            }
          : { initialEntry: 0, finalEntry: pageSize, searchValue: searchInput }
      )
    );
  }, [text, sortBtn]);

  const notifyToast = () => toast("Employee deleted successfully!");

  const employeeData = useSelector((state) => state.employeeReducer.employees);
  const loadingStatus = useSelector((state) => state.employeeReducer.status);
  const getAllInitialData = useSelector(
    (state) => state.employeeReducer.initialUsers
  );
  const totalPages = Math.ceil(getAllInitialData.length / pageSize);
  console.log('t',totalPages);

  useEffect(() => {
    dispatch(getAllInitialEmployees());
  }, []);

  console.log("loadingStatus", loadingStatus);
  console.log("getAllInitialData", getAllInitialData);

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
    setTimeout(() => {
      dispatch(getAllEmployee({ initialEntry: currentPage * pageSize - pageSize,finalEntry: pageSize * currentPage, }));
      notifyToast();
    }, 500);
  };
  const userData = useSelector((state) => state.employeeReducer.singleEmployee);
  const employeeDetail = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
  };
  console.log("employeeData", employeeData);

  const handleEdit = (id) => {
    setAddModal(true);
    dispatch(singleEmployeeData(id));
  };
  const handleView = (id) => {
    dispatch(singleEmployeeData(id));
    navigate(`view/${id}`);
  };
  const handlePagination = (event) => {
    setCurrentPage(event);
    console.log("page", event);
    if (event === 1) {
      dispatch(
        getAllEmployee(
          sortBtn
            ? {
                initialEntry: 0,
                finalEntry: pageSize,
                sortData: "id",
                orderType: "desc",
              }
            : { initialEntry: 0, finalEntry: pageSize }
        )
      );
    } else {
      dispatch(
        getAllEmployee(
          sortBtn
            ? {
                initialEntry: event * pageSize - pageSize,
                finalEntry: pageSize * event,
                sortData: "id",
                orderType: "desc",
              }
            : {
                initialEntry: event * pageSize - pageSize,
                finalEntry: pageSize * event,
              }
        )
      );
    }
  };
  console.log("sortBtn", sortBtn);
  return (
    <div>
      <div className="my-4 d-flex align-items-center gap-3 justify-content-center ">
        <Button onClick={() => setAddModal(true)} variant="outline-primary">
          Add User
        </Button>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            placeholder="Enter employee"
          />
        </Form.Group>
      </div>
      <Table striped>
        <thead>
          <tr
            style={{ cursor: "pointer" }}
            onClick={() => setSortBtn(!sortBtn)}
          >
            <th>S.No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {loadingStatus === "pending" ? (
            <Audio
              height="80"
              width="80"
              radius="9"
              color="green"
              ariaLabel="three-dots-loading"
              wrapperStyle
              wrapperClass
            />
          ) : (
            employeeData.map((data, index) => {
              return (
                <tr
                  style={{ cursor: "pointer" }}
                  className="cursor-pointer"
                  onClick={() => handleView(data.id)}
                  key={index}
                >
                  <td>
                    {currentPage === 1 && sortBtn === true
                      ? getAllInitialData.length - index
                      : currentPage && sortBtn === true
                      ? getAllInitialData.length - index - pageSize
                      : currentPage === 1 && sortBtn === false
                      ? index + 1
                      : currentPage * pageSize - pageSize + 1 + index}
                  </td>
                  {/* <td>{currentPage===1 && sortBtn===true ?getAllInitialData.length-index :currentPage===1 && sortBtn===false ? index + 1 : currentPage*pageSize-pageSize+1+index }</td> */}
                  {/* <td>{currentPage===1 ? index+1 : currentPage*pageSize-pageSize+1+index}</td> */}
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>
                    <Button
                      onClick={(event) => {
                        event.stopPropagation();
                        handleEdit(data.id);
                      }}
                      variant="outline-primary"
                    >
                      Edit User
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(data.id);
                      }}
                      variant="outline-primary"
                    >
                      Delete User
                    </Button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
      <div className="py-4 d-flex justify-content-end ">
        <Pagination
          current={currentPage}
          total={totalPages}
          onPageChange={(event) => handlePagination(event)}
        />
      </div>
      {addModal && (
        <AddUserModal
          addModal={addModal}
          onHide={() => {
            setAddModal(false);
            dispatch(resetDetails());
          }}
          setAddModal={setAddModal}
          employeeDetail={employeeDetail}
          isLastPage={ currentPage === totalPages}
        />
      )}
    </div>
  );
};

export default Home;
