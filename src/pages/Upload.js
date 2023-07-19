import axios from "axios";
import React, { useState } from "react";

// 기본형 이미지 업로드 컴포넌트
const UploadFetch = () => {
  // 임시로 올려진 이미지 파일URL 을 출력한다.
  const [uploadImage, setUploadImage] = useState(null);

  const handleFileChange = async event => {
    // 수정: 파일을 전달할 주소
    const sendUrl = "/upload";

    // 수정: 전송할 키명
    const sendKye = "profile";

    // 파일은 배열 즉, files 로 전달됩니다.
    // 파일이 한 개인 경우 files[0] 에 해당 파일이 담겨 있습니다.
    const file = event.target.files[0];
    // console.log(file);

    // 전송할 데이터 객체 즉 객체 리터럴을 생성한다.
    // FormData 는 HTML 폼의 데이터로서,
    // 폼을 쉽게 전송하도록 도와주는 객체이다.
    // body에 객체를 넣어서 HTTP 전송을 한다.
    const formData = new FormData();
    // FormData 객체에 속성명:값을 추가한다.
    // 이경우 append() 메서드를 활용한다.
    formData.append(sendKye, file);
    // console.log(formData);
    try {
      const res = await fetch(sendUrl, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log("전송완료 : ", res);
      // 임시로 올려진 이미지를 미리보기하자.
      // 아래메소드는 blob(Binary Large Object) 을 생성한다.
      // blob 은 이진수로 데이터를 표현한다.
      setUploadImage(URL.createObjectURL(file));
    } catch (error) {
      console.log("업로드 실패 : ", error);
    }
  };
  return (
    <>
      <h3>기본형 이미지 업로드 </h3>
      <div>
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={handleFileChange}
        />
        {/* 꼭 업로드한 이미지를 확인 필요는 없습니다 */}
        {uploadImage && (
          <div>
            {uploadImage}
            <img src={uploadImage} alt="업로드이미지" />
          </div>
        )}
      </div>
    </>
  );
};

// 미리보기 업로드 컴포넌트
const UploadPreview = () => {
  // 이미지 미리보기 state
  const [uploadImage, setUploadImage] = useState(null);
  // 업로드하고 나서 컨텐츠 상 보여줄 이미지
  const [charImg, setCharImg] = useState(null);

  // 이미지 선택 처리 핸들러
  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      // 이미지가 임시파일로 웹브라우저에 로드완료되면
      reader.onloadend = () => {
        // state 변경한다.
        console.log(reader.result);
        setUploadImage(reader.result);
      };
      // 임시 파일을 읽어들인다.
      reader.readAsDataURL(file);
    }
  };
  // 임시 파일 지우기
  const handleFileRemove = () => {
    setUploadImage(null);
  };
  // 파일 업로드
  const handleFileUpload = async () => {
    // 수정 : 활용합니다.
    const sendUrl = "/upload";
    const sendKye = "profile";
    if (uploadImage) {
      const formData = new FormData();
      formData.append(sendKye, uploadImage);
      try {
        const res = await fetch(sendUrl, {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("전송완료 : ", res);
        // 서버가 정상적으로 업데이트 되고 나서 URL 줄때
        const serverStatus = res.status.toString();
        // console.log(serverStatus.charAt(0));
        if (serverStatus.charAt(0) === "2") {
          setCharImg("서버의 이미지 주소 URL");
        } else {
          // 데모 버전에서 프론트에서 처리
          setCharImg(uploadImage);
        }
      } catch (error) {
        console.log("데이터 전송 실패", error);
      }
    }
  };

  // 화면에 이미지 미리보기 보여주는 함수
  const renderImagePreview = () => {
    if (uploadImage) {
      return (
        <div>
          {uploadImage}
          <img src={uploadImage} alt="업로드이미지" />
          <button onClick={handleFileRemove}>지우기</button>
          <button onClick={handleFileUpload}>업로드</button>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <h3>미리보기 업로드</h3>
      <div>
        {/* 이미지 미리보기 출력 */}
        {renderImagePreview()}
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={handleFileChange}
        />
      </div>
      {charImg && (
        <div>
          <h4>사용자 캐릭터 이미지</h4>
          <span
            style={{
              display: "block",
              width: "50px",
              height: "50px",
              overflow: "hidden",
              background: "hotpink",
            }}
          >
            <img
              src={charImg}
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          </span>
        </div>
      )}
    </>
  );
};
// Axios 이미지 업로드 컴포넌트
const UploadAxios = () => {
  // 이미지 미리보기 state
  const [uploadImage, setUploadImage] = useState(null);
  // 업로드하고 나서 컨텐츠 상 보여줄 이미지
  const [charImg, setCharImg] = useState(null);

  // 이미지 선택 처리 핸들러
  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      // 이미지가 임시파일로 웹브라우저에 로드완료되면
      reader.onloadend = () => {
        // state 변경한다.
        // console.log(reader.result);
        setUploadImage(reader.result);
      };
      // 임시 파일을 읽어들인다.
      reader.readAsDataURL(file);
    }
  };
  // 임시 파일 지우기
  const handleFileRemove = () => {
    setUploadImage(null);
  };
  // 파일 업로드
  const handleFileUpload = async () => {
    // 수정 : 활용합니다.
    const sendUrl = "/upload";
    const sendKye = "profile";
    if (uploadImage) {
      const formData = new FormData();
      formData.append(sendKye, uploadImage);
      try {
        const res = await axios.post(sendUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // console.log("전송완료 : ", res);
        // 서버가 정상적으로 업데이트 되고 나서 URL 줄때
        const serverStatus = res.status.toString();
        console.log(serverStatus.charAt(0));
        if (serverStatus.charAt(0) === "2") {
          setCharImg("서버의 이미지 주소 URL");
        } else {
          // 데모 버전에서 프론트에서 처리
          setCharImg(uploadImage);
        }
      } catch (error) {
        console.log("데이터 전송 실패", error);
        // 데모 버전에서 프론트에서 처리
        setCharImg(uploadImage);
      }
    }
  };

  // 화면에 이미지 미리보기 보여주는 함수
  const renderImagePreview = () => {
    if (uploadImage) {
      return (
        <div>
          {uploadImage}
          <img src={uploadImage} alt="업로드이미지" />
          <button onClick={handleFileRemove}>지우기</button>
          <button onClick={handleFileUpload}>업로드</button>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <h3>미리보기 Axios 업로드</h3>
      <div>
        {/* 이미지 미리보기 출력 */}
        {renderImagePreview()}
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={handleFileChange}
        />
      </div>
      {charImg && (
        <div>
          <h4>사용자 캐릭터 이미지</h4>
          <span
            style={{
              display: "block",
              width: "50px",
              height: "50px",
              overflow: "hidden",
              background: "hotpink",
            }}
          >
            <img
              src={charImg}
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          </span>
        </div>
      )}
    </>
  );
};
// 이미지 업로드 & 미리보기 & json 데이터(글자) 전송
// 컴포넌트 생성
// : 대문자로 시작한다.
// : 별도의 파일로 생성시에는 파일명.js 로 한다.
// : 부가적으로 옛날에는 파일명.jsx 라고 명시했다.
// : 그런데, 지금은 파일명.jsx 라고 하지 않고도 적용된다.
// : 그래서 결론은 파일명.js 라고 하면 된다.
const UploadJson = () => {
  // js 타이핑
  // state 코딩 ===============
  // 1. 선택 이미지 파일에 대한 state
  //    파일이 초기값으로 셋팅
  const [selectFile, setSelectFile] = useState(null);

  // 2. json 내용에 대한 state
  const [jsonData, setJsonData] = useState("");

  // 3. 미리보기를 위한 state
  // 이미지의 경로는 문자열 <img src="문자열~~"
  const [previewImage, setPreviewImage] = useState("");

  // handle 코딩 (이벤트 핸들링 함수)
  // 1. 파일이 선택되었을 때 처리
  const handleChangeFile = event => {
    // console.log(event.target.files[0]);
    const file = event.target.files[0];
    // 파일을 react 변수에 담고
    setSelectFile(file);
    // 이미지 미리보기에서 보여준다.
    // 1. 복잡하게 처리(코딩이 길어지면)를 해야 하는 경우라면 함수를 만들고
    // 2. 정말 짧으면 굳이 함수를 만들어서 처리하지 않는다.
    // 미리보기 변수에 값(문자열)을 담는다.
    setPreviewImage(URL.createObjectURL(file));
  };
  // 2. json 내용이 입력되었을 때 처리
  const handleChangeJsonData = event => {
    // jsonData 변수에 값을 담고 있다.
    // 값을 jsonData 로 업데이트 하는 경우
    // 글자의 앞, 뒤 공백들은 제거해야 한다.
    // 그렇다고 중간의 공백을 제거하는 것은
    // 일반적으로는 맞지않다.
    // String 메서드 인 trim() 을 이용한다.
    setJsonData(event.target.value.trim());
  };
  // 3. submit 즉, form 의 내용을 전송할 때 처리
  //   : form 태그에서 submit 은 사용자가 확인 버튼을 누르면 실행된다.
  const handleSubmit = async event => {
    // form 에서 submit 이 발생하면
    // 웹브라우저가 갱신한다.
    // 기본 기능 막기
    event.preventDefault();
    console.log("submit 실행으로 데이터 처리시작.");
    // 필수 항목을 체크 한다. (기획서상의 문제)
    // : 이미지 파일이 있는지
    if (!previewImage) {
      alert("이미지를 선택해 주세요.");
    }
    // : 내용이 있는지
    // : 빈문자열인지 정규표현식으로 체크하자.
    // 정규표현식 패턴
    const pattern = /^\s+$/;
    // console.log(pattern.test(jsonData));
    if (pattern.test(jsonData) || jsonData === "") {
      alert("내용을 입력해주세요.");
    }

    //전송할 데이터 만들기
    const formData = new FormData();
    formData.append("profile", selectFile);
    //우선순위 2번
    // formData.append("data", JSON.stringify(jsonData));
    //우선순위 1번 Spring 개발에서는 조금 다르다.
    //우선순위1번 으로 먼저 시도 하고 문제있으면 2순위로 바꿔서
    const data = new Blob([jsonData], { type: "application/json" });
    formData.append("data", data);

    try {
      // 3.1. axios 로 전송(이미지, json 동시에 전송)
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(res);
    } catch (error) {
      console.log(error);
    }

    // 3.3. Spring 기반이면 조금 옵션이 필요합니다.
  };

  // 일반 함수 코딩

  // useEffect 코딩

  // return 에는 JSX 타이핑
  return (
    <>
      <h3>이미지, 이미지 미리보기 및 json 업로드</h3>
      {/* 미리보기 */}
      {/* 자바스크립트 변수 및 기타 코딩을 배치할때는 {내용} 형식유지 */}
      {previewImage && <img src={previewImage} alt="미리보기" />}
      {/* 데이터 선택 및 전송할 내용 입력 */}
      <form onSubmit={handleSubmit}>
        <div>
          {/* htmlFor="아이디" 는 html 태그의 for="아이디" 와 같다. */}
          <label htmlFor="gogo">1. 이미지 선택</label>
          <input
            type="file"
            accept="image/jpeg, image/png, image/gif"
            id="gogo"
            onChange={handleChangeFile}
          />
        </div>
        <div>
          <label htmlFor="jj">2. 내용 입력</label>
          {/* textarea 태그에는 절대로 타이핑시 Enter 키로 정리하지않는다. */}
          <textarea
            className="border"
            id="jj"
            value={jsonData}
            onChange={handleChangeJsonData}
          ></textarea>
        </div>
        <div>
          {/* form 태그에 button 기본 type=submit */}
          {/* 일반태그에 button 기본 type=button */}
          <button type="submit">확인</button>
        </div>
      </form>
    </>
  );
};

// 다중으로 이미지 업로드 하기
const UploadMulti = () => {
  // state 코딩 ===============
  const [selectFile, setSelectFile] = useState([]);
  const [jsonData, setJsonData] = useState("");
  const [previewImage, setPreviewImage] = useState([]);

  // handle 코딩 (이벤트 핸들링 함수)

  const handleChangeFile = event => {
    //여러개의 파일을 선택하므로
    //배열을 받아온다.
    const files = Array.from(event.target.files);

    //state 변수에
    //선택된 파일이 여러개 이므로 files배열을 저장한다.
    setSelectFile(files);

    //화면에 보여줄 이미지의 URL문자열을 만들어야한다.
    const imgPaths = files.map(item => URL.createObjectURL(item)); //주소 문자열을 여러개돌려주겠네
    setPreviewImage(imgPaths);
    // console.log(imgPaths);
    //배열로 다 교체중.
  };

  const handleChangeJsonData = event => {
    setJsonData(event.target.value.trim());
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log("submit 실행으로 데이터 처리시작.");

    if (!previewImage) {
      alert("이미지를 선택해 주세요.");
    }

    const pattern = /^\s+$/;

    if (pattern.test(jsonData) || jsonData === "") {
      alert("내용을 입력해주세요.");
    }

    //전송할 데이터 만들기
    const formData = new FormData();
    //파일이 여러개이다. 즉, 배열이다.
    // formData.append("profile", selectFile);

    selectFile.forEach((item, index) => {
      formData.append(`profile${index}`, item);
    });
    const data = new Blob([jsonData], { type: "application/json" });
    formData.append("data", data);

    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(res);
    } catch (error) {
      console.log(error);
    }

    // 3.3. Spring 기반이면 조금 옵션이 필요합니다.
  };

  // 일반 함수 코딩

  // useEffect 코딩

  // return 에는 JSX 타이핑
  return (
    <>
      <h3>이미지, 이미지 미리보기 및 json 업로드</h3>

      <div>
        {/* JSX를 return할때 (코딩) 하겠다. */}

        {previewImage.map((item, index) => (
          <img key={index} src={item} alt="그림" />
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="gogo">1. 이미지 선택</label>
          <input
            type="file"
            accept="image/jpeg, image/png, image/gif"
            id="gogo"
            onChange={handleChangeFile}
            multiple
          />
        </div>
        <div>
          <label htmlFor="jj">2. 내용 입력</label>

          <textarea
            className="border"
            id="jj"
            value={jsonData}
            onChange={handleChangeJsonData}
          ></textarea>
        </div>
        <div>
          <button type="submit">확인</button>
        </div>
      </form>
    </>
  );
};
const Upload = () => {
  return (
    <div className="p-6 mt-5 shadow rounded bg-white">
      <h2>이미지 업로드 기능 관련</h2>
      {/* <UploadFetch /> */}
      {/* <UploadPreview /> */}
      {/* <UploadAxios /> */}
      {/* <UploadJson /> */}
      <UploadMulti />
    </div>
  );
};

export default Upload;
