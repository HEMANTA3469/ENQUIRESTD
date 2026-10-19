function readInquiries(){try{return JSON.parse(localStorage.getItem("gca_inquiries")||"[]")}catch(e){return []}}
function esc(v){return String(v||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function render(){
 const items=readInquiries();document.getElementById("count").textContent=items.length+" inquiry"+(items.length===1?"":"ies");
 const area=document.getElementById("tableArea");
 if(!items.length){area.innerHTML='<div class="empty">No local inquiries yet. Test the public form on this same browser.</div>';return}
 area.innerHTML='<table class="table"><thead><tr><th>Submitted</th><th>Student / Parent</th><th>Contact</th><th>Class / Subject</th><th>Address / Message</th><th>Status</th></tr></thead><tbody>'+items.map(x=>'<tr><td>'+esc(new Date(x.submittedAt).toLocaleString())+'<br><small>'+esc(x.id)+'</small></td><td><strong>'+esc(x.studentName)+'</strong><br>'+esc(x.parentName)+'</td><td><a href="tel:'+esc(x.mobile)+'">'+esc(x.mobile)+'</a><br><a href="https://wa.me/91'+esc(x.mobile)+'" target="_blank" rel="noopener">WhatsApp parent</a></td><td>'+esc(x.className)+'<br>'+esc(x.subject)+'</td><td>'+esc(x.address)+'<br>'+esc(x.message)+'</td><td>'+esc(x.status)+'</td></tr>').join("")+'</tbody></table>';
}
document.getElementById("exportBtn").addEventListener("click",()=>{
 const items=readInquiries();if(!items.length){alert("No local inquiries to export.");return}
 const keys=["id","submittedAt","studentName","parentName","mobile","className","subject","address","message","status"];
 const csv=[keys.join(","),...items.map(x=>keys.map(k=>'"'+String(x[k]??"").replace(/"/g,'""')+'"').join(","))].join("\r\n");
 const url=URL.createObjectURL(new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8;"}));
 const a=document.createElement("a");a.href=url;a.download="gca-admission-inquiries.csv";a.click();URL.revokeObjectURL(url);
});
document.getElementById("clearBtn").addEventListener("click",()=>{if(confirm("Delete all inquiry backups stored in this browser?")){localStorage.removeItem("gca_inquiries");render()}});
render();
