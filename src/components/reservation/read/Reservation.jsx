import React, { useState } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import ReservationModal from './ReservationModal';

const seats = Array.from({ length: 20 }).map((_, i) => ({ id: i + 1, reserved: false }));

function Reservation() {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [selectedSeat1, setSelectedSeat1] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const handleSeatClick = (seat) => {
    if (!seat.reserved) {
      setSelectedSeat(seat.id);
    }
  };

  const handleReserve = () => {
    if (selectedSeat) {
      seats[selectedSeat - 1].reserved = true;
      setSelectedSeat(null);
    }
  };

  const handleButtonClick = (roomNumber) => {
    setSelectedSeat(roomNumber);
  };

  return (
    <Container style={{ maxWidth: '600px', marginTop: '50px' }}>
      <Card className="p-4 shadow-sm">
        <h2 className="text-center mb-4">독서실 예약</h2>
        <Row className="mb-4">
          {seats.map((seat) => (
            <Col xs={3} className="mb-2" key={seat.id}>
              <div 
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: seat.reserved ? '#ddd' : selectedSeat === seat.id ? '#FFD700' : '#4CAF50',
                  borderRadius: '8px',
                  cursor: seat.reserved ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.3s',
                  height: '40px'
                }}
                onClick={() => handleSeatClick(seat)}
              >
                {seat.id}
              </div>
            </Col>
          ))}
        </Row>
        <Button 
          onClick={()=>handleButtonClick(true)} 
          disabled={!selectedSeat}
          block
          variant={selectedSeat ? 'success' : 'secondary'}
        >
          예약하기
        </Button>
      </Card>
      <ReservationModal show={modalShow} no={selectedSeat} time={currentTime} onHide={() => setModalShow(false)} />
    </Container>
  );
}

export default Reservation;