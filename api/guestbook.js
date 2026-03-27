const { google } = require("googleapis");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, message, attendance } = req.body || {};

    const safeName = String(name || "").trim();
    const safeMessage = String(message || "").trim();
    const safeAttendance = String(attendance || "").trim();

    if (!safeName) {
      return res.status(400).json({ error: "Tên không được để trống." });
    }

    if (!safeMessage) {
      return res.status(400).json({ error: "Lời nhắn không được để trống." });
    }

    if (!safeAttendance) {
      return res.status(400).json({ error: "Vui lòng chọn xác nhận tham dự." });
    }

    if (safeName.length > 100) {
      return res.status(400).json({ error: "Tên quá dài." });
    }

    if (safeMessage.length > 1000) {
      return res.status(400).json({ error: "Lời nhắn quá dài." });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || "Responses";

    const createdAt = new Date().toISOString();

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:D`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[createdAt, safeName, safeMessage, safeAttendance]],
      },
    });

    return res.status(200).json({
      success: true,
      message: "Đã gửi lời nhắn thành công.",
    });
  } catch (error) {
    console.error("Guestbook API error:", error);
    return res.status(500).json({
      error: "Có lỗi xảy ra khi lưu phản hồi.",
    });
  }
};