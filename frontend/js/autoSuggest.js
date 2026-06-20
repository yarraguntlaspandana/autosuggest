//https://autosuggest-backend.onrender.com/api/autosuggest?q=a&weighted=true&algorithm=trie&limit=8
var API_URL = "https://autosuggest-backend.onrender.com/api/autosuggest";

var searchBar=document.getElementById("searchbox");
var searchSuggestions=document.getElementById("searchsuggestions");

//get user typed data
//use user typed data in the query int the API call
//API call
//Append them into UI(searchsuggestions-div tag)so that user can see the suggestions
searchBar.addEventListener("input", function(){
    var query=searchBar.value.trim();
    console.log(query);
    fetchSuggestions(query);

})
function fetchSuggestions(query){
    var fullAPI=API_URL+"?q="+query+"&weighted=true&algorithm=trie&limit=8";
    fetch(fullAPI)
        .then(function(res){
            return res.json();
        })
        .then(function(data){
            //console.log(data);
            showSuggestions(data);
        })
        .catch(function(err){
            console.log("Error :"+ err);
        })
}

function showSuggestions(data){
    var values=data.results;
    if(data.count==0){
        searchSuggestions.innerHTML="<div>No Suggestions Found</div>";
    }
    else{
        var htmlString="";
        for(var i=0;i<values.length;i++){
            htmlString+="<div><span class='suggestion-item'>"+values[i].text+"</span><span class='item-weight'> "+values[i].weight+"</span></div>";
        }
        searchSuggestions.innerHTML=htmlString;
    }
}
