function getScriptSecret(key) {
  let secret = PropertiesService.getScriptProperties().getProperty(key)
  if (!secret) throw Error(`Secret ${key} is empty`)
  return secret
}

function ping_trigger_dot_dev() {
  
  const num_cols = 4;

  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // determine which cell has been modified
  let cell = sheet.getActiveCell();

  
  const row = cell.getRow();
  const col = cell.getColumn();
  const colLabel = cell.getA1Notation()[1];
  const targetCell = `E${row}`;
  const currentCellContent = cell.getValue();

  // Only run this script when the drop-down goes from one state to another ..
  
  if (col === 4 && currentCellContent == "Get Jobs") {

    let vals = sheet.getRange(row, 1, 1, num_cols).getValues()[0]; // only want the first row
    const payload = {
      row:  row,
      name: vals[0],
      age:  vals[1],
      skills:  vals[2],
      targetCell: targetCell,
      sheetName: "Sheet1"
    };

    console.log(payload);
    // Script Properties Service
    const auth_token = getScriptSecret("API_AUTH_TOKEN");

    const options = {
      method: 'POST',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      headers: {
        "Authorization": auth_token
      }
    };

    const endpoint_url = getScriptSecret("ENDPOINT_URL");
    // Make the API Call
    // invoke asynchronously ...
    const obj = UrlFetchApp.fetch(`${endpoint_url}?blocking=false`, options);
    
  }
}
