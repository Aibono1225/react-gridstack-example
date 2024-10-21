import base64url from "base64url";

function generateCodeVerifier() {
  const array = new Uint32Array(56 / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2)).join(
    ""
  );
}

async function generateCodeChallenge(verifier) {
  const data = new TextEncoder().encode(verifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return base64url(Buffer.from(digest));
}

const authConfig = {
  authority: "http://localhost:5206",
  client_id: "react-client",
  redirect_uri: "http://localhost:5174/callback",
  response_type: "code",
  //   scope: "openid profile",
  scope: "profile",
};

export async function login() {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  // 存储 code_verifier 以便稍后在令牌请求中使用
  localStorage.setItem("code_verifier", codeVerifier);

  const authUrl =
    `${authConfig.authority}/connect/authorize?` +
    `client_id=${authConfig.client_id}&` +
    `redirect_uri=${encodeURIComponent(authConfig.redirect_uri)}&` +
    `response_type=${authConfig.response_type}&` +
    `scope=${encodeURIComponent(authConfig.scope)}&` +
    `code_challenge=${codeChallenge}&` +
    `code_challenge_method=S256`;

  window.location = authUrl;
}

export async function handleCallback() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  if (code) {
    const codeVerifier = localStorage.getItem("code_verifier");

    const tokenResponse = await fetch(`${authConfig.authority}/connect/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: authConfig.redirect_uri,
        client_id: authConfig.client_id,
        client_secret: "your-client-secret", // 如果需要
        code_verifier: codeVerifier,
      }),
    });

    const tokenData = await tokenResponse.json();
    console.log("Token data:", tokenData);

    // 这里可以将 token 存储在本地存储或 cookie 中
    localStorage.setItem("access_token", tokenData.access_token);

    return tokenData;
  }
}
