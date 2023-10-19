import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReadRoomReservation from "./ReadRoomReservation";

const ReadRoomDetail = ({num}) => {
    return (
        <div>
            제 {num} 열람실
            <Container>
                <Row>
                    <Col md={1}>
                        <ReadRoomReservation seat={1}/>
                    </Col>
                    <Col md={1}>
                        <ReadRoomReservation seat={2}/>
                    </Col>
                    <Col md={1}>
                        <ReadRoomReservation seat={3}/>
                    </Col>
                </Row>
                <Row>
                    <Col md={1}>
                        <ReadRoomReservation seat={4}/>
                    </Col>
                    <Col md={1}>
                        <ReadRoomReservation seat={5}/>
                    </Col>
                    <Col md={1}>
                        <ReadRoomReservation seat={6}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ReadRoomDetail;
