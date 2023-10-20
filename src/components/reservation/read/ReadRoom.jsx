import React, {useState} from "react";
import { ButtonGroup, Button } from 'react-bootstrap';
import ReadRoomReservation from "./ReadRoomReservation";
import Reservation from "./Reservation";

const ReadRoom = () => {

    return (
        <div>
            <div style={{padding: '20px', display: 'flex', justifyContent: 'center' }}>
                <ButtonGroup>
                    <Button 
                        style={{
                            borderRadius: '20px', 
                            margin: '0 10px', 
                            width: '120px', 
                            background: '#fd8a69',
                            border:'none'
                        }}
                    >
                        <strong>1</strong> 열람실
                    </Button>
                    <Button 
                        style={{ 
                            borderRadius: '20px', 
                            margin: '0 10px', 
                            width: '120px', 
                            background: '#FECCBE',
                            border:'none'
                        }}
                    >
                        <strong>2</strong> 열람실
                    </Button>
                    <Button 
                        style={{ 
                            borderRadius: '20px', 
                            margin: '0 10px', 
                            width: '120px', 
                            background: '#FECCBE',
                            border:'none'
                        }}
                    >
                        <strong>3</strong> 열람실
                    </Button>
                </ButtonGroup>
            </div>
            <div>
                <Reservation/>
            </div>
        </div>
    );
}

export default ReadRoom;
