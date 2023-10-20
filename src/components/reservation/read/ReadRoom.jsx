import React, {useState} from "react";
import { ButtonGroup, Button } from 'react-bootstrap';
import ReadRoomReservation from "./ReadRoomReservation";
import Reservation from "./Reservation";

const ReadRoom = () => {

    const [readRoom, setReadRoom] = useState(1);

    const handleChangeRoom = (no) => {
        setReadRoom(no);
      };

    return (
        <div>
            <div style={{padding: '20px', display: 'flex', justifyContent: 'center' }}>
                <ButtonGroup>
                    <Button onClick={() => handleChangeRoom(1)}
                        style={{
                            borderRadius: '20px', 
                            margin: '0 10px', 
                            width: '120px', 
                            background: readRoom ==1 ? '#fd8a69':'#FECCBE',
                            border:'none'
                        }}
                    >
                        <strong>1</strong> 열람실
                    </Button>
                    <Button onClick={() => handleChangeRoom(2)}
                        style={{ 
                            borderRadius: '20px', 
                            margin: '0 10px', 
                            width: '120px', 
                            background: readRoom == 2 ? '#fd8a69':'#FECCBE',
                            border:'none'
                        }}
                    >
                        <strong>2</strong> 열람실
                    </Button>
                    <Button onClick={() => handleChangeRoom(3)}
                        style={{ 
                            borderRadius: '20px', 
                            margin: '0 10px', 
                            width: '120px', 
                            background: readRoom == 3 ? '#fd8a69':'#FECCBE',
                            border:'none'
                        }}
                    >
                        <strong>3</strong> 열람실
                    </Button>
                </ButtonGroup>
            </div>
            <div>
                {readRoom==1 ?(<Reservation/>):(<div></div>)}
                {readRoom==2 ?(<Reservation/>):(<div></div>)}
                {readRoom==3 ?(<Reservation/>):(<div></div>)}
            </div>
        </div>
    );
}

export default ReadRoom;
