/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  InputGroup,
  Form,
  Button,
  Collapse,
  Modal,
} from "react-bootstrap";
import TrashIcon from "./assets/svg/trash-solid.svg";
import HeartIcon from "./assets/svg/heart-solid.svg";
import LoveIcon from "./assets/svg/heart.svg";
import UpIcon from "./assets/svg/chevron-up-solid.svg";
import DownIcon from "./assets/svg/chevron-down-solid.svg";
import Img1 from "./assets/img/blue.jpg";
import Img2 from "./assets/img/red.jpg";

import { getItem, editItem, deleteItem } from "./redux/actions";

function App() {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState("");
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(null);
  const { carts } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    renderCarts();
  }, []);

  useEffect(() => {
    renderTotal();
  }, [carts]);

  const renderCarts = () => {
    const initiateCart = [
      {
        name: "Blue Denim Shirt",
        img: Img1,
        store: "Denim",
        qty: 1,
        price: 17.99,
        attribute: {
          color: "blue",
          size: "M",
        },
        wishlist: false,
      },
      {
        name: "Red Hoodie",
        img: Img2,
        store: "Hoodie Red",
        qty: 1,
        price: 35.99,
        attribute: {
          color: "red",
          size: "M",
        },
        wishlist: false,
      },
    ];
    const payload = {
      carts: initiateCart,
    };

    dispatch(getItem(payload));
  };

  const renderTotal = () => {
    let arrPrice = [];
    if (carts && carts.length > 0) {
      for (let item of carts) {
        let total = item.qty * item.price;
        arrPrice.push(Number(total));
      }
      const totalPrice = arrPrice.reduce((a, b) => a + b);
      if (show) {
        const discPrice = (totalPrice.toFixed(2) * 10) / 100;
        const fixPrice = totalPrice.toFixed(2) - discPrice;
        setTotal(fixPrice.toFixed(2));

        return;
      }
      setTotal(totalPrice.toFixed(2));

      return;
    }
    setTotal(0);
  };

  const clickWishlist = (val, idx) => {
    let currentData = [...carts];
    currentData[idx].wishlist = !val;
    const payload = {
      carts: currentData,
    };

    dispatch(editItem(payload));
  };

  const doDelete = () => {
    let currentData = [...carts];
    currentData.splice(selected, 1);
    const payload = {
      carts: currentData,
    };

    dispatch(deleteItem(payload));

    setAlert(false);
    setSelected(null);
  };

  const increaseQty = (val, idx) => {
    let currentData = [...carts];
    currentData[idx].qty = val + 1;
    const payload = {
      carts: currentData,
    };

    dispatch(editItem(payload));
  };

  const decreaseQty = (val, idx) => {
    let currentData = [...carts];
    currentData[idx].qty = val !== 1 ? val - 1 : val;
    const payload = {
      carts: currentData,
    };

    dispatch(editItem(payload));
  };

  const enterCode = (e) => {
    setShow(discount);
    setDiscount("");
    setOpen(false);

    e.preventDefault();
  };

  return (
    <Container className="py-4">
      <h5 className="mb-4 text-center">Shopping Cart</h5>
      <Row>
        <Col md={8} sm={12} className="mb-2">
          <Card className="p-4">
            Cart (2 items)
            {carts &&
              carts.length > 0 &&
              carts.map((val, idx) => (
                <Row key={idx} className="py-3 product">
                  <Col>
                    <div
                      className="product-img"
                      style={{
                        backgroundImage: `url(${val.img})`,
                      }}
                    />
                  </Col>
                  <Col lg={10} md={12} sm={12}>
                    <div className="d-flex justify-content-between">
                      <div className="fw-bold">
                        {val.name}
                        <p
                          className="uppercase mb-0"
                          style={{
                            fontSize: 10,
                            fontWeight: 400,
                          }}
                        >
                          {val.store}
                        </p>
                      </div>
                      <InputGroup
                        style={{
                          maxWidth: 120,
                        }}
                      >
                        <Button
                          variant="outline-dark"
                          size="sm"
                          className="btn-qty"
                          onClick={() => decreaseQty(val.qty, idx)}
                        >
                          -
                        </Button>
                        <Form.Control
                          className="text-center"
                          style={{
                            lineHeight: 0,
                          }}
                          value={val.qty}
                          readOnly
                        />
                        <Button
                          variant="outline-dark"
                          size="sm"
                          className="btn-qty"
                          onClick={() => increaseQty(val.qty, idx)}
                        >
                          +
                        </Button>
                      </InputGroup>
                    </div>
                    {Object.keys(val.attribute).map((key) => (
                      <div
                        key={key}
                        className="uppercase product-attribute"
                        style={{
                          fontSize: 12,
                        }}
                      >
                        {`${key}: ${val.attribute[key]}`}
                      </div>
                    ))}

                    <div
                      className="d-flex justify-content-between mt-3 align-items-center"
                      style={{
                        fontSize: 12,
                      }}
                    >
                      <div className="d-flex">
                        <div
                          className="d-flex me-3 align-items-center"
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setAlert(!alert);
                            setSelected(idx);
                          }}
                        >
                          <img src={TrashIcon} alt="delete" className="icon" />
                          <span className="ms-1 uppercase">Delete Item</span>
                        </div>
                        {val.wishlist ? (
                          <div
                            className="d-flex align-items-center"
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => clickWishlist(val.wishlist, idx)}
                          >
                            <img
                              src={LoveIcon}
                              alt="wishlist"
                              className="icon"
                            />
                            <span className="ms-1 uppercase">
                              Remove from wish list
                            </span>
                          </div>
                        ) : (
                          <div
                            className="d-flex align-items-center"
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => clickWishlist(val.wishlist, idx)}
                          >
                            <img
                              src={HeartIcon}
                              alt="wishlist"
                              className="icon"
                            />
                            <span className="ms-1 uppercase">
                              Move to wish list
                            </span>
                          </div>
                        )}
                      </div>
                      <div
                        className="fw-bold"
                        style={{
                          fontSize: 18,
                        }}
                      >
                        ${(val.price * val.qty).toFixed(2)}
                      </div>
                    </div>
                  </Col>
                </Row>
              ))}
            {(!carts || carts?.length === 0) && (
              <Row className="py-3 text-center">
                <Col>*** No data found ***</Col>
              </Row>
            )}
          </Card>
        </Col>
        <Col sm={12} md={4}>
          <Card className="p-4 mb-2">
            <b>The total amount of</b>
            <div
              className="d-flex justify-content-between mt-3"
              style={{
                fontSize: 14,
              }}
            >
              Temporary ammount
              <span>${total}</span>
            </div>
            {show && (
              <div
                className="d-flex justify-content-between mt-1"
                style={{
                  fontSize: 14,
                }}
              >
                Discount
                <span>
                  10% (<b className="uppercase">{show}</b>)
                </span>
              </div>
            )}
            <div
              className="d-flex justify-content-between mt-1 border-bottom pb-3"
              style={{
                fontSize: 14,
              }}
            >
              Shipping
              <span>Free</span>
            </div>
            <div
              className="d-flex justify-content-between fw-bold pt-2 align-items-center"
              style={{
                fontSize: 14,
              }}
            >
              The total amount of <br />
              (including VAT)
              <span>${total}</span>
            </div>
            <Button variant="primary" className="uppercase fw-semibold mt-3">
              Go to Checkout
            </Button>
          </Card>
          <Card className="p-3">
            <div
              className="d-flex justify-content-between align-items-center"
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                setOpen(!open);
                setDiscount("");
              }}
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              Add a discount code (optional)
              {open ? (
                <img src={UpIcon} alt="down" className="icon" />
              ) : (
                <img src={DownIcon} alt="down" className="icon" />
              )}
            </div>
            <Collapse in={open} className="mt-2">
              <div id="example-collapse-text">
                <Form.Control
                  type="text"
                  placeholder="Enter code"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
                <Button
                  variant="dark"
                  size="sm"
                  className="mt-2 w-100"
                  onClick={enterCode}
                >
                  Enter
                </Button>
              </div>
            </Collapse>
          </Card>
        </Col>
      </Row>

      <Modal
        show={alert}
        onHide={() => {
          setAlert(!alert);
          setSelected(null);
        }}
        size="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title className="fs-6">Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>Are you sure to delete this item?</p>
          <div className="d-flex justify-content-center pt-2">
            <Button variant="dark" onClick={() => doDelete()} className="me-2">
              Yes, sure
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setAlert(!alert);
                setSelected(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default App;
