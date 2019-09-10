const ul_tag = document.getElementById("vertical");
//console.log(ul_tag);
const list_tag = ul_tag.getElementsByClassName("list");
let l = list_tag.length;
function display_comment(comments){
            let l = comments.length;
            let div_comm = document.getElementById("comm_div");
            div_comm.innerHTML="";
            for(let i=0;i<l;i++){
               div_comm.innerHTML+="<p class='owner'>"+comments[i].comment + "</p>";
               div_comm.innerHTML+="<div class='commt'><p class='commt'>"+comments[i].name + "</p></div>"

            } 
}
function display_blog(file_name) {
    let xhr = new XMLHttpRequest();
    let form_id = document.getElementById("form_id");
    form_id.action = '/blog?file='+file_name;
    xhr.open('GET', '/blogs?file='+file_name, true);

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            //console.log(xhr.response);
            let json = JSON.parse(xhr.response);
            let hiddden_input = document.getElementById("file");
            hiddden_input.value =file_name;
            let head_tag = document.getElementById("heading");
            head_tag.innerHTML = json.blogpage[0].heading;
            let para_tag1=document.getElementById("para_blog1");
            para_tag1.innerHTML=json.blogpage[0].para;
            let para_tag2=document.getElementById("para_blog2");
            /*para_tag2.innerHTML=json.blogpage[0].para2;
            let para_tag3=document.getElementById("para_blog3");
            para_tag3.innerHTML=json.blogpage[0].para3;*/
             display_comment(json.comments);
            
        }
    }

    xhr.send(null);
}

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('file');
if(myParam) display_blog(myParam);

for(let i = 0; i < l; i++){
    list_tag[i].addEventListener("click", (event) => {
        display_blog(event.currentTarget.attributes.attr.value);
    })
}
