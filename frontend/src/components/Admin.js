import Cookies from "js-cookie";
import { useEffect, useMemo, useState } from "react";
import { Alert } from "reactstrap";
import AdminItemImpl from "./AdminItem";
export default function Admin() {
  const [SortBy, setSortBy] = useState("date");
  const [Checked, setChecked] = useState(false);
  const [Offset, setOffset] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [data, setData] = useState({ content: [{ query: "query" }] });
  const [IsAlertOpen, setIsAlertOpen] = useState(true)
  const login = Cookies.get("login");
  const token = login?.token;
  const email = login?.email;
  const options = useMemo(() => {
    return { headers: { Authorization: token, email: email } };
  }, [email, token]);
  useEffect(() => {
    let isMounted = true;
    fetch(
      `http://localhost:8080/api/query/?SortBy=${SortBy}&offset=${Offset}`,
      options
    )
      .then((res) => {
        if (isMounted) res.json().then((recdata) => setData(recdata));
      })
      .catch((err) => {
        if (isMounted) setData({});
      });
  }, [Offset, SortBy, options]);
  useEffect(() => {
    setIsLast(data.last);
    const back = document?.getElementById("back");
    const next = document?.getElementById("next");
    if (back === null || next === null) return;
    if (Offset === 0) {
      back.disabled = true;
    }
    if (Offset !== 0 && back.disabled === true) {
      back.disabled = false;
    }
    if (isLast) {
      next.disabled = true;
    }
    if (!isLast && next.disabled === true) {
      next.disabled = false;
    }
  }, [Offset, data.last, isLast]);

  const sortItems = e => {
    e.preventDefault();
    setSortBy(e.target.choice.value);
    setChecked(e.target.reverse.checked);
  };
  const dismissAlert=()=>setIsAlertOpen(false)
  return (
    <>
    <Alert color="danger" isOpen={ IsAlertOpen }>
    <div className="d-flex justify-content-between">
      <span className="alert-text">Hello Dr Alok</span>
      <button className="close btn btn-sm btn-danger" data-dismiss="alert" aria-label="Close" onClick={dismissAlert}>
       <span aria-hidden="true">X</span>
      </button>
    </div>
    </Alert>
    
      <div className="container">
        {/* search bar */}
        <form onSubmit={sortItems} className="d-flex">
          <select
            className="form-control me-2 width-30 justify-content-center"
            name="choice"
            id="cars"
          >
            <option value="date">Sort By...</option>
            <option value="date">date</option>
            <option value="id">id</option>
            <option value="query">query</option>
            <option value="email">email</option>
          </select>
          <div className="form-check no-border width-30 form-switch form-control">
            <label
              className="form-check-label "
              htmlFor="flexSwitchCheckDefault"
            >
              <b>Reverse Content</b>
            </label>
            <input
              className="form-check-input"
              type="checkbox"
              name="reverse"
              role="switch"
            />
          </div>
          <button className="btn btn-sm btn-outline-success" type="submit">
            Search
          </button>
        </form>
        {/* items  start*/}
        <AdminItemImpl
          query="Queries"
          isNotLink={true}
          number="S.no"
          email="Email"
          query_id="Query Id"
          date="Date"
        />
        {Checked &&
          data.content.reverse().map((elem) => {
            return (
              <AdminItemImpl
                isNotLink={false}
                number={data.content.indexOf(elem) + 1}
                email={elem.email}
                query_id={elem.id}
                key={elem.id}
                date={elem.date}
                query={elem.query}
              />
            );
          })}
        {/* items  start*/}
        {Checked ||
          data.content.map((elem) => {
            return (
              <AdminItemImpl
                isNotLink={false}
                number={data.content.indexOf(elem) + 1}
                email={elem.email}
                query_id={elem.id}
                key={elem.id}
                date={elem.date}
                query={elem.query}
              />
            );
          })}
        {/* items  end*/}
        <div className="d-flex justify-content-between">
          <button
            style={{ display: "block" }}
            onClick={() => {
              setOffset(Offset - 1);
            }}
            id="back"
            className="my-5 btn-sm btn btn-danger"
          >
            ←Back
          </button>
          <button
            style={{ display: "block" }}
            onClick={() => {
              setOffset(Offset + 1);
            }}
            id="next"
            className="my-5 btn-sm btn btn-danger"
          >
            Next→
          </button>
        </div>
      </div>
    </>
  );
}
