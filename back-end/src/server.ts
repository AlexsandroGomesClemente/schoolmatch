process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import app from "./app";

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});
