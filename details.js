import { menu } from "./db.js";

//HTML'de arayüzü göndreceğimiz yer
const outlet = document.getElementById("outlet");


//TODO URL'deki parametreleri yönetebilmek için
// URLSearchParams class'ından bir örnek oluşturduk.
// örneği oluştururken kendi url'mizdeki parametreleri gönderdik
const searchParams = new URLSearchParams(window.location.search);

//TODO get metodu aracılığı ile URL'deki id parametresine eriştik
const paramid = searchParams.get("id");

//! menü içerisinden id'sini bildiğimiz elemana erişme
const product = menu.find((item)=> item.id === Number(paramid));

// Bulduğumuz ürüne göre arayüzü ekrana basma
outlet.innerHTML = `
   <div class="d-flex justify-content-between align-items-center">
   <a href="/">
   <i class="bi bi-house fs-2 "></i>
    </a>
    <div class="d-flex align-items-center">
   <a href="/"> Anasayfa  </a>  / ${product.category} / ${product.title.toLocaleLowerCase()}
    </div>
    </div> 
    <h1 class="text-center my-3 shadow p-2 rounded">${product.title}</h1>
    <div class="d-flex align-items-center justify-content-center">
         <img style="max-width: 500px;" class="img-fluid rounded shadow-lg" src="${product.img}" />
    </div> 
    <div>
    <h3 class="my-5">
    Ürünün Kategorisi:
    <span class="text-success">${product.category}</span>  
    </h3>
    <h3 class="my-5">
        Ürünün fiyatı: <span class="text-success">${product.price} $</span>
    </h3>
    </div>
    <p class="lead fs-3">
      ${product.desc}
    </p>
`