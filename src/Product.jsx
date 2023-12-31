import React, { useState } from 'react';
import "./Product.css"
import { useSortable } from '@dnd-kit/sortable';

const Product = ({ id, name, price, image, onAddToCart, onRemoveFromCart }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleAddToCart = () => {
        onAddToCart({ id, name, price, image });
    };

    const handleRemoveFromCart = () => {
        onRemoveFromCart(id);
    };

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : '',
        transition,
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={onAddToCart ? handleAddToCart : handleRemoveFromCart}
        >
            <div class='single_product'>
                <img src={image} alt={name} class="" />
                <h3>{name}</h3>
                <p>${price}</p>
                {isHovered && onAddToCart && (
                    <button style={{ display: "flex", gap: "6px" }}>
                        ADD
                        <svg width="16" height="16" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.0821 11.4365H12.0521V18.929H7.90805V11.4365H0.915055V7.718H7.90805V0.244H12.0521V7.718H19.0821V11.4365Z" fill="white" />
                        </svg>
                    </button>
                )}
                {isHovered && onRemoveFromCart && (
                    <button style={{ display: "flex", gap: "6px", background: "#F5516B" }}>
                        REMOVE
                        <svg width="16" height="16" viewBox="0 0 19 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.27952 25C3.07548 24.8926 2.85652 24.8144 2.67737 24.6777C2.38873 24.458 2.25437 24.1406 2.23447 23.7842C2.14987 22.0459 2.06527 20.3076 1.98067 18.5693C1.87119 16.333 1.7617 14.1015 1.65222 11.8652C1.56265 10.0293 1.47307 8.19334 1.38847 6.35741C1.3835 6.27928 1.38847 6.19627 1.38847 6.10838C6.80283 6.10838 12.1923 6.10838 17.6166 6.10838C17.5917 6.66502 17.5668 7.20702 17.542 7.74901C17.4474 9.67284 17.3529 11.6015 17.2633 13.5254C17.1538 15.7861 17.0443 18.042 16.9348 20.3027C16.8851 21.3672 16.8054 22.4316 16.7855 23.4961C16.7706 24.2578 16.472 24.7705 15.7206 25.0049C11.5752 25 7.42488 25 3.27952 25ZM8.5595 15.5322C8.5595 16.206 8.5595 16.8848 8.5595 17.5586C8.5595 18.5351 8.5595 19.5117 8.5595 20.4883C8.5595 20.9131 8.75358 21.0986 9.18156 21.1084C9.35573 21.1133 9.52991 21.1084 9.70408 21.1084C10.2813 21.1084 10.4406 20.9473 10.4406 20.3808C10.4406 17.5342 10.4406 14.6875 10.4406 11.8408C10.4406 11.4355 10.4406 11.0254 10.4406 10.6201C10.4356 10.166 10.2415 9.97557 9.76878 9.97069C9.60455 9.97069 9.43536 9.97069 9.27113 9.97069C8.74363 9.97069 8.5595 10.1562 8.5595 10.6787C8.5595 12.2949 8.5595 13.916 8.5595 15.5322ZM4.92174 15.5273C4.92174 16.6406 4.92174 17.7539 4.92174 18.8721C4.92174 19.4238 4.91676 19.9805 4.92174 20.5322C4.92671 20.9131 5.11582 21.0986 5.50398 21.1133C5.7528 21.1181 6.00162 21.123 6.25044 21.1133C6.57391 21.0986 6.74808 20.9375 6.7879 20.6201C6.79785 20.542 6.79785 20.459 6.79785 20.376C6.79785 17.1631 6.79785 13.9502 6.79785 10.7373C6.79785 10.664 6.80283 10.5908 6.79287 10.5176C6.75804 10.1806 6.58386 10.0049 6.23551 9.98045C6.03646 9.96581 5.8374 9.97557 5.63834 9.97557C5.10089 9.97557 4.92174 10.1514 4.92174 10.6738C4.91676 12.29 4.92174 13.9062 4.92174 15.5273ZM14.0784 15.5566C14.0784 13.9062 14.0784 12.2558 14.0784 10.6006C14.0784 10.1709 13.8843 9.97557 13.4414 9.96581C13.2772 9.96092 13.108 9.96581 12.9437 9.96581C12.3714 9.96581 12.2022 10.1318 12.2022 10.6933C12.2022 13.9209 12.2022 17.1533 12.2022 20.3808C12.2022 20.4687 12.2072 20.5615 12.2172 20.6494C12.262 20.9326 12.4212 21.084 12.7148 21.0986C12.9288 21.1133 13.1478 21.1084 13.3618 21.1035C13.9092 21.1035 14.0734 20.9424 14.0734 20.4053C14.0833 18.7939 14.0784 17.1777 14.0784 15.5566Z" fill="white" />
                            <path d="M19 4.5459C12.6551 4.5459 6.34494 4.5459 0.0149293 4.5459C0.00995286 4.46777 0 4.39453 0 4.32617C0 3.61816 0 2.91016 0 2.20215C0 1.59668 0.318491 1.28418 0.935568 1.28418C2.6176 1.2793 4.29963 1.28418 5.98664 1.28418C6.08617 1.28418 6.1857 1.28418 6.32504 1.28418C6.32504 0.991211 6.32504 0.708008 6.32504 0.429688C6.32504 0.0732422 6.39969 0 6.76296 0C8.58931 0 10.4107 0 12.237 0C12.5953 0 12.67 0.0732422 12.67 0.429688C12.67 0.703125 12.67 0.976562 12.67 1.28418C12.7944 1.28418 12.8889 1.28418 12.9885 1.28418C14.6556 1.28418 16.3227 1.28418 17.9898 1.28418C18.7064 1.28418 19 1.57227 19 2.28027C19 2.94922 19 3.61328 19 4.28223C19 4.36523 19 4.45312 19 4.5459Z" fill="white" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Product