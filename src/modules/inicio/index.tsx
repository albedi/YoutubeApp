import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import Player from "../../components/Player";
import { fndYVideos, setToFind } from "./reducers/actions";
import logo from "../../logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const MUTXT_DEFAULT = "Use keywords to find a video";

function stMap(state: any, props: any) {
  const stInicio = state.mdInicio;
  props.state = stInicio;
  return stInicio;
}

interface Props {
  state: { counter: number };
}

const MdInicio = ({ state }: Props) => {
  // Select elements from State
  const {
    error = undefined,
    loading = false,
    toFind = true,
    item = undefined,
  } = { ...state };

  const [query, setQuery] = useState(null);
  const [showErr, setShowErr] = useState(true);
  const [counter, setCounter] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) setShowErr(true);
  }, [error]);

  useEffect(() => {
    if (!counter) return;
    const timer = setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    if (toFind && query && !counter && !loading) dispatch(fndYVideos(query));
  });

  const muText: string = counter
    ? `${counter} seconds`
    : loading
    ? "searching one video"
    : MUTXT_DEFAULT;

  const handleKeyDown = (ev: any) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
    }
  };

  const handleChange = (ev: any) => {
    dispatch(setToFind(true));
    setQuery(ev.target.value);
    setCounter(3);
  };

  const rowError = error ? (
    <Row>
      <Col>
        <Alert
          variant="danger"
          show={showErr}
          onClose={() => setShowErr(false)}
          transition={false}
          dismissible
        >
          <div dangerouslySetInnerHTML={{ __html: error! }}></div>
        </Alert>
      </Col>
    </Row>
  ) : null;

  return (
    <div className="App">
      <Container fluid>
        <Row className="header">
          <Col xs="auto">
            <img src={logo} className="App-logo" alt="logo" />
          </Col>
          <Col className="myName">
            <b>Edgar Becerra</b>
            <br />
            EBecerra@ersoluiones.mx
            <br />
            (+52 1) 442 144 9566
          </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
                <Form.Text className="text-muted">{muText}</Form.Text>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        {rowError}
        <Row>
          <Col>
            <Player item={item} query={query} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default connect(stMap)(MdInicio);
