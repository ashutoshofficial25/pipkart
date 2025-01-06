import { IProduct } from "../@types";
import { CiHeart } from "react-icons/ci";
import { IoMdShare } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";

interface IProps {
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
  product: IProduct;
}

export default function ProductCard({ product, onAdd, onRemove }: IProps) {
  return (
    <div className="w-72 bg-gray-200 shadow-md rounded-lg p-2">
      <div className="relative">
        <div className="absolute top-0 right-0 flex space-x-2">
          <button className="p-2">
            <CiHeart />
          </button>
          <button className="p-2">
            <IoMdShare />
          </button>
        </div>

        <img
          src={product.thumbnail}
          alt={product.title}
          className="rounded-t-lg w-full object-contain h-48"
        />
      </div>

      <div className="mt-4">
        <div className="flex items-center bg-orange-500 w-fit px-1 text-white rounded-sm">
          <span className="text-xs font-semibold">★ {product.rating}</span>
        </div>
        <div className="flex justify-between">
          <div>
            <h3 className="text-xl leading-6 font-semibold mt-1">
              {product.title.slice(0, 16)}
            </h3>
            <p className="text-base text-gray-500">{product.brand}</p>
          </div>

          <div className="text-blue-500 mt-2">
            <div className="text-xs font-medium text-gray-500 px-2 rounded-md">
              Stock - {product.stock}
            </div>
            <div className="text-xs font-medium text-gray-500 px-2 rounded-md">
              Discount {product.discountPercentage} %
            </div>
          </div>
        </div>

        <div className="mt-1 text-xl font-semibold text-gray-800">
          <span> ₹ {product.price}/- </span>{" "}
        </div>
      </div>

      <div className="mt-2 flex space-x-2">
        <button className="flex-1 text-sm text-gray-700 border  rounded-full py-1 bg-gray-300 hover:bg-gray-400">
          Bulk
        </button>
        {product.count ? (
          <>
            <button
              onClick={() => onRemove(product.id)}
              className="flex-1 text-sm text-white  bg-red-500 rounded-full py-1 hover:bg-red-600"
            >
              <IoMdRemove className="w-full text-center" />
            </button>
            <div>{product.count}</div>
            <button
              onClick={() => onAdd(product.id)}
              className="flex-1 text-sm text-white bg-green-500 rounded-full py-1 hover:bg-green-600"
            >
              <IoMdAdd className="w-full text-center" />
            </button>
          </>
        ) : (
          <button
            onClick={() => onAdd(product.id)}
            className="flex-1 text-sm text-white bg-green-500 rounded-full py-1 hover:bg-green-600"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
