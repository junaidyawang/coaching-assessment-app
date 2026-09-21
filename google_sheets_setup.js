/**
 * =========================================================================
 * GOOGLE APPS SCRIPT FOR COACHING & CONVERSATION ASSESSMENT
 * =========================================================================
 * 
 * Instructions to link your Google Sheet with the Assessment App:
 * 
 * 1. Go to https://sheets.new and create a new Google Sheet.
 * 2. In Google Sheets menu, click: Extensions > Apps Script
 * 3. Delete any default code in Code.gs, and PASTE THIS ENTIRE SCRIPT.
 * 4. Click the "Save" icon (Floppy disk).
 * 5. Click "Deploy" > "New deployment".
 * 6. Select type: "Web app".
 * 7. Configure:
 *    - Description: "Coaching Assessment Ingestion"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (Required so the web app can post results)
 * 8. Click "Deploy", authorize permissions when prompted.
 * 9. Copy the "Web app URL" (ends in /exec).
 * 10. Open the Facilitator Dashboard in the app and paste this URL into the Webhook input!
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // If sheet is empty, write header row
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Participant Name",
        "Email",
        "Department / Cohort",
        "Dominant Archetype",
        "Coach %",
        "Mentor %",
        "Consultant %",
        "Counselor %",
        "Paradigm Shift Avg (1-10)",
        "Weakness vs Strengths (1-10)",
        "Problem Autonomy (1-10)",
        "Advice vs Inquiry (1-10)",
        "Approval vs Trust (1-10)",
        "Expertise vs Excellence (1-10)",
        "Control vs Non-Attachment (1-10)"
      ]);
      sheet.getRange(1, 1, 1, 16).setFontWeight("bold").setBackground("#e2e8f0");
      sheet.setFrozenRows(1);
    }
    
    // Parse received data
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString(),
      data.name || "Anonymous",
      data.email || "",
      data.department || "",
      data.dominantArchetype || "",
      data.coachPercent || 0,
      data.mentorPercent || 0,
      data.consultantPercent || 0,
      data.counselorPercent || 0,
      data.paradigmAvg || 0,
      data.scale1 || 0,
      data.scale2 || 0,
      data.scale3 || 0,
      data.scale4 || 0,
      data.scale5 || 0,
      data.scale6 || 0
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Recorded successfully" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Coaching Assessment Webhook is running active!");
}
