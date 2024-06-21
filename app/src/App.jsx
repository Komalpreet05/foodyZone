import { useEffect, useState } from "react";
import styled from "styled-components"
import SearchResult from "./components/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedBtn, setSelectedBtn] = useState("all");
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(BASE_URL);
      const json = await res.json();
      // console.log(json);
      setData(json);
      setFilteredData(json);
    }
    catch (err) {
      console.log(err);
      setData([]);
      setError("Error" + err);
    }
    setLoading(false);
  }

  // fetchData();

  useEffect(() => {
    fetchData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);
    if (searchValue == "") {
      setFilteredData([]);
    }

    const filter = data.filter((food) => food.name.toLowerCase().includes(searchValue.toLowerCase()))
    console.log(searchValue);
    console.log(filter);
    setFilteredData(filter);

    // if (searchValue) {
    //   const filter = data.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));
    //   setFilteredData(filter);
    // }
    // else {
    //   setFilteredData(data)
    // }
  }

  const filteredFood = (type) => {
    console.log(type);
    if (type == "all") {
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }
    console.log(selectedBtn);

    const filteredN = data.filter((item) => {
      // item.type.toLowerCase().includes(e.target.toLowerCase());
      // setSelectedBtn(item.type);
      console.log(item.type);
      console.log(type);
    })

    console.log(filteredN);

  }

  // console.log(data);

  if (error) return <div>{error}</div>
  if (loading) return <div>Loading...</div>

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/images/logo.svg" alt="logo" />
          </div>

          <div className="search">
            <input type="text" placeholder="Search Food" onChange={searchFood} />
          </div>
        </TopContainer>

        <FilterContainer>
          <Button onClick={filteredFood}>All</Button>
          <Button onClick={filteredFood}>Breakfast</Button>
          <Button>Lunch</Button>
          <Button>Dinner</Button>
        </FilterContainer>



      </Container>
      <SearchResult data={filteredData} />
    </>)
};

export default App;

export const Container = styled.div`
/* background-color: #323334; */
max-width: 1200px;
margin: 0 auto;
`

const TopContainer = styled.section`
min-height: 140px;
display: flex;
justify-content: space-between;
align-items: center;
padding: 16px;

.search{
  input{
    background-color: transparent;
    border: 1px solid red;
    color: white;
    border-radius: 5px;
    height: 40px;
    font-size: 16px;
    padding: 0 10px;
  }
}

`

const FilterContainer = styled.div`
display: flex;
justify-content: center;
gap: 12px;
padding-bottom: 40px;

`

export const Button = styled.button`
  background: ${({ isSelected }) => (isSelected ? "#f22f2f" : "#ff4343")};
  outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#ff4343")};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #f22f2f;
  }
`

