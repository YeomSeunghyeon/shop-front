const ShopButton=({text,onClick,className})=>{
return(
    <div onClick={onClick} className={className}>{text}</div>
)
};
export default ShopButton