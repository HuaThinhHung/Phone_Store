import {updateSl} from "./main.js";
document.addEventListener("DOMContentLoaded", () => {
    //load card
    // fetch('card.html')
    //     .then(response => response.text())
    //     .then(html => {
    //         document.getElementById('card').innerHTML = html;
    //     })
    //     .catch(error => {
    //         console.error("Không thể tải card.html:", error);
    //     });
    // load header
    // fetch('header.html')
    //     .then(response => response.text())
    //     .then(html => {
    //         document.getElementById('header').innerHTML = html;
    //         loadDom();
    //         updateSl();
    //     })
    //     .catch(error => {
    //         console.error("Không thể tải header.html:", error);
    //     });

   async function loadFooter() {
    const response = await fetch('footer.html');
    const html = await response.text();
    document.getElementById("footer").innerHTML = html;
}

loadFooter(); // Gọi hàm sau khi định nghĩa

    fetch('pagination.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById("pagination").innerHTML = html;
        })
    fetch('shopingCard.html')
        .then(responsive => responsive.text())
        .then(html =>{
            document.getElementById("infoShopingCard").innerHTML = html;
            closeShopingCard();
        })
});
