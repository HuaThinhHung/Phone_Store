loadDom = ()=>{
    document.getElementById("shopingCard").onclick = ()=>{
        document.getElementById("infoShopingCard").classList.remove("hidden");
    }

}
closeShopingCard =()=>{
    document.getElementById("closeShopingCard").onclick = ()=>{
        document.getElementById("infoShopingCard").classList.add("hidden");
    }
}
