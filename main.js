let price= document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let totel=document.getElementById("totel");
let title=document.getElementById("title");
let count=document.getElementById("count");
let category=document.getElementById("category");
let submit=document.getElementById("submit");
let search=document.getElementById("search");
let mood ="create";
let ref;
let searchMood ="title"
// funtion to get totel
function getTotel(){
    if( price.value != ''){
        let result = (Number(price.value )+ Number(taxes.value) + Number(ads.value))- Number(discount.value)

        totel.innerHTML=result;
        totel.style.background ="#040";
    }else{
        taxes.value='';
        ads.value='';
        discount.value='';
        totel.innerHTML='';
        totel.style.background ="#dc143c";
    }  
}
// function to creat product

let dataPro ;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)

}else{
    dataPro =[];
}
 submit.onclick = function(){
   let newPro ={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        count:count.value,
        category:category.value,
        totel:totel.innerHTML,
    }
    // btn count
    if(title.value!=''&&price.value!=''&&category.value!=''&&newPro.count<100 ){
        if(mood ==='create'){
            if(newPro.count>1){
                for(let i=0 ; i<newPro.count ; i++){
                    dataPro.push(newPro);
                }
            }
                else{
                    dataPro.push(newPro);
                }
        }
        else{
            dataPro[ref]=newPro;
            count.style.display= "block";
            submit.innerHTML= "create";
        }
        clearData();
    }else {
        
    }
    localStorage.setItem("product" , JSON.stringify(dataPro));
    
    display(); 
 } 
//   funtion clear data
function clearData (){
    title.value ='';
    price.value ='';
    taxes.value ='';
    ads.value ='';
    discount.value ='';
    count.value ='';
    category.value ='';
    totel.innerHTML = '';
    totel.style.background ="#dc143c";
}
// function display data
function display(){
    let tabel = '' ;
    for(let i=0 ; i< dataPro.length ; i++){
        tabel +=`
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].totel}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="Update">Update</button></td>
           <td> <button onclick="deleteData(${i})" id="Delete">Delete</button></td>
        </tr>
        `

    }
    document.getElementById('tbody').innerHTML=tabel;

    // btn dalete all
    let btnDeleteAll = document.getElementById("deleteAll");
    if(dataPro.length >0)
    {
        btnDeleteAll.innerHTML =`<button onclick="deleteAllData()">deleteAll (${dataPro.length})</button>`

    }else{
        btnDeleteAll.innerHTML='';
    }
    
}
display();
// function deleteData
function deleteData(i){
    dataPro.splice(i ,1);
    localStorage.product = JSON.stringify(dataPro);
    display();
}
// function deleteAllData
function deleteAllData(){
    dataPro.splice(0);
    localStorage.clear();
    display();
}
// function UpdataData
function updateData(i){
    title.value= dataPro[i].title;
    price.value= dataPro[i].price;
    taxes.value= dataPro[i].taxes;
    ads.value= dataPro[i].ads;
    discount.value= dataPro[i].discount;
    getTotel();
    count.style.display= "none";
    category.value= dataPro[i].category;
    submit.innerHTML= "Update";
    mood = "update";
    ref=i ; 
}
// function searchData
 function searchByMood(id){
    if(id =='sreachByTitle'){
       searchMood="titel"
    }else{
        searchMood="category"
    }
    search.placeholder=('search by '+ searchMood) ;
    search.value='';
    search.focus();
 }

 function searchData(value){
    let tabel ='';
    for (let i =0 ; i<dataPro.length ; i++) {
        if(searchMood=="titel"){
            if(dataPro[i].title.includes(value)){
                tabel +=`
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].totel}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="Update">Update</button></td>
           <td> <button onclick="deleteData(${i})" id="Delete">Delete</button></td>
        </tr>
        `  }

        }else{
            if(dataPro[i].category.includes(value)){
                tabel +=`
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].totel}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="Update">Update</button></td>
           <td> <button onclick="deleteData(${i})" id="Delete">Delete</button></td>
        </tr>
        `  }

        }
        
        
    }
    document.getElementById('tbody').innerHTML=tabel;
 }












 