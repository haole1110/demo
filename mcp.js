// var temp = sessionStorage.getItem("mcps");
// if (temp == null) sessionStorage.setItem("mcps",new Map());
const mcps = new Map();

function fetchAllMcps(){
fetch('mcp.json')
.then((response) => response.json())
.then((json) => {
    for (i of json){
        i.getLatitude =  function() {
            return this.gps.split(',')[0].trim();
        }
        i.getLongitude =  function() {
            return this.gps.split(',')[1].trim();
        }
        i.getLatLng = function() {
            return {lat: +this.getLatitude(), lng: +this.getLongitude()}
        }
        mcps.set(i.mcpId,i);   
    }   
}); 
}
function loadAllMcps(){
    sessionStorage.getItem("mcps").forEach((value, key) => {
        mcps.set(value, key);
    })
}
function getContentMCPs(){
const res = [];
    for (mcp of mcps.values()){
        res.push ({mcpId: mcp.mcpId, position: mcp.getLatLng(), title: `MCP: ${mcp.mcpId}<br>Capacity: ${mcp.capacity} kg<br> Current Load: ${mcp.load} kg<br>Current percentage: ${Math.trunc(100*mcp.load/mcp.capacity)}%<br>Last updated: ${mcp.lastUpdated?new Date(mcp.lastUpdated*1000).toLocaleString('en-GB'):null}`})
    } 
return res;
}
function selectMCP(mcpId){
if (getSelectedMCPs().includes(mcpId)) return alert("MCP "+ mcpId + " is already added before");
var temp = document.getElementById("mcpSelect");
var option = document.createElement("option");
  option.text = 'MCP: '+mcpId;
  option.value = mcpId
  temp.add(option);
}
function removeSelectedMCP(){
    var temp = document.getElementById("mcpSelect");
    temp.remove(temp.selectedIndex);
}
function getSelectedMCPs(){
    const arr = [];
    var temp = document.getElementById("mcpSelect");
    for (i = 0 ; i < temp.length; i++){
        arr.push(temp.options[i].value);
    }
    return arr;
}
function generateMCPTable(){
document.getElementById("table-div").innerHTML= `
<div style="max-width:100%;overflow:hidden;color:red;width:500px;height:500px;"><div id="my-map-display" style="height:100%; width:100%;max-width:100%;"><iframe style="height:100%;width:100%;border:0;" frameborder="0" src="https://www.google.com/maps/embed/v1/directions?origin=New+York,+Ti???u+bang+New+York,+Hoa+K???&destination=Houston,+Texas,+Hoa+K???&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe></div><a class="embedded-map-code" href="https://www.bootstrapskins.com/themes" id="authorize-map-data">premium bootstrap themes</a><style>#my-map-display .text-marker{}.map-generator{max-width: 100%; max-height: 100%; background: none;</style></div>
`
 
}
 