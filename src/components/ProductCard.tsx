import { IProduct } from "../@types";
import { CiHeart } from "react-icons/ci";
import { IoMdShare } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";
import styled from "styled-components";

interface IProps {
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
  product: IProduct;
}

export default function ProductCard({ product, onAdd, onRemove }: IProps) {
  return (
    <Card>
      <RelativeWrapper>
        <ActionButtons>
          <CiHeart style={{ cursor: "pointer" }} />

          <IoMdShare style={{ cursor: "pointer" }} />
        </ActionButtons>

        <Image src={product.thumbnail} alt={product.title} />
      </RelativeWrapper>

      <ProductInfo>
        <Rating>★ {product.rating}</Rating>

        <ProductDetails>
          <div>
            <h3>{product.title.slice(0, 16)}</h3>
            <p>{product.brand}</p>
          </div>

          <div>
            <MutedText>Stock - {product.stock}</MutedText>
            <MutedText>Discount {product.discountPercentage}%</MutedText>
          </div>
        </ProductDetails>

        <Price>₹ {product.price}/-</Price>
      </ProductInfo>

      <ButtonGroup>
        <button className="bulk">Bulk</button>
        {product.count ? (
          <>
            <button className="remove" onClick={() => onRemove(product.id)}>
              <IoMdRemove />
            </button>
            <p>{product.count}</p>
            <button className="add" onClick={() => onAdd(product.id)}>
              <IoMdAdd />
            </button>
          </>
        ) : (
          <button className="add-cart" onClick={() => onAdd(product.id)}>
            Add to Cart
          </button>
        )}
      </ButtonGroup>
    </Card>
  );
}

const Card = styled.div`
  width: 17.5rem;
  background-color: #e5e7eb;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  padding: 0.5rem;
`;

const RelativeWrapper = styled.div`
  position: relative;
`;

const ActionButtons = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: 0.5rem;
`;

const Image = styled.img`
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  width: 100%;
  object-fit: contain;
  height: 12rem;
`;

const ProductInfo = styled.div`
  margin-top: 1rem;
`;

const ProductDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 5px 0 5px 0;
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 0.25rem;
  }

  p {
    margin: 0;
    font-size: 1rem;
    color: #6b7280;
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  background-color: #f97316;
  color: white;
  width: fit-content;
  padding: 0.15rem 0.3rem;
  border-radius: 0.125rem;
  font-size: 0.75rem;
  font-weight: 600;
`;

const MutedText = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  padding: 0.25rem 0.5rem;
`;

const Price = styled.div`
  margin-top: 0.25rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;

  button {
    flex: 1;
    font-size: 0.875rem;
    border: none;
    border-radius: 9999px;
    padding: 0.5rem;
    cursor: pointer;
  }

  .bulk {
    background-color: #d1d5db;
    color: #374151;

    &:hover {
      background-color: #9ca3af;
    }
  }

  .remove {
    background-color: #ef4444;
    color: white;

    &:hover {
      background-color: #dc2626;
    }
  }

  .add {
    background-color: #10b981;
    color: white;

    &:hover {
      background-color: #059669;
    }
  }

  .add-cart {
    background-color: #10b981;
    color: white;

    &:hover {
      background-color: #059669;
    }
  }
  p {
    font-size: 1rem;
    font-weight: 600;
  }
`;
