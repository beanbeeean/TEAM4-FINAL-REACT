// import React, { useState } from "react";
// import { Modal, Button } from "react-bootstrap";
// import stylesAdmin from "../../css/book/ChangeStateModal.module.css";

// const ChangeStateModal = (props) => {
//   const [show, setShow] = useState(false);
//   const [cnt, setCnt] = useState(1);

//   const decreaseCnt = () => {
//     console.log("decreaseCnt");
//     if (cnt > 1) {
//       setCnt(cnt - 1);
//     }
//   };

//   const increaseCnt = () => {
//     console.log("increaseCnt");
//     if (cnt < 5) {
//       setCnt(cnt + 1);
//     }
//   };

//   const onChange = (e) => {
//     console.log("onChange");

//     const newValue = parseInt(e.target.value);

//     if (!isNaN(newValue) && newValue >= 1) {
//       setCnt(newValue);
//     }
//   };

//   return (
//     <Modal
//       {...props}
//       size="md"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           잭과 콩나물 (15035)
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <div className={stylesAdmin.count}>
//           <span>도서 수량</span>
//           <input type="button" value="-" onClick={decreaseCnt}></input>
//           <input type="text" value={cnt} onChange={onChange}></input>
//           <input type="button" value="+" onClick={increaseCnt}></input>
//         </div>
//         <div className={stylesAdmin.book_state}>
//           <span>도서 상태</span>
//           <select>
//             <option value="1">사용가능</option>
//             <option value="2">사용불가</option>
//           </select>
//         </div>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button className={stylesAdmin.cout_btn}>변경하기</Button>
//         <Button className={stylesAdmin.cancle_btn} onClick={props.onHide}>
//           닫기
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default ChangeStateModal;

import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import stylesAdmin from "../../css/book/ChangeStateModal.module.css";

const ChangeStateModal = (props) => {
  console.log("props : ", props);
  const [cnt, setCnt] = useState(props.stock);
  const [bookState, setBookState] = useState("1");

  const decreaseCnt = () => {
    if (cnt > 1) {
      setCnt(cnt - 1);
    }
  };

  const increaseCnt = () => {
    if (cnt < 5) {
      setCnt(cnt + 1);
    }
  };

  const onChange = (e) => {
    const newValue = parseInt(e.target.value);

    if (!isNaN(newValue) && newValue >= 1) {
      setCnt(newValue);
    }
  };

  const onBookStateChange = (e) => {
    setBookState(e.target.value);
  };

  const handleSave = () => {
    props.onSave({ cnt, bookState });
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          잭과 콩나물 (15035)
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={stylesAdmin.count}>
          <span>도서 수량</span>
          <input type="button" value="-" onClick={decreaseCnt}></input>
          <input type="text" value={cnt} onChange={onChange}></input>
          <input type="button" value="+" onClick={increaseCnt}></input>
        </div>
        <div className={stylesAdmin.book_state}>
          <span>도서 상태</span>
          <select value={bookState} onChange={onBookStateChange}>
            <option value="1">사용가능</option>
            <option value="2">사용불가</option>
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className={stylesAdmin.cout_btn} onClick={handleSave}>
          변경하기
        </Button>
        <Button className={stylesAdmin.cancle_btn} onClick={props.onHide}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeStateModal;
