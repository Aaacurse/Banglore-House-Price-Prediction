function onclickedEstimatedPrice(){
    var sqft=document.getElementById("uisqft");
    var bhk=getBHKvalues();
    var bath=getBathvalues();
    var location=document.getElementById("uilocation");
    var estPrice=document.getElementById("uiresult");
   
    var url="http://127.0.0.1:5000/predict_home_price";
    $.post(url,{
        total_sqft:parseFloat(sqft.value),
        bhk: bhk,
        bath: bath,
        location:location.value
    },function(data,status){
        console.log(data.estimated_price);
        estPrice.innerHTML="<h2>" + data.estimated_price.toString() + "Lakh</h2>";
        console.log(status);
    });
}
function getBathvalues(){
    var uiBathrooms=document.getElementsByName("uibath");
    for( var i in uiBathrooms){
        if(uiBathrooms[i].checked){
            return parseInt(i)+1;

        }
    }return -1;
}
function getBHKvalues(){
    var uiBhk=document.getElementsByName("uibhk");
    for( var i in uiBhk){
        if(uiBhk[i].checked){
            return parseInt(i)+1;

        }
    }return -1;
}
function onPageLoad() {
    console.log('Document Loaded');
    var url = "http://127.0.0.1:5000/get_location_names";
    $.get(url, function (data, status) {
        console.log("got response back for get_location_names request");
        if (data) {
            var locations = data.locations;
            var uilocations = document.getElementById("uilocation");
            $('#uilocation').empty(); 
            for (var i in locations) {
                var opt = new Option(locations[i]);
                $('#uilocation').append(opt);  
            }
        }
    });
}

window.onload = onPageLoad;
