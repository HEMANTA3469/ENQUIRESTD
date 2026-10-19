const CENTER_WHATSAPP = "918280897689";
const form = document.getElementById("inquiryForm");
const statusBox = document.getElementById("formStatus");
document.getElementById("year").textContent = new Date().getFullYear();

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form).entries());
  const inquiry = {
    id: "GCA-" + Date.now().toString(36).toUpperCase(),
    submittedAt: new Date().toISOString(),
    ...data,
    status: "New"
  };

  // Browser-local backup only. Static hosting does not create a shared database.
  try {
    const saved = JSON.parse(localStorage.getItem("gca_inquiries") || "[]");
    saved.unshift(inquiry);
    localStorage.setItem("gca_inquiries", JSON.stringify(saved));
  } catch (error) {
    console.warn("Could not save local inquiry backup", error);
  }

  const message = [
    "NEW ADMISSION INQUIRY — GCA COACHING CENTER",
    "Inquiry ID: " + inquiry.id,
    "Student: " + data.studentName,
    "Parent/Guardian: " + data.parentName,
    "Mobile: " + data.mobile,
    "Class: " + data.className,
    "Subject/Stream: " + data.subject,
    "Village/Address: " + (data.address || "Not provided"),
    "Message: " + (data.message || "None"),
    "Submitted: " + new Date().toLocaleString("en-IN")
  ].join("\n");

  statusBox.textContent = "Your inquiry details are ready in WhatsApp. Press Send in WhatsApp to deliver them to GCA Coaching Center.";
  statusBox.classList.add("show");
  const waUrl = "https://wa.me/" + CENTER_WHATSAPP + "?text=" + encodeURIComponent(message);
  window.open(waUrl, "_blank", "noopener");
});
