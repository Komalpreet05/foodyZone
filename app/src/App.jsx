import { useEffect, useState } from "react";
import styled from "styled-components"
import SearchResult from "./components/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const btns = ["All", "Breakfast", "Lunch", "Dinner"];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedBtn, setSelectedBtn] = useState("all");

  const [likedFood, setLikedFood] = useState([]);
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(BASE_URL);
      const json = await res.json();
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
  }

  const filteredFood = (e) => {
    if (e.target.innerText == "All") {
      setFilteredData(data);
      setSelectedBtn("All");
      return;
    }

    const filteredN = data?.filter((item) => item.type.toLowerCase().includes(e.target.innerText.toLowerCase())
    )

    console.log(filteredN);

    setFilteredData(filteredN);
    setSelectedBtn(e.target.innerText);

  }

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
          {
            btns.map((b) => <Button isSelected={selectedBtn == b} onClick={filteredFood}>{b}</Button>)
          }
        </FilterContainer>



      </Container>
      <SearchResult data={filteredData} likedFood={likedFood} setLikedFood={setLikedFood} />
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

@media (0 < width <600px){
  flex-direction: column;
  /* height: 60px; */
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

