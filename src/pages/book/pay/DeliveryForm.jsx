import React from "react";
import { Form, Row } from "react-bootstrap";

const DeliveryForm = () => {
  return (
    <Form>
      <div class="mb-3">
        <label>이름</label>
        <input type="text" class="form-control" id="exampleFormControlInput1" />
      </div>
      <div class="mb-3">
        <label>연락처</label>
        <input type="text" class="form-control" id="exampleFormControlInput1" />
      </div>
      <span>주소</span>
      <br />
      <input type="text" name="u_zipcode" placeholder="우편번호" />
      <input
        type="button"
        id="searchAddr"
        onclick="execDaumPostcode()"
        value="우편번호 찾기"
      />
      &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
      <br />
      <input type="text" name="u_main_addr" placeholder="도로명주소" />
      <br />
      <input type="text" name="u_detail_addr" placeholder="상세주소" />
      <br />
    </Form>
  );
};

export default DeliveryForm;
