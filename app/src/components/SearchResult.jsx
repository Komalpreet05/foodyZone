import React from 'react'
import styled from "styled-components"
import { BASE_URL, Button, Container } from '../App'
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { toast } from 'react-toastify';

const SearchResult = ({ data, likedFood, setLikedFood }) => {
  console.log("i am liked array" + likedFood + "test")
  const clickHandler = (name) => {
    if (likedFood.includes(name.toLowerCase())) {
      console.log(likedFood);
      setLikedFood((prev) => prev.filter((e) => e !== name))
      toast.warning("Like removed");
      console.log("already liked");
    }
    else {
      if (likedFood.length === 0) {
        setLikedFood([name.toLowerCase()]);
        toast.success("food liked");
        console.log(likedFood);

      }
      else {
        setLikedFood((prev) => [...prev, name])
        toast.success("food liked");
        console.log(likedFood);
      }
    }
  }
  return (
    <FoodCardsContainer>
      <Container>
        <FoodCards>
          {

            data.map((item, index) => (<FoodCard key={index} item={item}>
              <div className='foodImg'>
                <img src={BASE_URL + item.image} alt='img' />
              </div>
              <div className='foodInfo'>
                <div className="info">
                  <h3>{item.name}</h3>
                  <p>{item.text}</p>
                </div>
                <div className='liked-price'>
                  {
                    !likedFood.includes(item.name.toLowerCase()) ? <FcLikePlaceholder cursor="pointer" fontSize="1.5rem" onClick={() => clickHandler(item.name.toLowerCase())}></FcLikePlaceholder> : <FcLike cursor="pointer" fontSize="1.5rem" onClick={() => clickHandler(item.name.toLowerCase())}></FcLike>
                  }

                  <Button>${item.price.toFixed(2)}</Button>
                </div>
              </div>
            </FoodCard>))
          }
        </FoodCards>
      </Container>
    </FoodCardsContainer>
  )
}

export default SearchResult

const FoodCardsContainer = styled.div`
background-image: url("/images/bg.png");
background-size: cover;
min-height: calc(100vh - 210px);
`

const FoodCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 32px;
  column-gap: 20px;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
`;
const FoodCard = styled.div`
  width: 340px;
  height: 167px;
  border: 0.66px solid;

  border-image-source: radial-gradient(
      80.69% 208.78% at 108.28% 112.58%,
      #eabfff 0%,
      rgba(135, 38, 183, 0) 100%
    ),
    radial-gradient(
      80.38% 222.5% at -13.75% -12.36%,
      #98f9ff 0%,
      rgba(255, 255, 255, 0) 100%
    );

  background: url(.png),
    radial-gradient(
      90.16% 143.01% at 15.32% 21.04%,
      rgba(165, 239, 255, 0.2) 0%,
      rgba(110, 191, 244, 0.0447917) 77.08%,
      rgba(70, 144, 213, 0) 100%
    );
  background-blend-mode: overlay, normal;
  backdrop-filter: blur(13.1842px);

  border-radius: 20px;

  display: flex;
  padding: 8px;

  .foodInfo {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
    gap: 10px;
    h3 {
      margin-top: 8px;
      font-size: 16px;
      font-weight: 500;
    }
    p {
      margin-top: 4px;
      font-size: 12px;
    }
    button {
      font-size: 12px;
    }
  }

  .liked-price{
    display: flex;
    gap: 10px;
   
  }
`;