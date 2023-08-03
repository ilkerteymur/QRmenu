import { menu, buttonsData } from "./db.js";

//! HTML'den gelenler
const menuArea = document.getElementById("menu-area");
const buttonsArea = document.getElementById("buttons-area");


//! sayfanın yüklenme olayını izleme
// yüklendiği anda ekrana menü elemanları basma fonksiyonunu çalıştır
document.addEventListener("DOMContentLoaded", () => {
 renderButtons("all");
 renderMenuItems(menu);
});

//! butonlar kısmında tıklanma olaylarını izler
buttonsArea.addEventListener("click", searchCategory);

//! ekrana menü elemanklarını basar
function renderMenuItems(menuItems){
    // dizideki her bir obje için 
    // bir elamanı temsil eden HTML oluştur
    // bu HTML'i bir diziye aktar ve string'e çevir.

  let  menuHtml = menuItems.map((item)=> `
    <a href="/productDetail.html?id=${item.id}" id="card" class="d-flex flex-column gap-3 text-decoration-none text-dark flex-md-row">
        <img class="rounded shadow" src="${item.img}" />
        <div>
          <div class="d-flex justify-content-between">
            <h5>${item.title}</h5>
            <p class="text-success">$ ${item.price}</p>
          </div>
          <p class="lead">${item.desc}</p>
        </div>
      </a>
    `);
    // diziyi string'e çevir
   menuHtml = menuHtml.join("");

   // oluşturduğumuz HTML'i ekrana basma
   menuArea.innerHTML = menuHtml;
};

//! Filtreleme
// tıklanılan butona göre ekrana o butonun kategorisine ait
// ürünleri listeler
function searchCategory(e){
    const category = e.target.dataset.category;

    // tüm dizi elemanlarından yalnızca kategori değeri
    // butonun kategori değeriyle eşleşenleri getirme
   const filteredMenu = menu.filter((item)=> item.category === category);

    // hepsi seçilirse bütün menüyü ekrana basma
   if(category === "all"){
    renderMenuItems(menu);
   }else{
    // filtrelenmiş diziyi ekrana basma
    renderMenuItems(filteredMenu);
   }  
   // butonları güncelleme
   renderButtons(category);
} 

//! ekrana butonları basacak fonksiyon
function renderButtons(active){

    // eski butonları kaldırma
    buttonsArea.innerHTML = "";

    // yeni butonlar oluşturma
    buttonsData.forEach((btn)=>{

    // Html butonu oluşturma
       const buttonEle = document.createElement("button");

    // butona gerekli class'ları verme işlemi
       buttonEle.className = "btn btn-outline-dark filter-btn"

    // içerisindeki yazıyı değiştirme
       buttonEle.innerText = btn.text;

    // hangi kategori olduğu bilgisini buton elementine ekleme
       buttonEle.dataset.category = btn.value;

    // eğer aktif kategoriyle buton eşleşirse ona farklı class verme
       if(btn.value === active){
        buttonEle.classList.add("bg-dark" , "text-light");
       }

    // html'e gönderme
       buttonsArea.appendChild(buttonEle);
    });
}