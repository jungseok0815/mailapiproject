import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import LandingPage from "../components/views/Landing/LandingPage";
import MapContainer from "../components/views/Landing/Sections/MapContainer";
import "./Welcome.css";

function Welcome() {
  const [searchPlace, setSearchPlace] = useState(""); 
  const [searchHistory, setSearchHistory] = useState([]); 
  const [searchResult, setSearchResult] = useState(null); 
  const [currentPage, setCurrentPage] = useState("landing");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchPlace = (e) => {
    setSearchPlace(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchHistory([...searchHistory, searchPlace]);
    setSearchResult(searchPlace);
    setSearchPlace("");
    setCurrentPage("map");
  };

  const handleGoToMyPage = (event) => {
    event.preventDefault();
    setCurrentPage("mypage");
  };

  const handleGoToHomePage = () => {
    if (currentPage !== "landing") {
      navigate("/welcome");
    }
  };

  const handleLogout = () => {
    axios
      .post("http://localhost:8080/api/logout")
      .then(() => {
        window.location.replace("/");
      })
      .catch((error) => {
        console.error("로그아웃 오류:", error);
        alert("로그아웃에 실패했습니다.");
      });
  };

  useEffect(() => {
    return () => {
      window.onunload = () => {
        window.location.replace("/");
      };
    };
  }, []); // 필요한지 확인

  useEffect(() => {
    if (currentPage === "mypage") {
      localStorage.setItem("bookmarks", JSON.stringify(searchResult));
    }
  }, [currentPage, searchResult]);

  useEffect(() => {
    const handlePopstate = () => {
      if (location.pathname === "/welcome" && currentPage !== "map") {
        setCurrentPage("map");
      }
    };

    window.onpopstate = handlePopstate;

    return () => {
      window.onpopstate = null;
    };
  }, [currentPage, location.pathname]);

  let renderedContent;

  if (currentPage === "landing") {
    renderedContent = (
      <LandingPage
        onSubmit={handleSubmit}
        onInputChange={handleSearchPlace}
        searchPlace={searchPlace}
      />
    );
  } else if (currentPage === "map") {
    renderedContent = (
      <MapContainer
        searchPlace={searchResult}
        onGoToMyPage={handleGoToMyPage}
      />
    );
  } else {
    renderedContent = <h1>My Page Content</h1>;
  }

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <a href="/welcome" className="logo-link" onClick={handleGoToHomePage}>
            <img src="./Allways.png" alt="Allways Logo" className="logo" />
            <span className="site-name" onClick={handleGoToHomePage}>
              Allways
            </span>
          </a>
        </div>
        <div className="navbar-right">
          <a href="/mypage" className="mypage-link" onClick={handleGoToMyPage}>
            마이페이지
          </a>
        </div>
        <div className="navbar-right">
          <a href="/" className="logout" onClick={handleLogout}>
            로그아웃
          </a>
        </div>
      </nav>
      {renderedContent}
      <div>
        <h3>검색 기록:</h3>
        <ul>
          {searchHistory.map((search, index) => (
            <li key={index}>{search}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Welcome;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import LandingPage from "../components/views/Landing/LandingPage";
// import MapContainer from "../components/views/Landing/Sections/MapContainer";
// // import MyPage from '../components/views/Landing/Sections/MyPage';
// import "./Welcome.css";

// function Welcome() {
//   const [searchPlace, setSearchPlace] = useState("");
//   const [searchHistory, setSearchHistory] = useState([]);
//   const [searchResult, setSearchResult] = useState(null);
//   const [currentPage, setCurrentPage] = useState("landing");

//   const handleSearchPlace = (e) => {
//     setSearchPlace(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSearchHistory([...searchHistory, searchPlace]);
//     setSearchResult(searchPlace);
//     setSearchPlace("");
//     setCurrentPage("map"); // Change current page to 'map' after submitting the search
//   };

//   const handleGoToMyPage = (event) => {
//     event.preventDefault(); // 기본 동작인 페이지 이동을 막음
//     setCurrentPage("mypage");
//   };

//   const handleGoToHomePage = () => {
//     setCurrentPage("landing");
//     window.location = "/"; // Navigate back to the homepage using window.location
//   };

//   const handleLogout = () => {
//     // 세션 삭제 요청
//     axios
//       .post("http://localhost:8080/api/logout")
//       .then(() => {
//         // 세션 삭제 성공 시 페이지 이동
//         window.location.replace("/");
//       })
//       .catch((error) => {
//         console.error("로그아웃 오류:", error);
//         alert("로그아웃에 실패했습니다.");
//       });
//   };

//   useEffect(() => {
//     // 페이지 컴포넌트가 언마운트될 때에도 캐시 제어 헤더 설정
//     return () => {
//       window.onunload = () => {
//         window.location.replace("/");
//       };
//     };
//   }, []);

//   useEffect(() => {
//     if (currentPage === "mypage") {
//       localStorage.setItem("bookmarks", JSON.stringify(searchResult));
//     }
//   }, [currentPage, searchResult]);

//   let renderedContent;

//   if (currentPage === "landing") {
//     renderedContent = (
//       <LandingPage
//         onSubmit={handleSubmit}
//         onInputChange={handleSearchPlace}
//         searchPlace={searchPlace}
//       />
//     );
//   } else if (currentPage === "map") {
//     renderedContent = (
//       <MapContainer
//         searchPlace={searchResult}
//         onGoToMyPage={handleGoToMyPage}
//       />
//     );
//   } else {
//     // renderedContent = <MyPage />;
//     // Add your custom component or logic for the 'mypage' page
//     renderedContent = <h1>My Page Content</h1>;
//   }

//   return (
//     <div>
//       <nav className="navbar">
//         <div className="navbar-left">
//           <a href="/" className="logo-link" onClick={handleGoToHomePage}>
//             <img src="./Allways.png" alt="Allways Logo" className="logo" />
//             <span className="site-name" onClick={handleGoToHomePage}>

//               Allways
//             </span>
//           </a>
//         </div>
//         <div className="navbar-right">
//           <a href="/mypage" className="mypage-link" onClick={handleGoToMyPage}>
//             마이페이지
//           </a>
//         </div>
//         <div className="navbar-right">
//           <a href="/" className="logout" onClick={handleLogout}>
//             로그아웃
//           </a>
//         </div>
//       </nav>
//       {renderedContent}
//       <div>
//         <h3>검색 기록:</h3>
//         <ul>
//           {searchHistory.map((search, index) => (
//             <li key={index}>{search}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Welcome;
