import React from 'react'
import { ButtonProps } from '../types'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

function CustomButton({title,
    buttonType,
    handleClick,
    className,
    isFavorite,
    isDisable = false,}: ButtonProps) {
  return (
    <button
      className={className}
      type={buttonType}
      onClick={handleClick}
      disabled={isDisable}
    >
      {title ? (
        title
      ) : isFavorite ? (
        <AiFillHeart color="red" />
      ) : (
        <AiOutlineHeart />
      )}
    </button>
  )
}

export default CustomButton
