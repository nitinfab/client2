import React, { useState } from 'react';
import "./App.css"
import Product from "./Product.jsx"
import Variant1 from "./img/Variant1.png"
import Variant2 from "./img/Variant2.png"
import Variant3 from "./img/Variant3.png"
import Variant5 from "./img/Variant5.png"
import Variant6 from "./img/Variant6.png"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';


const ProductList = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Product 1',
      price: 10,
      image: Variant2,
    },
    {
      id: 2,
      name: 'Product 1',
      price: 10,
      image: Variant3,
    },
    {
      id: 3,
      name: 'Product 1',
      price: 10,
      image: Variant5,
    },
    {
      id: 4,
      name: 'Product 1',
      price: 10,
      image: Variant6,
    },
    {
      id: 5,
      name: 'Product 1',
      price: 10,
      image: Variant1,
    },
    {
      id: 6,
      name: 'Product 1',
      price: 10,
      image: 'https://images.unsplash.com/photo-1626497764746-6dc36546b388?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hpcnRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 7,
      name: 'Product 2',
      price: 15,
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hpcnRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 8,
      name: 'Product 3',
      price: 10,
      image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNoaXJ0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 9,
      name: 'Product 4',
      price: 15,
      image: 'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=1600',
    },
    {
      id: 10,
      name: 'Product 5',
      price: 10,
      image: 'https://images.unsplash.com/photo-1620867268520-bb2fc18e3ff4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fG1lbnMlMjB3ZWFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 11,
      name: 'Product 6',
      price: 15,
      image: 'https://images.unsplash.com/photo-1584486483122-af7d49cf2992?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fG1lbnMlMjB3ZWFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 12,
      name: 'Product 7',
      price: 10,
      image: 'https://images.unsplash.com/photo-1532660621034-fb55e2e59762?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1lbnMlMjB3ZWFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 13,
      name: 'Product 8',
      price: 15,
      image: 'https://images.unsplash.com/photo-1504791635568-fa4993808e0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fG1lbnMlMjB3ZWFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 14,
      name: 'Product 9',
      price: 15,
      image: 'https://images.unsplash.com/photo-1514311548104-ae305aac4688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fG1lbnMlMjB3ZWFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 15,
      name: 'Product 5',
      price: 10,
      image: Variant1,
    },
    {
      id: 16,
      name: 'Product 6',
      price: 15,
      image: Variant2,
    },
    {
      id: 17,
      name: 'Product 7',
      price: 10,
      image: Variant3,
    },
    {
      id: 18,
      name: 'Product 8',
      price: 15,
      image: Variant5,
    },
    {
      id: 19,
      name: 'Product 9',
      price: 15,
      image: Variant6,
    },
  ]);

  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
    setProducts(products.filter((p) => p.id !== product.id));
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);

    const removedProduct = cartItems.find((item) => item.id === productId);
    if (removedProduct) {
      setProducts([...products, removedProduct]);
    }
  };

  const handleAddAllToCart = () => {
    setCartItems([...cartItems, ...products]);
    setProducts([]);
  };

  const handleRemoveAllFromCart = () => {
    setProducts([...products, ...cartItems]);
    setCartItems([]);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const secondHandleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setCartItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div class="container">
      <div class='left_container'>
        <div class="product_container">
          <h2 class="">Select Products</h2>
          <div class="products">
            <div class="product_list">
              {products.map((product) => (
                <Product
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  onAddToCart={handleAddToCart}
                  onRemoveFromCart={null} // Disable remove button in the products list
                />
              ))}
            </div>
          </div>

          {/* {products.length > 0 && ( */}
          <div class="bottom_product_container">
            <h3 class="product_found">{products.length} Products Found</h3>
            <h3 class="addToCart"
              onClick={handleAddAllToCart}
            >
              Add them all
            </h3>
          </div>
          {/* )} */}
        </div>
      </div>
      <div class="right_container">
        <div class='item_container'>
          <div class='right_container_btn'>
            <button>CANCEL</button>
            <button>APPLY</button>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={secondHandleDragEnd}
          >
            <SortableContext items={cartItems}
              strategy={rectSortingStrategy}>
              <div class="products">
                <div class="product_list">
                  {
                    cartItems.map((item) => (
                      <Product
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        image={item.image}
                        onAddToCart={null}
                        onRemoveFromCart={() => handleRemoveFromCart(item.id)} // Update the prop
                      />
                    ))
                  }
                </div>
              </div>
            </SortableContext>
          </DndContext>

          <div class="bottom_product_container">
            <h3 class="product_found">{cartItems.length} Products Found</h3>
            <h3 class='removeFromCart'
              onClick={handleRemoveAllFromCart}
            >
              CLEAR
            </h3>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ProductList;

