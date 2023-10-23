import React, { useState } from "react";
import { Form, Row } from "react-bootstrap";
import DaumPostcode, { useDaumPostcodePopup } from "react-daum-postcode";
import styles from "../../../css/book/cart/DeliveryForm.module.css";

const DeliveryForm = () => {
  //   const [modalShow, setModalShow] = useState(false);
  const scriptUrl =
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(scriptUrl);
  const [address, setAddress] = useState({
    fullAddress: "",
    zipcode: "",
  });

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setAddress({
      fullAddress,
      zipcode: data.zonecode, // 'zonecode' is the Daum Postcode's name for zipcode
    });
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <Form>
      <div class="mb-3">
        <label>이름</label>
        <br />
        <input type="text" class={styles.name} placeholder="이름" />
      </div>
      <div class="mb-3">
        <label>연락처</label>
        <br />
        <input type="text" class={styles.phone} placeholder="전화번호" />
      </div>
      <span>주소</span>
      <br />
      <input
        type="text"
        className={styles.zipcode}
        placeholder="우편번호"
        value={address.zipcode}
      />
      <input
        type="button"
        value="우편번호 찾기"
        onClick={handleClick}
        className={styles.search_zipcode}
      />
      &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
      <br />
      <input
        type="text"
        className={styles.address}
        placeholder="도로명주소"
        value={address.fullAddress}
      />
      <br />
      <input
        type="text"
        className={styles.detail_address}
        placeholder="상세주소"
      />
      <br />
    </Form>
  );
};

export default DeliveryForm;
