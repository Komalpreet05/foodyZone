import { useEffect, useState } from "react";
import styled from "styled-components"

const BASE_URL = "http://localhost:9000/";

const App = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(BASE_URL);
      const json = await res.json();
      console.log(json);
      setData(json);
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


  if (error) return <div>{error}</div>
  if (loading) return <div>Loading...</div>

  return <Container>
    <TopContainer>
      <div className="logo">
        <img src="/images/logo.svg" alt="logo" />
      </div>

      <div className="search">
        <input type="text" placeholder="Search Food" />
      </div>
    </TopContainer>

    <FilterContainer>
      <Button>All</Button>
      <Button>Breakfast</Button>
      <Button>Lunch</Button>
      <Button>Dinner</Button>
    </FilterContainer>

    <FoodCardsContainer>
      <FoodCards>

      </FoodCards>
    </FoodCardsContainer>
  </Container>;
};

export default App;

const Container = styled.div`
background-color: #323334;
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
`;

const FoodCardsContainer = styled.div`
background-image: url("/images/bg.png");
background-size: cover;
height: calc(100vh - 210px);
`

const FoodCards = styled.div``